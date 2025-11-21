-- ==========================================
-- Rootd NIL Compliance + Matching Schema
-- ==========================================

-- Enable extension for UUID generation if not active
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- ============================
-- SCHOOLS
-- ============================
CREATE TABLE schools (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
	name TEXT NOT NULL,
	city TEXT,
	state TEXT,
	compliance_contact_email TEXT,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================
-- ATHLETES
-- ============================
CREATE TABLE athletes (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
	user_id UUID UNIQUE NOT NULL,
	school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
	sport TEXT,
	class_year TEXT,

	kyc_status TEXT DEFAULT 'not_started',
	w9_status TEXT DEFAULT 'not_started',
	tax_readiness_score INT DEFAULT 0,
	compliance_readiness_score INT DEFAULT 0,

	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_athletes_school ON athletes(school_id);

-- ============================
-- BUSINESSES
-- ============================
CREATE TABLE businesses (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),

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

	risk_flags JSONB DEFAULT '[]'::jsonb,
	tone_tags JSONB DEFAULT '[]'::jsonb,
	audience_tags JSONB DEFAULT '[]'::jsonb,
	value_tags JSONB DEFAULT '[]'::jsonb,

	last_classified_at TIMESTAMP WITH TIME ZONE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_business_location ON businesses USING GIST (ll_to_earth(lat, lng));
CREATE INDEX idx_business_place_id ON businesses(google_place_id);

-- ============================
-- DEALS
-- ============================
CREATE TABLE deals (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),

	athlete_id UUID REFERENCES athletes(id) ON DELETE CASCADE,
	business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,

	match_score INT,
	match_confidence INT,

	deal_status TEXT DEFAULT 'draft',
	deal_type TEXT,
	deliverables JSONB,

	compensation_cash INT,
	compensation_non_cash TEXT,

	start_date DATE,
	end_date DATE,

	created_by UUID NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_deals_athlete ON deals(athlete_id);
CREATE INDEX idx_deals_business ON deals(business_id);
CREATE INDEX idx_deals_status ON deals(deal_status);

-- ============================
-- DEAL DOCUMENTS
-- ============================
CREATE TABLE deal_documents (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
	deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,

	document_type TEXT NOT NULL,
	file_url TEXT NOT NULL,

	uploaded_by UUID NOT NULL,
	uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_documents_deal ON deal_documents(deal_id);

-- ============================
-- DEAL APPROVALS (School Compliance)
-- ============================
CREATE TABLE deal_approvals (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),

	deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
	approved_by UUID NOT NULL,
	decision TEXT NOT NULL,   -- 'approved' | 'denied' | 'needs_revision'
	notes TEXT,

	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_approvals_deal ON deal_approvals(deal_id);

-- ============================
-- DEAL RATINGS (Businesses → Athletes)
-- ============================
CREATE TABLE deal_ratings (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),

	deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
	business_id UUID REFERENCES businesses(id),
	athlete_id UUID REFERENCES athletes(id),

	rating INT CHECK (rating >= 0 AND rating <= 5),
	comment TEXT,

	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ratings_deal ON deal_ratings(deal_id);
CREATE INDEX idx_ratings_athlete ON deal_ratings(athlete_id);

-- ============================
-- COMPLIANCE LOGS (Immutable Audit)
-- ============================
CREATE TABLE compliance_logs (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),

	entity_type TEXT NOT NULL,
	entity_id UUID NOT NULL,

	event_type TEXT NOT NULL,
	event_data JSONB,

	created_by UUID,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_logs_entity ON compliance_logs(entity_id);
CREATE INDEX idx_logs_type ON compliance_logs(event_type);

-- ============================
-- RESTRICTED CATEGORIES (per school)
-- ============================
CREATE TABLE restricted_categories (
	id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),

	school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
	category_name TEXT NOT NULL,

	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_restricted_school ON restricted_categories(school_id);

-- ================================================
-- END OF ROOTD COMPLIANCE SCHEMA
-- ================================================
