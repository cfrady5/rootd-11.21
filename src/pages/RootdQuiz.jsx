import React, { useEffect, useMemo, useState } from 'react';
import {
  PageHeader,
  Button,
  LoadingSpinner,
  StatCard,
  DrawerContainer
} from '../components/director/PremiumComponents.jsx';

const brand = {
  primary: '#4c5937',
  dark: '#3a4528',
  light: '#6a784a',
  shadow: 'rgba(76, 89, 55, 0.15)'
};

const LIKERT_SCALE = [
  { value: 'strongly_disagree', label: 'Strongly disagree', numericValue: 0 },
  { value: 'disagree', label: 'Disagree', numericValue: 0.25 },
  { value: 'neutral', label: 'Neutral', numericValue: 0.5 },
  { value: 'agree', label: 'Agree', numericValue: 0.75 },
  { value: 'strongly_agree', label: 'Strongly agree', numericValue: 1 }
];

const QUIZ_QUESTIONS = [
  // Professionalism & reliability in NIL deals
  {
    id: 'Q1',
    section: 'rootd_score',
    dimension: 'professionalism',
    type: 'likert',
    prompt: 'Brands, local businesses, and my athletic department can count on me to deliver what I promise for NIL campaigns.',
    helperText: 'Reliability delivering on NIL agreements',
    options: LIKERT_SCALE,
    weight: 5
  },
  {
    id: 'Q2',
    section: 'rootd_score',
    dimension: 'professionalism',
    type: 'single_select',
    prompt: 'When a business or staff member reaches out about a potential NIL opportunity, how quickly do you typically respond?',
    options: [
      { value: '24h', label: 'Same day (within 24 hours)', numericValue: 1 },
      { value: '48h', label: 'Within 48 hours', numericValue: 0.75 },
      { value: '72h', label: 'Within 3 days', numericValue: 0.5 },
      { value: 'week', label: 'Within a week', numericValue: 0.25 }
    ],
    weight: 4
  },
  {
    id: 'Q3',
    section: 'rootd_score',
    dimension: 'professionalism',
    type: 'likert',
    prompt: 'I have a clear process for approvals, deliverables, and feedback when working on NIL deals.',
    helperText: 'Organization around timelines and expectations',
    options: LIKERT_SCALE,
    weight: 4
  },
  {
    id: 'Q4',
    section: 'rootd_score',
    dimension: 'professionalism',
    type: 'single_select',
    prompt: 'How often do you proactively share updates with partners or staff during a campaign so no one has to chase you?',
    options: [
      { value: 'weekly', label: 'Weekly status updates', numericValue: 1 },
      { value: 'milestones', label: 'At key milestones and posts', numericValue: 0.75 },
      { value: 'as_needed', label: 'Only when asked for an update', numericValue: 0.4 },
      { value: 'rarely', label: 'Rarely or never', numericValue: 0.1 }
    ],
    weight: 3
  },
  {
    id: 'Q5',
    section: 'rootd_score',
    dimension: 'professionalism',
    type: 'single_select',
    prompt: 'Which best describes how you usually handle NIL agreements today?',
    options: [
      { value: 'structured', label: 'Formal agreements with clear terms and sign off', numericValue: 1 },
      { value: 'semi_structured', label: 'Emails or shared docs that outline expectations', numericValue: 0.7 },
      { value: 'informal', label: 'Mostly text or DMs with loose expectations', numericValue: 0.3 }
    ],
    weight: 3
  },

  // Content quality & brand safety for NIL
  {
    id: 'Q6',
    section: 'rootd_score',
    dimension: 'content_quality',
    type: 'likert',
    prompt: 'My content feels consistent with my personal brand and is something schools, families, and local businesses are proud to be attached to.',
    options: LIKERT_SCALE,
    weight: 4
  },
  {
    id: 'Q7',
    section: 'rootd_score',
    dimension: 'content_quality',
    type: 'single_select',
    prompt: 'How many polished posts do you usually create each week across your main channels that you would be comfortable using in NIL campaigns?',
    options: [
      { value: '5_plus', label: '5 or more posts per week', numericValue: 1 },
      { value: '3_4', label: '3 to 4 posts per week', numericValue: 0.8 },
      { value: '1_2', label: '1 to 2 posts per week', numericValue: 0.5 },
      { value: 'less', label: 'Less than once a week', numericValue: 0.2 }
    ],
    weight: 4
  },
  {
    id: 'Q8',
    section: 'rootd_score',
    dimension: 'content_quality',
    type: 'multi_number',
    prompt: 'In a normal month, how many sponsored or NIL posts could you comfortably deliver without overloading your schedule?',
    helperText: 'Enter an approximate number of posts or deliverables',
    numberConfig: { min: 0, max: 20, step: 1 },
    weight: 3
  },
  {
    id: 'Q9',
    section: 'rootd_score',
    dimension: 'content_quality',
    type: 'likert',
    prompt: 'I create content that stays within school and brand guidelines without needing heavy edits or rewrites.',
    options: LIKERT_SCALE,
    weight: 4
  },
  {
    id: 'Q10',
    section: 'rootd_score',
    dimension: 'content_quality',
    type: 'single_select',
    prompt: 'When working with a local business on content, how do you like the creative process to feel?',
    options: [
      { value: 'structured_campaigns', label: 'Very structured with clear briefs and talking points', numericValue: 0.6 },
      { value: 'balanced', label: 'Balanced structure with room for my voice and ideas', numericValue: 0.85 },
      { value: 'highly_experimental', label: 'Love testing unique ideas that stand out while staying on brand', numericValue: 1 }
    ],
    weight: 3
  },

  // Local influence & community fit for Rootd
  {
    id: 'Q11',
    section: 'rootd_score',
    dimension: 'local_influence',
    type: 'likert',
    prompt: 'My teammates, students, and local fans look to me for where to eat, shop, and hang out around campus.',
    options: LIKERT_SCALE,
    weight: 4
  },
  {
    id: 'Q12',
    section: 'rootd_score',
    dimension: 'local_influence',
    type: 'single_select',
    prompt: 'How often do you show up at local or campus events where brands could activate with you?',
    options: [
      { value: 'weekly_events', label: 'At least once a week', numericValue: 1 },
      { value: 'biweekly', label: 'Every other week', numericValue: 0.8 },
      { value: 'monthly', label: 'About once a month', numericValue: 0.6 },
      { value: 'quarterly', label: 'Only a few times per year', numericValue: 0.3 }
    ],
    weight: 3
  },
  {
    id: 'Q13',
    section: 'rootd_score',
    dimension: 'local_influence',
    type: 'multi_select',
    prompt: 'Where are you most likely to be recognized by people in your community or on campus?',
    options: [
      { value: 'sports_games', label: 'Home games and athletic events', numericValue: 1 },
      { value: 'campus', label: 'Around campus and student life events', numericValue: 0.9 },
      { value: 'nightlife', label: 'Local nightlife spots and venues', numericValue: 0.75 },
      { value: 'community_centers', label: 'Community centers, youth leagues, or rec gyms', numericValue: 0.7 }
    ],
    weight: 3
  },
  {
    id: 'Q14',
    section: 'rootd_score',
    dimension: 'local_influence',
    type: 'single_select',
    prompt: 'How comfortable are you activating with families and youth groups for NIL appearances or community events?',
    options: [
      { value: 'very_comfortable', label: 'Very comfortable and excited to do it', numericValue: 1 },
      { value: 'somewhat_comfortable', label: 'Comfortable in the right setting', numericValue: 0.75 },
      { value: 'situational', label: 'Depends on the event and timing', numericValue: 0.5 },
      { value: 'prefer_adults', label: 'Prefer activations geared more toward students and adults', numericValue: 0.25 }
    ],
    weight: 3
  },
  {
    id: 'Q15',
    section: 'rootd_score',
    dimension: 'local_influence',
    type: 'likert',
    prompt: 'Local media, student sections, or campus leaders reference my name or content when talking about our program.',
    options: LIKERT_SCALE,
    weight: 4
  },

  // Food & drink interests for local partner matching
  {
    id: 'Q16',
    section: 'interests',
    dimension: 'food_drink',
    type: 'multi_select',
    prompt: 'Which types of food and drink spots do you naturally shout out or bring teammates to around town?',
    options: [
      { value: 'coffee', label: 'Coffee shops and study spots', numericValue: 1, tags: ['coffee_shops'] },
      { value: 'brunch', label: 'Weekend brunch or breakfast spots', numericValue: 0.9, tags: ['brunch'] },
      { value: 'healthy', label: 'Healthy bowls, smoothies, or juice bars', numericValue: 0.85, tags: ['healthy_eating'] },
      { value: 'late_night', label: 'Late night food after games or practices', numericValue: 0.7, tags: ['late_night'] }
    ],
    weight: 3
  },
  {
    id: 'Q17',
    section: 'interests',
    dimension: 'food_drink',
    type: 'single_select',
    prompt: 'Where do you usually meet up with friends, teammates, or partners when you want a good space to talk?',
    options: [
      { value: 'coffee_meet', label: 'Campus or neighborhood coffee shops', numericValue: 1, tags: ['coffee_shops'] },
      { value: 'lounge', label: 'Lobbies, lounges, or hotel bars (non alcohol focused)', numericValue: 0.8, tags: ['lifestyle_lounges'] },
      { value: 'cowork', label: 'Co working or shared workspace style spots', numericValue: 0.7, tags: ['cowork_spaces'] }
    ],
    weight: 2
  },
  {
    id: 'Q18',
    section: 'interests',
    dimension: 'food_drink',
    type: 'multi_select',
    prompt: 'Which dining vibes feel most on brand for you and your audience?',
    options: [
      { value: 'family_dining', label: 'Family friendly restaurants', numericValue: 0.9, tags: ['family_dining'] },
      { value: 'chef_led', label: 'Chef driven or higher end experiences', numericValue: 1, tags: ['chef_led'] },
      { value: 'grab_go', label: 'Quick grab and go lunch spots', numericValue: 0.7, tags: ['quick_bites'] },
      { value: 'campus_eats', label: 'Student heavy or campus focused food spots', numericValue: 0.6, tags: ['campus_food'] }
    ],
    weight: 3
  },
  {
    id: 'Q19',
    section: 'interests',
    dimension: 'food_drink',
    type: 'single_select',
    prompt: 'When you post beverages or drink content, what shows up most often?',
    options: [
      { value: 'espresso', label: 'Espresso drinks and specialty coffee', numericValue: 1, tags: ['coffee_shops'] },
      { value: 'mocktail', label: 'Mocktails and zero proof options', numericValue: 0.85, tags: ['mocktails'] },
      { value: 'sports_bar', label: 'Game day food and beverage at sports bar type locations', numericValue: 0.75, tags: ['sports_bars'] }
    ],
    weight: 2
  },
  {
    id: 'Q20',
    section: 'interests',
    dimension: 'food_drink',
    type: 'multi_number',
    prompt: 'Roughly how many new food or drink places do you tag or feature in your content each month?',
    numberConfig: { min: 0, max: 12, step: 1 },
    weight: 2,
    tags: ['discovery_food']
  },

  // Lifestyle & retail for NIL partners
  {
    id: 'Q21',
    section: 'interests',
    dimension: 'lifestyle',
    type: 'multi_select',
    prompt: 'Which local retail or lifestyle categories does your audience respond to the most?',
    options: [
      { value: 'sports_cards', label: 'Sports card shops and memorabilia stores', numericValue: 1, tags: ['sports_cards'] },
      { value: 'sneakers', label: 'Sneaker boutiques and streetwear shops', numericValue: 0.95, tags: ['sneakers'] },
      { value: 'gaming', label: 'Gaming lounges, esports venues, or card shops', numericValue: 0.85, tags: ['gaming'] },
      { value: 'beauty', label: 'Barbershops, salons, or grooming studios', numericValue: 0.8, tags: ['barbershop', 'beauty'] }
    ],
    weight: 3
  },
  {
    id: 'Q22',
    section: 'interests',
    dimension: 'lifestyle',
    type: 'single_select',
    prompt: 'When you share fitness or wellness moments, which vibe fits best?',
    options: [
      { value: 'gyms', label: 'Training sessions at local gyms or training centers', numericValue: 1, tags: ['fitness'] },
      { value: 'outdoor', label: 'Outdoor runs, pick up runs, or club workouts', numericValue: 0.8, tags: ['outdoor_fitness'] },
      { value: 'recovery', label: 'Cold tubs, recovery studios, or wellness spots', numericValue: 0.7, tags: ['recovery'] }
    ],
    weight: 2
  },
  {
    id: 'Q23',
    section: 'interests',
    dimension: 'lifestyle',
    type: 'multi_select',
    prompt: 'What type of entertainment content do you usually post on stories or short form?',
    options: [
      { value: 'movie_premieres', label: 'Movies, premieres, or cinema nights', numericValue: 0.8, tags: ['entertainment'] },
      { value: 'live_music', label: 'Live music venues and local artists', numericValue: 0.9, tags: ['live_music'] },
      { value: 'college_sports', label: 'Other college sports games and events', numericValue: 0.85, tags: ['college_sports'] },
      { value: 'popups', label: 'Pop up shops, markets, or brand activations', numericValue: 0.75, tags: ['popups'] }
    ],
    weight: 2
  },
  {
    id: 'Q24',
    section: 'interests',
    dimension: 'lifestyle',
    type: 'single_select',
    prompt: 'When you run errands or share everyday life, which content feels most natural?',
    options: [
      { value: 'local_boutiques', label: 'Local boutiques and small shops', numericValue: 0.9, tags: ['boutiques'] },
      { value: 'farmers_market', label: 'Farmers markets or local makers', numericValue: 1, tags: ['farmers_market'] },
      { value: 'big_box', label: 'Big box stores and national chains', numericValue: 0.7, tags: ['big_box'] }
    ],
    weight: 2
  },
  {
    id: 'Q25',
    section: 'interests',
    dimension: 'lifestyle',
    type: 'multi_number',
    prompt: 'About how many local retail businesses do you naturally shout out or tag in a typical month?',
    numberConfig: { min: 0, max: 10, step: 1 },
    weight: 2,
    tags: ['retail_support']
  },

  // Activation preferences for Rootd campaigns
  {
    id: 'Q26',
    section: 'interests',
    dimension: 'activation',
    type: 'single_select',
    prompt: 'If Rootd brought you a perfect NIL opportunity, what type of campaign format would you want first?',
    options: [
      { value: 'content_only', label: 'Content only or remote deliverables', numericValue: 0.8, tags: ['content_only'] },
      { value: 'hybrid', label: 'Mix of content plus in person moments', numericValue: 1, tags: ['hybrid_events'] },
      { value: 'in_person', label: 'Mainly in person takeovers or appearances', numericValue: 0.9, tags: ['in_person'] }
    ],
    weight: 3
  },
  {
    id: 'Q27',
    section: 'interests',
    dimension: 'activation',
    type: 'multi_select',
    prompt: 'What kinds of extras make a NIL partnership feel exciting and aligned with your brand?',
    options: [
      { value: 'charity', label: 'Charity or community giveback built into the deal', numericValue: 1, tags: ['charity'] },
      { value: 'product_drops', label: 'Limited product drops or special collections', numericValue: 0.9, tags: ['product_drops'] },
      { value: 'experiential', label: 'Immersive or behind the scenes experiences', numericValue: 0.85, tags: ['experiential'] },
      { value: 'recurring', label: 'Recurring residencies or ongoing series with a brand', numericValue: 0.8, tags: ['recurring_series'] }
    ],
    weight: 2
  },
  {
    id: 'Q28',
    section: 'interests',
    dimension: 'activation',
    type: 'single_select',
    prompt: 'For most NIL campaigns, how many touchpoints with your audience feels ideal?',
    options: [
      { value: 'one_off', label: 'One big hero moment or announcement', numericValue: 0.6, tags: ['one_off'] },
      { value: 'mini_series', label: 'Mini series with three to four posts or appearances', numericValue: 0.85, tags: ['mini_series'] },
      { value: 'long_term', label: 'Long term partner that my audience sees often', numericValue: 1, tags: ['long_term'] }
    ],
    weight: 2
  },

  // Values & communities for story aligned NIL
  {
    id: 'Q29',
    section: 'interests',
    dimension: 'values',
    type: 'multi_select',
    prompt: 'Which communities are at the center of your story and the people you want your NIL work to serve?',
    options: [
      { value: 'family', label: 'Family oriented audiences and parents', numericValue: 1, tags: ['families'] },
      { value: 'faith', label: 'Faith driven or values based groups', numericValue: 0.9, tags: ['faith'] },
      { value: 'students', label: 'Students and campus life', numericValue: 0.85, tags: ['students'] },
      { value: 'youth_sports', label: 'Youth athletes, camps, and clinics', numericValue: 0.95, tags: ['youth_athletes'] }
    ],
    weight: 3
  },
  {
    id: 'Q30',
    section: 'interests',
    dimension: 'values',
    type: 'single_select',
    prompt: 'When you think about giving back through NIL, what type of impact feels most meaningful to you?',
    options: [
      { value: 'mentorship', label: 'Mentoring younger athletes or speaking to groups', numericValue: 1, tags: ['mentorship'] },
      { value: 'fundraisers', label: 'Hosting or supporting fundraisers and events', numericValue: 0.85, tags: ['fundraisers'] },
      { value: 'awareness', label: 'Raising awareness for causes through content', numericValue: 0.75, tags: ['awareness'] }
    ],
    weight: 2
  }
];

