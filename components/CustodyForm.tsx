'use client'

import { useState } from 'react'
import PasswordModal from './PasswordModal'

interface FormData {
  case_number: string
  party_name: string
  reference_name: string
  reference_address: string
  phone_home: string
  phone_work: string
  phone_ext: string
  relationship_to_party: string
  known_party_duration: string
  party_last_seen: string
  party_see_frequency: string
  known_children_duration: string
  children_last_seen: string
  children_see_frequency: string
  knows_other_party: boolean | null
  other_party_duration: string
  comments: string
  physical_environment: string
  care_of_children: string
  party_children_relationship: string
  witnessed_abuse: string
  children_observations: string
  children_custody_feelings: string
  alcohol_abuse: boolean | null
  drug_abuse: boolean | null
  criminal_involvement: boolean | null
  parent_issues_details: string
  custody_recommendation: string
  party_unfit: boolean | null
  unfit_explanation: string
  additional_comments: string
  reference_signature: string
  submission_date: string
}

const initial: FormData = {
  case_number: '',
  party_name: '',
  reference_name: '',
  reference_address: '',
  phone_home: '',
  phone_work: '',
  phone_ext: '',
  relationship_to_party: '',
  known_party_duration: '',
  party_last_seen: '',
  party_see_frequency: '',
  known_children_duration: '',
  children_last_seen: '',
  children_see_frequency: '',
  knows_other_party: null,
  other_party_duration: '',
  comments: '',
  physical_environment: '',
  care_of_children: '',
  party_children_relationship: '',
  witnessed_abuse: '',
  children_observations: '',
  children_custody_feelings: '',
  alcohol_abuse: null,
  drug_abuse: null,
  criminal_involvement: null,
  parent_issues_details: '',
  custody_recommendation: '',
  party_unfit: null,
  unfit_explanation: '',
  additional_comments: '',
  reference_signature: '',
  submission_date: '',
}

const inputClass =
  'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'
const textareaClass =
  'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent resize-y'

function SectionHeader({ letter, title }: { letter: string; title: string }) {
  return (
    <h2 className="text-base font-bold text-blue-900 underline mb-4">
      {letter}) {title}
    </h2>
  )
}

function RadioGroup({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean | null
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-6 py-1">
      <span className="text-sm font-medium text-gray-700 w-52">{label}</span>
      <label className="flex items-center gap-1 text-sm cursor-pointer">
        <input
          type="radio"
          className="accent-blue-900"
          checked={value === true}
          onChange={() => onChange(true)}
        />
        Yes
      </label>
      <label className="flex items-center gap-1 text-sm cursor-pointer">
        <input
          type="radio"
          className="accent-blue-900"
          checked={value === false}
          onChange={() => onChange(false)}
        />
        No
      </label>
    </div>
  )
}

