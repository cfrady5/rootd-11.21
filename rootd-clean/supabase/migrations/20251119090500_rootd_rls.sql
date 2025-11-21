-- ==========================================
-- Rootd NIL RLS + Policies for Athletes, Directors, Businesses
-- ==========================================

BEGIN;

-- Helper predicates
CREATE OR REPLACE FUNCTION public.is_school_director(target_school_id uuid)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
    SELECT target_school_id IS NOT NULL AND EXISTS (
        SELECT 1
        FROM public.directors d
        WHERE d.user_id = auth.uid()
          AND d.school_id = target_school_id
    );
$$;

CREATE OR REPLACE FUNCTION public.can_access_deal(target_athlete_id uuid, target_business_id uuid)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
    SELECT (
        target_athlete_id IS NOT NULL AND EXISTS (
            SELECT 1
            FROM public.athletes a
            WHERE a.id = target_athlete_id
              AND a.user_id = auth.uid()
        )
    )
    OR (
        target_business_id IS NOT NULL AND EXISTS (
            SELECT 1
            FROM public.businesses b
            WHERE b.id = target_business_id
              AND b.owner_user_id = auth.uid()
        )
    )
    OR EXISTS (
        SELECT 1
        FROM public.directors d
        JOIN public.athletes a2 ON a2.school_id = d.school_id
        WHERE d.user_id = auth.uid()
          AND a2.id = target_athlete_id
    );
$$;

-- ============================
-- ATHLETES
-- ============================
ALTER TABLE public.athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athletes FORCE ROW LEVEL SECURITY;

CREATE POLICY athletes_self_access ON public.athletes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY athletes_self_write ON public.athletes
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY directors_manage_school_athletes ON public.athletes
    FOR SELECT USING (public.is_school_director(school_id));

CREATE POLICY directors_update_school_athletes ON public.athletes
    FOR UPDATE USING (public.is_school_director(school_id))
    WITH CHECK (public.is_school_director(school_id));

CREATE POLICY service_role_all_access_athletes ON public.athletes
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================
-- DIRECTORS
-- ============================
ALTER TABLE public.directors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directors FORCE ROW LEVEL SECURITY;

CREATE POLICY directors_self_access ON public.directors
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY directors_self_write ON public.directors
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY service_role_all_access_directors ON public.directors
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================
-- BUSINESSES
-- ============================
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses FORCE ROW LEVEL SECURITY;

CREATE POLICY businesses_owner_access ON public.businesses
    FOR SELECT USING (auth.uid() = owner_user_id);

CREATE POLICY businesses_owner_write ON public.businesses
    FOR UPDATE USING (auth.uid() = owner_user_id)
    WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY businesses_owner_delete ON public.businesses
    FOR DELETE USING (auth.uid() = owner_user_id);

CREATE POLICY businesses_owner_insert ON public.businesses
    FOR INSERT WITH CHECK (owner_user_id = auth.uid());

CREATE POLICY service_role_all_access_businesses ON public.businesses
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================
-- DEALS
-- ============================
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals FORCE ROW LEVEL SECURITY;

CREATE POLICY deals_participant_select ON public.deals
    FOR SELECT USING (public.can_access_deal(athlete_id, business_id));

CREATE POLICY deals_participant_update ON public.deals
    FOR UPDATE USING (public.can_access_deal(athlete_id, business_id))
    WITH CHECK (public.can_access_deal(athlete_id, business_id));

CREATE POLICY deals_participant_delete ON public.deals
    FOR DELETE USING (public.can_access_deal(athlete_id, business_id));

CREATE POLICY deals_participant_insert ON public.deals
    FOR INSERT
    WITH CHECK (
        created_by = auth.uid()
        AND (
            EXISTS (
                SELECT 1 FROM public.athletes a
                WHERE a.id = deals.athlete_id
                  AND a.user_id = auth.uid()
            )
            OR EXISTS (
                SELECT 1 FROM public.businesses b
                WHERE b.id = deals.business_id
                  AND b.owner_user_id = auth.uid()
            )
            OR EXISTS (
                SELECT 1 FROM public.directors d
                JOIN public.athletes a2 ON a2.school_id = d.school_id
                WHERE d.user_id = auth.uid()
                  AND a2.id = deals.athlete_id
            )
        )
    );

CREATE POLICY service_role_all_access_deals ON public.deals
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================
-- DEAL DOCUMENTS
-- ============================
ALTER TABLE public.deal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_documents FORCE ROW LEVEL SECURITY;

