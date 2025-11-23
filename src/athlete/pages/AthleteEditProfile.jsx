import React, { useMemo, useState } from 'react';
import athlete from '../data/athlete.json';
import { SectionCard, TextInput, Select, Button, Tag } from '../../components/director/PremiumComponents.jsx';

const sports = ["Women's Soccer", "Women's Basketball", "Women's Volleyball", "Women's Tennis"];
const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
const universities = ['Stanford University', 'UCLA', 'USC'];
const interestOptions = [
  'Sustainable fashion',
  'Leadership workshops',
  'Women-led startups',
  'Travel content',
  'Product design',
  'Community impact'
];

export default function AthleteEditProfile() {
  const [form, setForm] = useState({
    firstName: athlete.firstName,
    lastName: athlete.lastName,
    email: athlete.email,
    sport: athlete.sport,
    year: athlete.year,
    university: athlete.university,
    interests: athlete.interests,
    bio: athlete.bio
  });
  const [toast, setToast] = useState(null);

  const toggleInterest = (interest) => {
    setForm((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((item) => item !== interest) : [...prev.interests, interest]
      };
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setToast('Profile saved successfully');
    setTimeout(() => setToast(null), 2700);
  };

  const selectedInterestSet = useMemo(() => new Set(form.interests), [form.interests]);

  return (
    <div className="space-y-6 py-2">
      <SectionCard
        title="Edit profile"
        description="Keep your NIL profile, contact details, and interests up to date."
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af] mb-4">Identity</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="First name"
                value={form.firstName}
                onChange={(value) => setForm((prev) => ({ ...prev, firstName: value }))}
              />
              <TextInput
                label="Last name"
                value={form.lastName}
                onChange={(value) => setForm((prev) => ({ ...prev, lastName: value }))}
              />
              <div className="md:col-span-2">
                <TextInput
                  label="Email"
                  value={form.email}
                  onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                  type="email"
                />
              </div>
              <Select
                label="Sport"
                value={form.sport}
                onChange={(value) => setForm((prev) => ({ ...prev, sport: value }))}
                options={sports.map((option) => ({ value: option, label: option }))}
              />
              <Select
                label="Year"
                value={form.year}
                onChange={(value) => setForm((prev) => ({ ...prev, year: value }))}
                options={years.map((option) => ({ value: option, label: option }))}
              />
              <div className="md:col-span-2">
                <Select
                  label="University"
                  value={form.university}
                  onChange={(value) => setForm((prev) => ({ ...prev, university: value }))}
                  options={universities.map((option) => ({ value: option, label: option }))}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-black/5 pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af] mb-4">Interests</p>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`rounded-full px-4 py-2 border text-sm font-medium transition ${
                    selectedInterestSet.has(interest)
                      ? 'bg-rootd-green/15 text-[#101010] border-rootd-green/40'
                      : 'border-black/10 text-[#5a5a5a] hover:border-black/20'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            {form.interests.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-black/5">
                {form.interests.map((interest) => (
                  <Tag key={interest}>{interest}</Tag>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-black/5 pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9ca3af] mb-4">Bio</p>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#313729] leading-relaxed shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4c6b38]/20 focus:border-[#4c6b38]"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-black/5 pt-5">
            <Button type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </SectionCard>

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-2xl bg-white px-5 py-3 shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-black/5 text-sm font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}
