import React, { useMemo, useState } from 'react';
import Card from '../components/Card.jsx';
import Tag from '../components/Tag.jsx';
import athlete from '../data/athlete.json';

const sports = ["Women’s Soccer", "Women’s Basketball", "Women’s Volleyball", "Women’s Tennis"];
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
    <div className="space-y-6">
      <Card title="Edit Profile" subtitle="Control Center">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">First Name</span>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="rounded-2xl border border-black/10 px-4 py-3"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">Last Name</span>
              <input name="lastName" value={form.lastName} onChange={handleChange} className="rounded-2xl border border-black/10 px-4 py-3" />
            </label>
            <label className="flex flex-col gap-2 text-sm md:col-span-2">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">Email</span>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-2xl border border-black/10 px-4 py-3"
                type="email"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">Sport</span>
              <select name="sport" value={form.sport} onChange={handleChange} className="rounded-2xl border border-black/10 px-4 py-3">
                {sports.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">Year</span>
              <select name="year" value={form.year} onChange={handleChange} className="rounded-2xl border border-black/10 px-4 py-3">
                {years.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm md:col-span-2">
              <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">University</span>
              <select
                name="university"
                value={form.university}
                onChange={handleChange}
                className="rounded-2xl border border-black/10 px-4 py-3"
              >
                {universities.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a] mb-3">Interests</p>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`rounded-full px-4 py-2 border text-sm transition ${
                    selectedInterestSet.has(interest)
                      ? 'bg-rootd-green/15 text-[#101010] border-rootd-green/40'
                      : 'border-black/10 text-[#5a5a5a]'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {form.interests.map((interest) => (
                <Tag key={interest}>{interest}</Tag>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">Bio</span>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={5}
              className="rounded-3xl border border-black/10 px-4 py-3"
            />
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-rootd-green/90 text-white font-semibold shadow-[0_20px_45px_rgba(120,141,87,0.35)]"
            >
              Save changes
            </button>
          </div>
        </form>
      </Card>

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-2xl bg-white px-5 py-3 shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-black/5 text-sm font-medium">
          {toast}
        </div>
      )}
    </div>
  );
}