export default function CustodyForm() {
  const [form, setForm] = useState<FormData>(initial)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof FormData, value: string | boolean | null) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => set(e.target.name as keyof FormData, e.target.value)

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setShowModal(true)
  }

  const handlePasswordSuccess = async () => {
    setShowModal(false)
    setSubmitting(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSuccess(true)
    } catch {
      setError('Submission failed. Please try again or contact support.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Submitted Successfully</h2>
          <p className="text-gray-500 text-sm">
            Your questionnaire has been submitted to the Office of the Friend of the Court.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Title */}
        <div className="bg-white rounded-xl shadow-md px-8 py-6 text-center border-t-4 border-blue-900">
          <h1 className="text-xl font-bold text-blue-900 uppercase tracking-widest leading-tight">
            Child Custody Investigations
            <br />
            Reference Questionnaire
          </h1>
        </div>

        <form onSubmit={handleSubmitClick} className="space-y-6">
          {/* Case header */}
          <div className="bg-white rounded-xl shadow-md px-8 py-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Case Number</label>
                <input name="case_number" value={form.case_number} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Name of Party for Whom You Are Completing the Questionnaire</label>
                <input name="party_name" value={form.party_name} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
              <strong>Instructions:</strong> As you answer each question below, please keep in mind that it is the
              responsibility of the Court to safeguard the welfare and future development of the children in this
              family. You can help the Court in meeting this responsibility by being objective and confining your
              statements to observations which you have personally made. Answer each question as completely as
              possible, using additional paper if needed. The investigator may contact you personally to discuss your
              statement with you. This questionnaire is to be completed immediately and returned to the Office of the
              Friend of the Court.
            </div>

            {/* Reference personal info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Your Name</label>
                <input name="reference_name" value={form.reference_name} onChange={handleChange} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Your Address</label>
                <input name="reference_address" value={form.reference_address} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number (Home)</label>
                <input name="phone_home" value={form.phone_home} onChange={handleChange} type="tel" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Phone (Work)</label>
                  <input name="phone_work" value={form.phone_work} onChange={handleChange} type="tel" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Ext.</label>
                  <input name="phone_ext" value={form.phone_ext} onChange={handleChange} className={inputClass} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Your Relationship to the Party Above (friend, employer, etc.)</label>
                <input
                  name="relationship_to_party"
                  value={form.relationship_to_party}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Party familiarity */}
              <div>
                <label className={labelClass}>How Long Have You Known the Party Above?</label>
                <input
                  name="known_party_duration"
                  value={form.known_party_duration}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Date Last Seen (Party)</label>
                <input
                  name="party_last_seen"
                  value={form.party_last_seen}
                  onChange={handleChange}
                  type="date"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>How Often Did You See Him/Her?</label>
                <input
                  name="party_see_frequency"
                  value={form.party_see_frequency}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Children familiarity */}
              <div>
                <label className={labelClass}>How Long Have You Known the Children in This Case?</label>
                <input
                  name="known_children_duration"
                  value={form.known_children_duration}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Date Last Seen (Children)</label>
                <input
                  name="children_last_seen"
                  value={form.children_last_seen}
                  onChange={handleChange}
                  type="date"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>How Often Did You See Them?</label>
                <input
                  name="children_see_frequency"
                  value={form.children_see_frequency}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Other party */}
              <div className="sm:col-span-2 space-y-2">
                <RadioGroup
                  label="Do You Know the Other Party?"
                  value={form.knows_other_party}
                  onChange={(v) => set('knows_other_party', v)}
                />
                {form.knows_other_party === true && (
                  <div>
                    <label className={labelClass}>If Yes, For How Long?</label>
                    <input
                      name="other_party_duration"
                      value={form.other_party_duration}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Comments</label>
                <textarea name="comments" value={form.comments} onChange={handleChange} rows={3} className={textareaClass} />
              </div>
            </div>
          </div>

          {/* Section A */}
          <div className="bg-white rounded-xl shadow-md px-8 py-6">
            <SectionHeader letter="A" title="Physical Environment" />
            <label className="block text-sm text-gray-700 mb-2">
              If you have been in the home of the party for whom you are a reference, describe the home including
              housekeeping standard, who prepares meals, etc.:
            </label>
            <textarea
              name="physical_environment"
              value={form.physical_environment}
              onChange={handleChange}
              rows={6}
              className={textareaClass}
            />
          </div>

          {/* Section B */}
          <div className="bg-white rounded-xl shadow-md px-8 py-6 space-y-5">
            <SectionHeader letter="B" title="Care of Children" />

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Describe how the party for whom you are a reference treats the children (cleanliness, clothing,
                discipline, supervision):
              </label>
              <textarea
                name="care_of_children"
                value={form.care_of_children}
                onChange={handleChange}
                rows={6}
                className={textareaClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                What is the nature of the relationship between the party and the children from your observation?
              </label>
              <textarea
                name="party_children_relationship"
                value={form.party_children_relationship}
                onChange={handleChange}
                rows={6}
                className={textareaClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Have you ever witnessed physical or emotional abuse of the children by either party (explain and give
                dates)?
              </label>
              <textarea
                name="witnessed_abuse"
                value={form.witnessed_abuse}
                onChange={handleChange}
                rows={6}
                className={textareaClass}
              />
            </div>
          </div>

          {/* Section C */}
          <div className="bg-white rounded-xl shadow-md px-8 py-6 space-y-5">
            <SectionHeader letter="C" title="Children" />

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                State your personal observations of each child, include any physical or emotional problems known to you:
              </label>
              <textarea
                name="children_observations"
                value={form.children_observations}
                onChange={handleChange}
                rows={6}
                className={textareaClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Have the children expressed their feelings regarding custody/visitation to you?
              </label>
              <textarea
                name="children_custody_feelings"
                value={form.children_custody_feelings}
                onChange={handleChange}
                rows={6}
                className={textareaClass}
              />
            </div>
          </div>

          {/* Section D */}
          <div className="bg-white rounded-xl shadow-md px-8 py-6 space-y-4">
            <SectionHeader letter="D" title="Parents" />
            <p className="text-sm text-gray-700">
              To your knowledge, does the party for whom you are a reference have problems in any of the following
              areas?
            </p>

            <div className="space-y-1 divide-y divide-gray-100">
              <RadioGroup
                label="Abuse of Alcohol"
                value={form.alcohol_abuse}
                onChange={(v) => set('alcohol_abuse', v)}
              />
              <RadioGroup
                label="Abuse of Drug/Narcotics"
                value={form.drug_abuse}
                onChange={(v) => set('drug_abuse', v)}
              />
              <RadioGroup
                label="Criminal Involvement"
                value={form.criminal_involvement}
                onChange={(v) => set('criminal_involvement', v)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                If the answer to any of the above is yes, please give details:
              </label>
              <textarea
                name="parent_issues_details"
                value={form.parent_issues_details}
                onChange={handleChange}
                rows={5}
                className={textareaClass}
              />
            </div>
          </div>

          {/* Section E */}
          <div className="bg-white rounded-xl shadow-md px-8 py-6 space-y-5">
            <SectionHeader letter="E" title="Custody" />

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Based on your observations, please state which party you feel should have custody and explain why:
              </label>
              <textarea
                name="custody_recommendation"
                value={form.custody_recommendation}
                onChange={handleChange}
                rows={6}
                className={textareaClass}
              />
            </div>

            <div className="space-y-2">
              <RadioGroup
                label="Do you feel the party is unfit to have custody?"
                value={form.party_unfit}
                onChange={(v) => set('party_unfit', v)}
              />
              {form.party_unfit === true && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">If yes, explain why:</label>
                  <textarea
                    name="unfit_explanation"
                    value={form.unfit_explanation}
                    onChange={handleChange}
                    rows={4}
                    className={textareaClass}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section F */}
          <div className="bg-white rounded-xl shadow-md px-8 py-6">
            <SectionHeader letter="F" title="Additional Comments" />
            <textarea
              name="additional_comments"
              value={form.additional_comments}
              onChange={handleChange}
              rows={6}
              className={textareaClass}
            />
          </div>

          {/* Signature */}
          <div className="bg-white rounded-xl shadow-md px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Reference Signature (Type Your Full Name)</label>
                <input
                  name="reference_signature"
                  value={form.reference_signature}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Type your full name"
                />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input
                  name="submission_date"
                  value={form.submission_date}
                  onChange={handleChange}
                  type="date"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-900 text-white py-4 px-6 rounded-xl font-bold text-base hover:bg-blue-800 active:bg-blue-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            {submitting ? 'Submitting…' : 'Submit Questionnaire'}
          </button>
        </form>
      </div>

      {showModal && (
        <PasswordModal onSuccess={handlePasswordSuccess} onCancel={() => setShowModal(false)} />
      )}
    </div>
  )
}
