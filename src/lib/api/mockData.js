export const demoAthlete = {
  id: 'demo-athlete',
  user_id: 'demo-user',
  first_name: 'Jordan',
  last_name: 'Kelly',
  sport: 'Women\'s Basketball',
  school_id: 'demo-school',
  school: {
    name: 'Coastal State University'
  },
  kyc_status: 'completed',
  w9_status: 'completed',
  tax_readiness_score: 82,
  compliance_readiness_score: 78,
  persona_summary: 'Playmaker with high community resonance and strong local audience engagement.',
  content_channels: [
    { platform: 'Instagram', handle: '@jkelly', followers: 52000, health: 'green' },
    { platform: 'TikTok', handle: '@jordynkelly', followers: 84000, health: 'green' },
    { platform: 'YouTube', handle: 'Jordan Kelly Diaries', followers: 14500, health: 'amber' }
  ]
};

export const demoBusiness = {
  id: 'demo-business',
  owner_user_id: 'demo-user',
  name: 'Village Coffee Roasters',
  city: 'Austin',
  state: 'TX',
  categories: ['Coffee', 'Community'],
  value_tags: ['Local Love', 'Female Founded'],
  risk_flags: [],
  rating: 4.7,
  review_count: 182,
  budget_range: '$5-8K',
  campaign_types: ['In-store experiences', 'Content drops']
};

export const demoDirector = {
  id: 'demo-director',
  user_id: 'demo-user',
  school_id: 'demo-school',
  school: {
    name: 'Coastal State University'
  },
  restricted_categories: ['Sports betting', 'Energy drinks'],
  approval_sla_days: 5
};

export const demoComplianceTasks = [
  { id: 'task-1', title: 'Submit quarterly disclosure', due: '2025-11-25', status: 'due', owner: 'Athletics' },
  { id: 'task-2', title: 'Upload W9 for Village Coffee Roasters deal', due: '2025-11-20', status: 'in_progress', owner: 'Athlete' },
  { id: 'task-3', title: 'Review restricted categories', due: '2025-11-30', status: 'completed', owner: 'Director' }
];

export const demoMatches = [
  {
    id: 'match-1',
    business: 'Village Coffee Roasters',
    score: 94,
    confidence: 88,
    highlights: ['High overlap with morning commute audience', 'Past livestream success'],
    deliverables: ['Holiday tasting livestream', '2 reels', 'In-store signing'],
    budget: '$12K cash + $2K in-kind'
  },
  {
    id: 'match-2',
    business: 'Metro Credit Union',
    score: 89,
    confidence: 81,
    highlights: ['Financial literacy tie-in', 'Director approved compliance ready'],
    deliverables: ['Financial tips carousel', 'Campus workshop'],
    budget: '$8K cash + scholarships'
  }
];

export const demoDeals = [
  {
    id: 'deal-1',
    business: 'Village Coffee Roasters',
    status: 'negotiation',
    start_date: '2025-11-22',
    end_date: '2026-01-15',
    compensation_cash: 12000,
    created_at: '2025-11-15',
    approvals: [{ role: 'Director', status: 'pending' }],
    documents: [{ type: 'Contract draft', status: 'needs review' }]
  },
  {
    id: 'deal-2',
    business: 'Metro Credit Union',
    status: 'approved',
    start_date: '2025-11-30',
    end_date: '2026-03-01',
    compensation_cash: 8000,
    created_at: '2025-11-10',
    approvals: [{ role: 'Director', status: 'approved' }],
    documents: [{ type: 'Disclosure form', status: 'submitted' }]
  }
];

export const demoNotifications = [
  {
    id: 'notif-1',
    title: 'Director approval needed',
    detail: 'CSU compliance needs sign-off for Metro Credit Union deliverables.',
    timestamp: '2m ago',
    type: 'compliance'
  },
  {
    id: 'notif-2',
    title: 'New partnership invite',
    detail: 'Legends Sportswear dropped a Black Friday NIL package.',
    timestamp: '1h ago',
    type: 'match'
  },
  {
    id: 'notif-3',
    title: 'Payment posted',
    detail: 'Village Coffee Roasters sent $4,200 advance.',
    timestamp: 'Yesterday',
    type: 'finance'
  }
];

export const demoMessages = [
  {
    id: 'msg-1',
    sender: 'Olivia (Village Coffee)',
    body: 'Dropping the carousel copy here for review. Let me know if the tone still feels on-brand!',
    timestamp: '9:32 AM'
  },
  {
    id: 'msg-2',
    sender: 'Marcus · Compliance',
    body: 'Quick reminder that the deliverable recap is due Friday. Need a quick sync?',
    timestamp: '8:02 AM'
  }
];