const DIMENSION_WEIGHTS = {
  professionalism: 0.35,
  content_quality: 0.35,
  local_influence: 0.3
};

const INTEREST_LABELS = {
  coffee_shops: 'Coffee shops',
  brunch: 'Weekend brunch',
  healthy_eating: 'Healthy bowls',
  late_night: 'Late-night bites',
  lifestyle_lounges: 'Lounges',
  cowork_spaces: 'Co-working hubs',
  family_dining: 'Family dining',
  chef_led: 'Chef-led dining',
  quick_bites: 'Quick bites',
  campus_food: 'Campus eats',
  mocktails: 'Mocktails',
  sports_bars: 'Sports bars',
  discovery_food: 'Food discovery',
  sports_cards: 'Sports cards',
  sneakers: 'Sneakers & streetwear',
  gaming: 'Gaming lounges',
  barbershop: 'Grooming studios',
  beauty: 'Beauty studios',
  fitness: 'Fitness gyms',
  outdoor_fitness: 'Outdoor fitness',
  recovery: 'Recovery studios',
  entertainment: 'Entertainment',
  live_music: 'Live music',
  college_sports: 'College sports',
  popups: 'Pop-up shops',
  boutiques: 'Boutiques',
  farmers_market: 'Farmers markets',
  big_box: 'Big-box finds',
  retail_support: 'Retail shoutouts',
  content_only: 'Content-only collabs',
  hybrid_events: 'Hybrid activations',
  in_person: 'In-person takeovers',
  charity: 'Charity tie-ins',
  product_drops: 'Product drops',
  experiential: 'Experiential moments',
  recurring_series: 'Recurring residencies',
  one_off: 'One-off hero',
  mini_series: 'Mini series',
  long_term: 'Long-term partner',
  families: 'Family audiences',
  faith: 'Faith communities',
  students: 'Students',
  youth_athletes: 'Youth athletes',
  mentorship: 'Mentorship',
  fundraisers: 'Fundraisers',
  awareness: 'Awareness content'
};