CREATE POLICY documents_participant_select ON public.deal_documents
    FOR SELECT
    USING (
        uploaded_by = auth.uid()
        OR EXISTS (
            SELECT 1
            FROM public.deals d
            WHERE d.id = deal_id
              AND public.can_access_deal(d.athlete_id, d.business_id)
        )
    );

CREATE POLICY documents_participant_insert ON public.deal_documents
    FOR INSERT
    WITH CHECK (
        uploaded_by = auth.uid()
        AND EXISTS (
            SELECT 1
            FROM public.deals d
            WHERE d.id = deal_id
              AND public.can_access_deal(d.athlete_id, d.business_id)
        )
    );

CREATE POLICY documents_participant_update ON public.deal_documents
    FOR UPDATE
    USING (uploaded_by = auth.uid())
    WITH CHECK (
        uploaded_by = auth.uid()
        AND EXISTS (
            SELECT 1
            FROM public.deals d
            WHERE d.id = deal_id
              AND public.can_access_deal(d.athlete_id, d.business_id)
        )
    );

CREATE POLICY documents_participant_delete ON public.deal_documents
    FOR DELETE USING (uploaded_by = auth.uid());

CREATE POLICY service_role_all_access_documents ON public.deal_documents
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================
-- DEAL APPROVALS
-- ============================
ALTER TABLE public.deal_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_approvals FORCE ROW LEVEL SECURITY;

CREATE POLICY approvals_director_access ON public.deal_approvals
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1
            FROM public.deals d
            JOIN public.athletes a ON a.id = d.athlete_id
            WHERE d.id = deal_id
              AND public.is_school_director(a.school_id)
        )
    );

CREATE POLICY approvals_director_insert ON public.deal_approvals
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.deals d
            JOIN public.athletes a ON a.id = d.athlete_id
            WHERE d.id = deal_id
              AND public.is_school_director(a.school_id)
        )
    );

CREATE POLICY service_role_all_access_approvals ON public.deal_approvals
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================
-- DEAL RATINGS
-- ============================
ALTER TABLE public.deal_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_ratings FORCE ROW LEVEL SECURITY;

CREATE POLICY ratings_participant_select ON public.deal_ratings
    FOR SELECT USING (
        created_by = auth.uid()
        OR EXISTS (
            SELECT 1
            FROM public.deals d
            WHERE d.id = deal_id
              AND public.can_access_deal(d.athlete_id, d.business_id)
        )
    );

CREATE POLICY ratings_participant_insert ON public.deal_ratings
    FOR INSERT
    WITH CHECK (
        created_by = auth.uid()
        AND EXISTS (
            SELECT 1
            FROM public.deals d
            WHERE d.id = deal_id
              AND public.can_access_deal(d.athlete_id, d.business_id)
        )
    );

CREATE POLICY ratings_participant_update ON public.deal_ratings
    FOR UPDATE USING (created_by = auth.uid())
    WITH CHECK (
        created_by = auth.uid()
        AND EXISTS (
            SELECT 1
            FROM public.deals d
            WHERE d.id = deal_id
              AND public.can_access_deal(d.athlete_id, d.business_id)
        )
    );

CREATE POLICY ratings_participant_delete ON public.deal_ratings
    FOR DELETE USING (created_by = auth.uid());

CREATE POLICY service_role_all_access_ratings ON public.deal_ratings
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================
-- COMPLIANCE LOGS
-- ============================
ALTER TABLE public.compliance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_logs FORCE ROW LEVEL SECURITY;

CREATE POLICY compliance_logs_creator_access ON public.compliance_logs
    FOR SELECT USING (created_by = auth.uid());

CREATE POLICY compliance_logs_creator_insert ON public.compliance_logs
    FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY service_role_all_access_logs ON public.compliance_logs
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================
-- RESTRICTED CATEGORIES
-- ============================
ALTER TABLE public.restricted_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restricted_categories FORCE ROW LEVEL SECURITY;

CREATE POLICY restricted_categories_director_select ON public.restricted_categories
    FOR SELECT USING (public.is_school_director(school_id));

CREATE POLICY restricted_categories_director_write ON public.restricted_categories
    FOR ALL
    USING (public.is_school_director(school_id))
    WITH CHECK (public.is_school_director(school_id));

CREATE POLICY service_role_all_access_restricted_categories ON public.restricted_categories
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

COMMIT;
