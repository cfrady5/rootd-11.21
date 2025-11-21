-- ==========================================
-- Rootd NIL Compliance + Matching Schema
-- Split into Supabase migrations
-- ==========================================

BEGIN;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    compliance_contact_email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================
CREATE TABLE IF NOT EXISTS public.directors (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES public.schools (id) ON DELETE CASCADE,
    title TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_directors_school ON public.directors (school_id);

-- ============================
CREATE TABLE IF NOT EXISTS public.athletes (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    school_id UUID REFERENCES public.schools (id) ON DELETE CASCADE,
    sport TEXT,
    class_year TEXT,
    kyc_status TEXT NOT NULL DEFAULT 'not_started',
    w9_status TEXT NOT NULL DEFAULT 'not_started',
    tax_readiness_score INT NOT NULL DEFAULT 0,
    compliance_readiness_score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_athletes_school ON public.athletes (school_id);

-- ============================
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    owner_user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    google_place_id TEXT UNIQUE,
    yelp_id TEXT,
    name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    categories JSONB,
    price_level INT,
    rating DOUBLE PRECISION,
    review_count INT,
    risk_flags JSONB NOT NULL DEFAULT '[]'::jsonb,
    tone_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    audience_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    value_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    last_classified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_business_location ON public.businesses USING GIST (ll_to_earth(lat, lng));
CREATE INDEX IF NOT EXISTS idx_business_place_id ON public.businesses (google_place_id);
CREATE INDEX IF NOT EXISTS idx_business_owner ON public.businesses (owner_user_id);

-- ============================
CREATE TABLE IF NOT EXISTS public.deals (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    athlete_id UUID NOT NULL REFERENCES public.athletes (id) ON DELETE CASCADE,
    business_id UUID NOT NULL REFERENCES public.businesses (id) ON DELETE CASCADE,
    match_score INT,
    match_confidence INT,
    deal_status TEXT NOT NULL DEFAULT 'draft' CHECK (deal_status IN ('draft', 'pending', 'approved', 'completed', 'cancelled')),
    deal_type TEXT,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    compensation_cash INT,
    compensation_non_cash TEXT,
    start_date DATE,
    end_date DATE,
    created_by UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deals_athlete ON public.deals (athlete_id);
CREATE INDEX IF NOT EXISTS idx_deals_business ON public.deals (business_id);
CREATE INDEX IF NOT EXISTS idx_deals_status ON public.deals (deal_status);

-- ============================
CREATE TABLE IF NOT EXISTS public.deal_documents (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES public.deals (id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_deal ON public.deal_documents (deal_id);

-- ============================
CREATE TABLE IF NOT EXISTS public.deal_approvals (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES public.deals (id) ON DELETE CASCADE,
    approved_by UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    decision TEXT NOT NULL CHECK (decision IN ('approved', 'denied', 'needs_revision')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_approvals_deal ON public.deal_approvals (deal_id);

-- ============================
CREATE TABLE IF NOT EXISTS public.deal_ratings (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES public.deals (id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses (id) ON DELETE CASCADE,
    athlete_id UUID REFERENCES public.athletes (id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating BETWEEN 0 AND 5),
    comment TEXT,
    created_by UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ratings_deal ON public.deal_ratings (deal_id);
CREATE INDEX IF NOT EXISTS idx_ratings_athlete ON public.deal_ratings (athlete_id);
CREATE INDEX IF NOT EXISTS idx_ratings_business ON public.deal_ratings (business_id);

-- ============================
CREATE TABLE IF NOT EXISTS public.compliance_logs (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    event_type TEXT NOT NULL,
    event_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users (id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_logs_entity ON public.compliance_logs (entity_id);
CREATE INDEX IF NOT EXISTS idx_logs_type ON public.compliance_logs (event_type);

-- ============================
CREATE TABLE IF NOT EXISTS public.restricted_categories (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES public.schools (id) ON DELETE CASCADE,
    category_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_restricted_school ON public.restricted_categories (school_id);

COMMIT;
