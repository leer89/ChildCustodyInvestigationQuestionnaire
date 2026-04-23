import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // ── 1. Save to Supabase ──────────────────────────────────────────────────
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error: dbError } = await supabase.from('form_submissions').insert([
      {
        case_number: data.case_number || null,
        party_name: data.party_name || null,
        reference_name: data.reference_name || null,
        reference_address: data.reference_address || null,
        phone_home: data.phone_home || null,
        phone_work: data.phone_work || null,
        phone_ext: data.phone_ext || null,
        relationship_to_party: data.relationship_to_party || null,
        known_party_duration: data.known_party_duration || null,
        party_last_seen: data.party_last_seen || null,
        party_see_frequency: data.party_see_frequency || null,
        known_children_duration: data.known_children_duration || null,
        children_last_seen: data.children_last_seen || null,
        children_see_frequency: data.children_see_frequency || null,
        knows_other_party: data.knows_other_party,
        other_party_duration: data.other_party_duration || null,
        comments: data.comments || null,
        physical_environment: data.physical_environment || null,
        care_of_children: data.care_of_children || null,
        party_children_relationship: data.party_children_relationship || null,
        witnessed_abuse: data.witnessed_abuse || null,
        children_observations: data.children_observations || null,
        children_custody_feelings: data.children_custody_feelings || null,
        alcohol_abuse: data.alcohol_abuse,
        drug_abuse: data.drug_abuse,
        criminal_involvement: data.criminal_involvement,
        parent_issues_details: data.parent_issues_details || null,
        custody_recommendation: data.custody_recommendation || null,
        party_unfit: data.party_unfit,
        unfit_explanation: data.unfit_explanation || null,
        additional_comments: data.additional_comments || null,
        reference_signature: data.reference_signature || null,
        submission_date: data.submission_date || null,
      },
    ])

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    // ── 2. Send email ────────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Child Custody Form" <${process.env.EMAIL_FROM}>`,
      to: 'abapphil@gmail.com',
      subject: `Custody Questionnaire – ${data.party_name || 'Unknown Party'} | Case #${data.case_number || 'N/A'}`,
      html: buildEmail(data),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit route error:', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}

function row(label: string, value: string | null | undefined) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:6px 10px;background:#f3f6fb;border:1px solid #dde3ec;width:38%;font-weight:600;font-size:13px;color:#374151;">${label}</td>
      <td style="padding:6px 10px;border:1px solid #dde3ec;font-size:13px;color:#1f2937;">${value}</td>
    </tr>`
}

function section(title: string, body: string) {
  return `
    <h2 style="margin:28px 0 8px;font-size:15px;color:#1e3a8a;border-bottom:2px solid #1e3a8a;padding-bottom:4px;">${title}</h2>
    ${body}`
}

function block(label: string, value: string | null | undefined) {
  if (!value) return ''
  return `
    <p style="margin:10px 0 4px;font-size:13px;font-weight:600;color:#374151;">${label}</p>
    <div style="background:#f3f6fb;border-left:3px solid #1e3a8a;padding:8px 12px;font-size:13px;color:#1f2937;border-radius:0 4px 4px 0;white-space:pre-wrap;">${value}</div>`
}

function yesNo(v: boolean | null | undefined) {
  if (v === null || v === undefined) return 'Not answered'
  return v ? 'Yes' : 'No'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildEmail(d: Record<string, any>): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;padding:20px;color:#1f2937;">

  <div style="background:#1e3a8a;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;font-size:18px;letter-spacing:0.05em;text-transform:uppercase;">
      Child Custody Investigation Reference Questionnaire
    </h1>
    <p style="margin:6px 0 0;font-size:13px;opacity:0.85;">
      Submitted ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
    </p>
  </div>

  <div style="border:1px solid #dde3ec;border-top:none;padding:20px 24px;border-radius:0 0 8px 8px;">

    ${section('Case &amp; Reference Information', `
      <table style="width:100%;border-collapse:collapse;">
        ${row('Case Number', d.case_number)}
        ${row('Party Name', d.party_name)}
        ${row('Reference Name', d.reference_name)}
        ${row('Reference Address', d.reference_address)}
        ${row('Phone (Home)', d.phone_home)}
        ${row('Phone (Work)', d.phone_work ? `${d.phone_work}${d.phone_ext ? ' Ext. ' + d.phone_ext : ''}` : null)}
        ${row('Relationship to Party', d.relationship_to_party)}
        ${row('Known Party Duration', d.known_party_duration)}
        ${row('Party Last Seen', d.party_last_seen)}
        ${row('Party See Frequency', d.party_see_frequency)}
        ${row('Known Children Duration', d.known_children_duration)}
        ${row('Children Last Seen', d.children_last_seen)}
        ${row('Children See Frequency', d.children_see_frequency)}
        ${row('Knows Other Party?', yesNo(d.knows_other_party))}
        ${d.knows_other_party ? row('Other Party Duration', d.other_party_duration) : ''}
        ${row('Comments', d.comments)}
      </table>
    `)}

    ${section('A) Physical Environment', block('', d.physical_environment))}

    ${section('B) Care of Children', `
      ${block('Treatment of Children', d.care_of_children)}
      ${block('Nature of Relationship', d.party_children_relationship)}
      ${block('Witnessed Abuse', d.witnessed_abuse)}
    `)}

    ${section('C) Children', `
      ${block('Personal Observations', d.children_observations)}
      ${block('Children\'s Feelings on Custody/Visitation', d.children_custody_feelings)}
    `)}

    ${section('D) Parents', `
      <table style="width:100%;border-collapse:collapse;">
        ${row('Alcohol Abuse', yesNo(d.alcohol_abuse))}
        ${row('Drug/Narcotics Abuse', yesNo(d.drug_abuse))}
        ${row('Criminal Involvement', yesNo(d.criminal_involvement))}
      </table>
      ${block('Details', d.parent_issues_details)}
    `)}

    ${section('E) Custody', `
      ${block('Custody Recommendation', d.custody_recommendation)}
      ${row('Party Unfit for Custody?', yesNo(d.party_unfit))}
      ${block('Unfit Explanation', d.unfit_explanation)}
    `)}

    ${section('F) Additional Comments', block('', d.additional_comments))}

    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #dde3ec;font-size:13px;color:#6b7280;">
      <strong style="color:#1f2937;">Reference Signature:</strong> ${d.reference_signature || '—'}<br>
      <strong style="color:#1f2937;">Date:</strong> ${d.submission_date || '—'}
    </div>

  </div>
</body>
</html>`
}