const NONE_OF_ABOVE_OPTION = { value: 'none_of_above', label: 'None of the above', numericValue: 0, tags: [] };

const SECTION_DETAILS = {
  professionalism: {
    title: 'Professionalism',
    description: 'Reliability, communication, and delivery discipline that builds trust.'
  },
  content_quality: {
    title: 'Content Quality',
    description: 'Consistency, polish, and creative range in your storytelling.'
  },
  local_influence: {
    title: 'Local Influence',
    description: 'Your community presence, recognition, and activation comfort.'
  },
  food_drink: {
    title: 'Food & Drink',
    description: 'The dining scenes and beverage rituals you naturally champion.'
  },
  lifestyle: {
    title: 'Lifestyle & Retail',
    description: 'Retail, fashion, wellness, and entertainment categories your audience follows.'
  },
  activation: {
    title: 'Activation Preferences',
    description: 'Preferred campaign formats, extras, and cadence.'
  },
  values: {
    title: 'Values & Communities',
    description: 'Communities and causes that define your platform.'
  }
};

const SECTION_IMPACT = {
  professionalism: 'Feeds directly into the reliability portion (35%) of your Rootd Score.',
  content_quality: 'Elevates the content polish portion (35%) of your Rootd Score.',
  local_influence: 'Shapes the local influence factor (30%) of your Rootd Score.',
  food_drink: 'Helps us recommend food and drink partners that match your vibe.',
  lifestyle: 'Informs lifestyle and retail matchmaking for campaigns and offers.',
  activation: 'Guides how we structure activations and residencies for you.',
  values: 'Highlights community-first causes to weave into partner briefs.'
};

const QUIZ_STORAGE_KEY = 'rootdQuizProgress';
const AVERAGE_SECONDS_PER_QUESTION = 18;
const TOTAL_ESTIMATED_MINUTES = Math.ceil((QUIZ_QUESTIONS.length * AVERAGE_SECONDS_PER_QUESTION) / 60);
const CHECKPOINTS = [
  {
    index: 9,
    title: 'First lap locked in',
    message: 'Professionalism boxes are checked. Keep cruising so Rootd can personalize the fun stuff.'
  },
  {
    index: 19,
    title: 'Momentum looks great',
    message: 'You are two thirds done. These last lifestyle vibes unlock richer partner matches.'
  },
  {
    index: 26,
    title: 'Final sprint',
    message: 'Only a few more taps until we generate your Rootd fingerprint and recommendations.'
  }
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatDimensionLabel(key = '') {
  if (!key) return '';
  return SECTION_DETAILS[key]?.title || key.replace(/_/g, ' ');
}

function formatEtaLabel(secondsRemaining) {
  if (secondsRemaining <= 0) return 'Wrap-up time';
  const minutes = Math.ceil(secondsRemaining / 60);
  if (minutes <= 1) return '≈1 min left';
  return `≈${minutes} min left`;
}

function isQuestionAnswered(question, value) {
  if (!question) return false;
  switch (question.type) {
    case 'likert':
    case 'single_select':
      return Boolean(value);
    case 'multi_select':
      return Array.isArray(value) && value.length > 0;
    case 'multi_number':
      return value !== undefined && value !== '';
    default:
      return false;
  }
}

function computeResults(questions, answers) {
  const dimensionTrackers = {
    professionalism: { sum: 0, weight: 0 },
    content_quality: { sum: 0, weight: 0 },
    local_influence: { sum: 0, weight: 0 }
  };

  const tagScores = {};
  const tagMax = {};

  questions.forEach((question) => {
    const response = answers[question.id];
    if (response === undefined || response === null || response === '') {
      return;
    }

    if (question.section === 'rootd_score') {
      const dimensionTracker = dimensionTrackers[question.dimension];
      if (!dimensionTracker) return;

      const numericValue = deriveNumericValue(question, response);
      dimensionTracker.sum += (numericValue || 0) * question.weight;
      dimensionTracker.weight += question.weight;
    } else if (question.section === 'interests') {
      const selectedOptions = deriveSelectedOptions(question, response);
      if (!selectedOptions.length) {
        if (question.type === 'multi_number' && question.tags) {
          const normalized = normalizeNumberAnswer(question, response);
          question.tags.forEach((tag) => {
            tagScores[tag] = (tagScores[tag] || 0) + normalized * question.weight;
            tagMax[tag] = (tagMax[tag] || 0) + question.weight;
          });
        }
        return;
      }

      selectedOptions.forEach((option) => {
        if (!option.tags) return;
        option.tags.forEach((tag) => {
          tagScores[tag] = (tagScores[tag] || 0) + (option.numericValue || 0) * question.weight;
          tagMax[tag] = (tagMax[tag] || 0) + question.weight;
        });
      });
    }
  });

  const dimensions = Object.fromEntries(
    Object.entries(dimensionTrackers).map(([key, tracker]) => {
      const score = tracker.weight ? (tracker.sum / tracker.weight) * 100 : 0;
      return [key, Math.round(score)];
    })
  );

  const rootdScore = Object.entries(DIMENSION_WEIGHTS).reduce((acc, [dimension, weight]) => {
    return acc + (dimensions[dimension] || 0) * weight;
  }, 0);

  const interests = Object.fromEntries(
    Object.entries(tagScores).map(([tag, value]) => {
      const normalized = tagMax[tag] ? clamp(value / tagMax[tag], 0, 1) : 0;
      return [tag, parseFloat(normalized.toFixed(2))];
    })
  );

  return {
    rootdScore: Math.round(rootdScore),
    dimensions,
    interests
  };
}

function deriveNumericValue(question, response) {
  if (question.type === 'multi_number') {
    return normalizeNumberAnswer(question, response);
  }

  if (question.type === 'multi_select') {
    const values = Array.isArray(response) ? response : [];
    if (!values.length) return 0;
    const matching = values
      .map((value) => {
        if (value === NONE_OF_ABOVE_OPTION.value) return NONE_OF_ABOVE_OPTION.numericValue;
        return question.options.find((option) => option.value === value)?.numericValue || 0;
      })
      .filter((val) => typeof val === 'number');
    if (!matching.length) return 0;
    return matching.reduce((sum, val) => sum + val, 0) / matching.length;
  }

  const option =
    response === NONE_OF_ABOVE_OPTION.value
      ? NONE_OF_ABOVE_OPTION
      : question.options?.find((opt) => opt.value === response);
  return option?.numericValue ?? 0;
}

function deriveSelectedOptions(question, response) {
  if (!question.options) return [];

  if (question.type === 'multi_select') {
    const values = Array.isArray(response) ? response : [];
    return values
      .map((value) => {
        if (value === NONE_OF_ABOVE_OPTION.value) return NONE_OF_ABOVE_OPTION;
        return question.options.find((opt) => opt.value === value);
      })
      .filter(Boolean);
  }

  if (['single_select', 'likert'].includes(question.type)) {
    const option =
      response === NONE_OF_ABOVE_OPTION.value
        ? NONE_OF_ABOVE_OPTION
        : question.options.find((opt) => opt.value === response);
    return option ? [option] : [];
  }

  return [];
}

function normalizeNumberAnswer(question, response) {
  if (response === '' || response === undefined || response === null) return 0;
  const numeric = Number(response);
  if (Number.isNaN(numeric)) return 0;
  const min = question.numberConfig?.min ?? 0;
  const max = question.numberConfig?.max ?? 10;
  if (max === min) return 0;
  return clamp((numeric - min) / (max - min), 0, 1);
}

function TooltipInfo({ text }) {
  const [visible, setVisible] = useState(false);

  if (!text) return null;

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', marginLeft: '8px' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '1px solid #d1d5db',
          color: '#6b7280',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 600,
          backgroundColor: '#fff'
        }}
      >
        ?
      </span>
      {visible && (
        <div
          style={{
            position: 'absolute',
            top: '28px',
            right: 0,
            minWidth: '220px',
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: '#111827',
            color: '#f9fafb',
            fontSize: '12px',
            lineHeight: 1.5,
            boxShadow: '0 8px 24px rgba(15,23,42,0.25)',
            zIndex: 10
          }}
        >
          {text}
        </div>
      )}
    </span>
  );
}

function SectionHeading({ title, description }) {
  if (!title) return null;
  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ fontSize: '13px', letterSpacing: '0.04em', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
        {title}
      </p>
      {description && (
        <p style={{ fontSize: '15px', color: '#9ca3af', margin: '4px 0 0' }}>{description}</p>
      )}
    </div>
  );
}

export default function RootdQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 600 : false));
  const [hasHydrated, setHasHydrated] = useState(false);
  const [showResumeBanner, setShowResumeBanner] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 600px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const stored = window.localStorage.getItem(QUIZ_STORAGE_KEY);
      if (!stored) {
        setHasHydrated(true);
        return undefined;
      }
      const parsed = JSON.parse(stored);
      if (parsed.answers) {
        setAnswers(parsed.answers);
      }
      if (typeof parsed.currentIndex === 'number') {
        const safeIndex = clamp(parsed.currentIndex, 0, totalQuestions - 1);
        setCurrentIndex(safeIndex);
      }
      if (parsed.isComplete) {
        setIsComplete(true);
        setResults(parsed.results || null);
      } else if (parsed.answers) {
        setShowResumeBanner(true);
      }
    } catch (error) {
      console.error('Failed to restore quiz progress', error);
    } finally {
      setHasHydrated(true);
    }
    return undefined;
  }, [totalQuestions]);

  useEffect(() => {
    if (!hasHydrated || typeof window === 'undefined') return;
    try {
      const payload = JSON.stringify({
        answers,
        currentIndex,
        isComplete,
        results
      });
      window.localStorage.setItem(QUIZ_STORAGE_KEY, payload);
    } catch (error) {
      console.error('Failed to persist quiz progress', error);
    }
  }, [answers, currentIndex, isComplete, results, hasHydrated]);

  useEffect(() => {
    if (isComplete) {
      setShowResumeBanner(false);
    }
  }, [isComplete]);
  const currentQuestion = useMemo(() => QUIZ_QUESTIONS[currentIndex], [currentIndex]);
  const currentSectionMeta = currentQuestion ? SECTION_DETAILS[currentQuestion.dimension] : null;
  const currentSectionName = currentSectionMeta?.title || formatDimensionLabel(currentQuestion?.dimension);
  const progressPercent = isComplete ? 100 : Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const isAnswered = useMemo(() => isQuestionAnswered(currentQuestion, currentAnswer), [currentQuestion, currentAnswer]);

  const answeredQuestions = useMemo(() => {
    if (isComplete) return totalQuestions;
    return QUIZ_QUESTIONS.reduce((count, question) => {
      return count + (isQuestionAnswered(question, answers[question.id]) ? 1 : 0);
    }, 0);
  }, [answers, isComplete, totalQuestions]);

  const questionsRemaining = Math.max(totalQuestions - answeredQuestions, 0);
  const estimatedSecondsRemaining = questionsRemaining * AVERAGE_SECONDS_PER_QUESTION;
  const etaLabel = isComplete ? 'Quiz complete' : formatEtaLabel(estimatedSecondsRemaining);

  const motivationMessage = useMemo(() => {
    if (isComplete) return 'Great work—your Rootd score is ready.';
    if (progressPercent < 35) return 'Quick warmup—most athletes finish in about 6 minutes.';
    if (progressPercent < 70) return 'Momentum looks great—matches get sharper every answer.';
    return 'Final stretch—just a few more taps before we build your fingerprint.';
  }, [isComplete, progressPercent]);

  const stickySubLabel = isComplete
    ? 'Results ready to review'
    : currentSectionName
      ? `Now covering ${currentSectionName}`
      : 'Keep the momentum going';

  const currentCheckpoint = useMemo(() => {
    if (isComplete) return null;
    return CHECKPOINTS.find((checkpoint) => checkpoint.index === currentIndex) || null;
  }, [currentIndex, isComplete]);

  const topInterests = useMemo(() => {
    if (!results?.interests) return [];
    return Object.entries(results.interests)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [results]);

  const topDimension = useMemo(() => {
    if (!results?.dimensions) return null;
    return Object.entries(results.dimensions).sort((a, b) => b[1] - a[1])[0];
  }, [results]);

  const optionGroupStyle = useMemo(
    () => ({
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: isMobile ? 'nowrap' : 'wrap',
      gap: '12px'
    }),
    [isMobile]
  );

  const optionItemStyle = useMemo(
    () => ({
      flex: isMobile ? '1 1 100%' : '1 1 calc(50% - 12px)',
      minWidth: isMobile ? '100%' : '240px',
      display: 'flex'
    }),
    [isMobile]
  );

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const toggleMultiSelect = (question, optionValue) => {
    const existing = Array.isArray(answers[question.id]) ? answers[question.id] : [];
    let nextValues = existing;

    if (optionValue === NONE_OF_ABOVE_OPTION.value) {
      nextValues = existing.includes(optionValue) ? [] : [NONE_OF_ABOVE_OPTION.value];
    } else if (existing.includes(optionValue)) {
      nextValues = existing.filter((value) => value !== optionValue);
    } else {
      nextValues = [...existing.filter((value) => value !== NONE_OF_ABOVE_OPTION.value), optionValue];
    }

    handleAnswerChange(question.id, nextValues);
  };

  const handleNumberInput = (question, rawValue) => {
    const config = question.numberConfig || { min: 0, max: 10, step: 1 };
    const numeric = Number(rawValue);
    let nextValue = numeric;
    let error = '';

    if (Number.isNaN(numeric)) {
      error = 'Please enter a number.';
      nextValue = '';
    } else {
      if (numeric < config.min) {
        error = `Minimum allowed is ${config.min}.`;
        nextValue = config.min;
      } else if (numeric > config.max) {
        error = `Maximum allowed is ${config.max}.`;
        nextValue = config.max;
      }
    }

    handleAnswerChange(question.id, nextValue === '' ? '' : nextValue);
    setFieldErrors((prev) => ({
      ...prev,
      [question.id]: error
    }));
  };

  const handleNext = () => {
    if (currentIndex === totalQuestions - 1) {
      submitQuiz();
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
    }
  };

  const handleBack = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const submitQuiz = () => {
    setIsSubmitting(true);
    const computed = computeResults(QUIZ_QUESTIONS, answers);
    setTimeout(() => {
      setResults(computed);
      setIsSubmitting(false);
      setIsComplete(true);
    }, 700);
  };

  const resetQuiz = () => {
    setAnswers({});
    setFieldErrors({});
    setCurrentIndex(0);
    setIsComplete(false);
    setResults(null);
    setShowResumeBanner(false);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(QUIZ_STORAGE_KEY);
    }
  };

  const renderOptionButtons = (question) => {
    const selectedValue = answers[question.id];
    return (
      <div style={optionGroupStyle}>
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <div key={option.value} style={optionItemStyle}>
              <Button
                variant={isSelected ? 'primary' : 'secondary'}
                onClick={() => handleAnswerChange(question.id, option.value)}
                fullWidth
              >
                <span style={{ width: '100%', textAlign: 'left' }}>{option.label}</span>
              </Button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMultiSelectButtons = (question) => {
    const selectedValues = Array.isArray(answers[question.id]) ? answers[question.id] : [];
    const hasNoneOption = question.options.some((option) => option.value === NONE_OF_ABOVE_OPTION.value);
    const options = hasNoneOption ? question.options : [...question.options, NONE_OF_ABOVE_OPTION];

    return (
      <div style={optionGroupStyle}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <div key={option.value} style={optionItemStyle}>
              <Button
                variant={isSelected ? 'primary' : 'ghost'}
                onClick={() => toggleMultiSelect(question, option.value)}
                fullWidth
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: '16px'
                }}>
                  <span style={{ textAlign: 'left', flex: 1 }}>{option.label}</span>
                  <span
                    aria-hidden
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '6px',
                      border: `2px solid ${isSelected ? brand.primary : '#d1d5db'}`,
                      backgroundColor: isSelected ? brand.primary : 'transparent',
                      transition: 'all 0.2s'
                    }}
                  />
                </span>
              </Button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMultiNumber = (question) => {
    const config = question.numberConfig || { min: 0, max: 10, step: 1 };
    const value = answers[question.id] ?? '';
    const error = fieldErrors[question.id];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input
          type="number"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(event) => handleNumberInput(question, event.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '10px',
            border: `1px solid ${error ? '#dc2626' : '#d1d5db'}`,
            fontSize: '16px'
          }}
        />
        <span style={{ fontSize: '13px', color: '#6b7280' }}>
          {config.min} - {config.max} (step {config.step})
        </span>
        {error && <span style={{ fontSize: '13px', color: '#dc2626' }}>{error}</span>}
      </div>
    );
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;
    const impactCopy = SECTION_IMPACT[currentQuestion.dimension];
    const sectionInfo = SECTION_DETAILS[currentQuestion.dimension];

    return (
      <div>
        <SectionHeading title={sectionInfo?.title} description={sectionInfo?.description} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ fontSize: '24px', margin: '0 0 12px', color: '#111827', flex: 1 }}>
            {currentQuestion.prompt}
          </h2>
          <TooltipInfo text={impactCopy} />
        </div>
        {currentQuestion.helperText && (
          <p style={{ fontSize: '15px', color: '#6b7280', marginTop: 0 }}>{currentQuestion.helperText}</p>
        )}

        <div style={{ marginTop: '24px' }}>
          {currentQuestion.type === 'likert' && renderOptionButtons(currentQuestion)}
          {currentQuestion.type === 'single_select' && renderOptionButtons(currentQuestion)}
          {currentQuestion.type === 'multi_select' && renderMultiSelectButtons(currentQuestion)}
          {currentQuestion.type === 'multi_number' && renderMultiNumber(currentQuestion)}
        </div>
      </div>
    );
  };

  const renderQuiz = () => (
    <div style={{ position: 'relative' }}>
      {isSubmitting && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            borderRadius: '20px'
          }}
        >
          <LoadingSpinner />
        </div>
      )}

      {showResumeBanner && (
        <div
          style={{
            marginBottom: '20px',
            padding: '14px 16px',
            borderRadius: '16px',
            backgroundColor: '#ecfeff',
            border: '1px solid #67e8f9',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            justifyContent: 'space-between'
          }}
          role="status"
          aria-live="polite"
        >
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>We picked up where you left off.</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#0369a1' }}>Answers autosave after every tap.</p>
          </div>
          <Button variant="ghost" onClick={() => setShowResumeBanner(false)}>
            Dismiss
          </Button>
        </div>
      )}

      {currentCheckpoint && (
        <div
          style={{
            marginBottom: '24px',
            padding: '18px 20px',
            borderRadius: '18px',
            background: 'linear-gradient(120deg, #eef2e4, #dfe5cc)',
            border: '1px solid #cfd6b5',
            boxShadow: `0 12px 24px ${brand.shadow}`
          }}
          role="status"
          aria-live="polite"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: brand.primary }}>{currentCheckpoint.title}</span>
            <span style={{ fontSize: '14px', color: brand.dark }}>{currentCheckpoint.message}</span>
          </div>
          <div style={{ marginTop: '12px' }}>
            <Button variant="secondary" onClick={() => setIsGuideOpen(true)}>
              Preview what’s ahead
            </Button>
          </div>
        </div>
      )}

      {renderQuestion()}

      <div
        style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <Button variant="secondary" onClick={handleBack} disabled={currentIndex === 0 || isSubmitting}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!isAnswered || isSubmitting}>
          {currentIndex === totalQuestions - 1 ? 'Submit quiz' : 'Next question'}
        </Button>
      </div>
    </div>
  );

  const renderResults = () => {
    const dimensionEntries = results?.dimensions ? Object.entries(results.dimensions) : [];

    return (
      <div>
        <h2 style={{ fontSize: '26px', margin: '0 0 8px' }}>Thanks for submitting</h2>
        <p style={{ fontSize: '16px', color: '#6b7280', marginTop: 0 }}>
          Your Rootd profile has been created. These highlights summarize how you show up to partners.
        </p>
        <div style={{
          backgroundColor: '#eef2e4',
          borderRadius: '16px',
          padding: '16px',
          margin: '24px 0',
          color: brand.primary,
          fontWeight: 600
        }}>
          Thanks for submitting, your report will be sent shortly. A full breakdown will arrive via email in a moment.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          <StatCard label="Rootd Score" value={`${results.rootdScore}`} />
          {topDimension && (
            <StatCard label={formatDimensionLabel(topDimension[0])} value={`${topDimension[1]}`} />
          )}
        </div>

        {dimensionEntries.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Rootd Score breakdown</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px' }}>
              {dimensionEntries.map(([dimension, value]) => (
                <StatCard key={dimension} label={formatDimensionLabel(dimension)} value={`${value}`} />
              ))}
            </div>
          </div>
        )}

        {topInterests.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Top interests</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {topInterests.map(([tag, score]) => (
                <span
                  key={tag}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '999px',
                    backgroundColor: '#f3f4f6',
                    fontWeight: 600,
                    color: '#111827',
                    fontSize: '14px'
                  }}
                >
                  {INTEREST_LABELS[tag] || tag} · {(score * 100).toFixed(0)}%
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '32px' }}>
          <Button variant="ghost" onClick={resetQuiz}>
            Retake quiz
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <PageHeader
        title="Rootd Onboarding Quiz"
        description="Answer 30 quick questions so we can understand your brand, your interests, and match you with the right local partners."
        actions={
          <Button variant="secondary" onClick={() => setIsGuideOpen(true)}>
            View quiz outline
          </Button>
        }
      />

      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          backgroundColor: 'rgba(243,244,246,0.96)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e5e7eb'
        }}
        role="region"
        aria-label="Quiz progress"
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
              {isComplete ? 'Quiz complete' : `${progressPercent}% complete`}
            </span>
            {!isComplete && (
              <span style={{ fontSize: '13px', color: '#4b5563' }}>
                Question {Math.min(currentIndex + 1, totalQuestions)} of {totalQuestions}
              </span>
            )}
            <span style={{ fontSize: '13px', color: brand.primary, fontWeight: 600 }}>{etaLabel}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#6b7280' }}>
            <span>{stickySubLabel}</span>
            <span style={{ color: '#0f172a', fontWeight: 500 }}>{motivationMessage}</span>
            <span>
              {isComplete ? 'Feel free to retake anytime' : `${TOTAL_ESTIMATED_MINUTES} min avg • autosaves as you go`}
            </span>
          </div>
          <div style={{ height: '8px', borderRadius: '999px', backgroundColor: '#e5e7eb', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #6a784a, #4c5937)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>

      <main
        style={{
          padding: '32px 16px 64px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '760px',
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 80px rgba(15, 23, 42, 0.08)'
          }}
        >
          {isComplete ? renderResults() : renderQuiz()}
        </div>
      </main>

      <DrawerContainer
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="Quiz outline"
        size="md"
      >
        <div style={{ padding: '24px 24px 48px' }}>
          {['rootd_score', 'interests'].map((sectionKey) => {
            const sectionQuestions = QUIZ_QUESTIONS.filter((q) => q.section === sectionKey);
            const sectionLabel = sectionKey === 'rootd_score' ? 'Rootd Score inputs' : 'Interest fingerprint';
            return (
              <div key={sectionKey} style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '12px', color: '#111827' }}>{sectionLabel}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sectionQuestions.map((question) => (
                    <div
                      key={question.id}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: '#f9fafb'
                      }}
                    >
                      <p style={{ margin: 0, fontWeight: 600 }}>{question.prompt}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>
                        {formatDimensionLabel(question.dimension)} · {question.type.replace('_', ' ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </DrawerContainer>
    </div>
  );
}
