import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import type { FormData } from '@/lib/types'

const S = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 44,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#000',
  },

  // ── Title ─────────────────────────────────────────────────────────────────
  titleWrap: { alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 },

  // ── Case stacked rows ─────────────────────────────────────────────────────
  caseStackRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 3 },
  caseInlineLabel: { fontSize: 9, fontFamily: 'Helvetica', marginRight: 4, whiteSpace: 'nowrap' },
  caseLine: { flex: 1, borderBottom: 1, borderBottomColor: '#000', minHeight: 14, paddingBottom: 1, fontSize: 9 },

  // ── Instructions ──────────────────────────────────────────────────────────
  instrBox: { border: 1, borderColor: '#000', padding: 7, marginBottom: 10, fontSize: 8, lineHeight: 1.45 },
  instrLabel: { fontFamily: 'Helvetica-Bold', fontSize: 8 },

  // ── Field helpers ─────────────────────────────────────────────────────────
  fieldWrap: { marginBottom: 7 },
  fieldLabel: { fontSize: 8, marginBottom: 1 },
  // inline row: label left, value+underline right on same line
  fieldRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 6 },
  fieldRowLabel: { fontSize: 8, marginRight: 4 },
  fieldLine: { borderBottom: 1, borderBottomColor: '#000', paddingBottom: 1 },
  fieldValue: { fontSize: 11 },
  fieldBox: { border: 1, borderColor: '#000', minHeight: 55, padding: 4, fontSize: 11 },
  twoCol: { flexDirection: 'row' },
  col1: { flex: 1, marginRight: 12 },
  col2: { flex: 1 },
  threeCol: { flexDirection: 'row' },
  colT: { flex: 1, marginRight: 8 },
  colTL: { flex: 1 },

  // ── Section headers ───────────────────────────────────────────────────────
  sectionHead: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', textDecoration: 'underline', marginTop: 10, marginBottom: 4 },

  // ── Yes/No ────────────────────────────────────────────────────────────────
  ynRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  ynLabel: { flex: 1, fontSize: 8.5 },
  ynOptions: { flexDirection: 'row', alignItems: 'center' },
  ynBox: { width: 12, height: 12, border: 1, borderColor: '#000', marginRight: 2, paddingLeft: 1 },
  ynCheck: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000', lineHeight: 1 },
  ynText: { fontSize: 8, marginRight: 12 },

  // ── Signature ─────────────────────────────────────────────────────────────
  sigLabel: { fontSize: 7, color: '#444', marginBottom: 2 },
  sigLine: { borderBottom: 1, borderBottomColor: '#000', minHeight: 44 },
  sigImg: { height: 40, maxWidth: 220, objectFit: 'contain' },

  // ── Page number ───────────────────────────────────────────────────────────
  pageNum: { textAlign: 'center', fontSize: 8, color: '#555', marginTop: 14 },

  // ── Form footer ───────────────────────────────────────────────────────────
  formFooter: { fontSize: 7, color: '#777', marginTop: 6 },
})

// ── Helpers ──────────────────────────────────────────────────────────────────

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={S.fieldRow}>
      <Text style={S.fieldRowLabel}>{label}</Text>
      <View style={[S.fieldLine, { flex: 1 }]}>
        {value ? <Text style={S.fieldValue}>{value}</Text> : null}
      </View>
    </View>
  )
}

function FieldBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={S.fieldWrap} minPresenceAhead={60}>
      {label ? <Text style={S.fieldLabel}>{label}</Text> : null}
      <View style={S.fieldBox}>
        {value ? <Text>{value}</Text> : null}
      </View>
    </View>
  )
}

function YesNo({ label, value }: { label: string; value: boolean | null }) {
  return (
    <View style={S.ynRow}>
      <Text style={S.ynLabel}>{label}</Text>
      <View style={S.ynOptions}>
        <View style={S.ynBox}>
          {value === true ? <Text style={S.ynCheck}>X</Text> : null}
        </View>
        <Text style={S.ynText}>Yes</Text>
        <View style={S.ynBox}>
          {value === false ? <Text style={S.ynCheck}>X</Text> : null}
        </View>
        <Text style={S.ynText}>No</Text>
      </View>
    </View>
  )
}

function SectionHead({ letter, title }: { letter: string; title: string }) {
  return <Text style={S.sectionHead}>{letter}) {title}</Text>
}

// ── Document ──────────────────────────────────────────────────────────────────

export default function CustodyPDFDocument({ data }: { data: FormData }) {
  return (
    <Document title="Child Custody Investigations Reference Questionnaire">
      <Page size="LETTER" style={S.page}>

        {/* Title */}
        <View style={S.titleWrap}>
          <Text style={S.title}>Child Custody Investigations Reference Questionnaire</Text>
        </View>

        {/* Case / Number / Party Name – stacked to match original */}
        <View style={[S.caseStackRow, { marginBottom: 2 }]}>
          <Text style={S.caseInlineLabel}>Case</Text>
          <View style={S.caseLine}><Text>{''}</Text></View>
        </View>
        <View style={[S.caseStackRow, { marginBottom: 2 }]}>
          <Text style={S.caseInlineLabel}>Number</Text>
          <View style={S.caseLine}><Text>{data.case_number}</Text></View>
        </View>
        <View style={[S.caseStackRow, { marginBottom: 8 }]}>
          <Text style={S.caseInlineLabel}>Name of party for whom you are completing the questionnaire</Text>
          <View style={S.caseLine}><Text style={{ fontSize: 14 }}>{data.party_name}</Text></View>
        </View>

        {/* Instructions */}
        <View style={S.instrBox}>
          <Text>
            <Text style={S.instrLabel}>Instructions: </Text>
            As you answer each question below, please keep in mind that it is the responsibility of the Court to
            safeguard the welfare and future development of the children in this family. You can help the Court in
            meeting this responsibility by being objective and confining your statements to observations which you
            have personally made. Answer each question as completely as possible. The investigator may contact you
            personally to discuss your statement with you. This questionnaire is to be completed immediately and
            returned to the Office of the Friend of the Court.
          </Text>
        </View>

        {/* Reference personal info */}
        <Field label="Your Name" value={data.reference_name} />
        <Field label="Your Address" value={data.reference_address} />

        <View style={[S.threeCol, { marginBottom: 6 }]}>
          <View style={[S.colT, { flexDirection: 'row', alignItems: 'flex-end' }]}>
            <Text style={S.fieldRowLabel}>Phone Number: Home</Text>
            <View style={[S.fieldLine, { flex: 1 }]}><Text style={S.fieldValue}>{data.phone_home}</Text></View>
          </View>
          <View style={[S.colT, { flexDirection: 'row', alignItems: 'flex-end' }]}>
            <Text style={S.fieldRowLabel}>Work</Text>
            <View style={[S.fieldLine, { flex: 1 }]}><Text style={S.fieldValue}>{data.phone_work}</Text></View>
          </View>
          <View style={[S.colTL, { flexDirection: 'row', alignItems: 'flex-end' }]}>
            <Text style={S.fieldRowLabel}>Ext.</Text>
            <View style={[S.fieldLine, { flex: 1 }]}><Text style={S.fieldValue}>{data.phone_ext}</Text></View>
          </View>
        </View>

        <Field label="Your relationship to the party above (friend, employer, etc.)" value={data.relationship_to_party} />

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 6 }}>
          <Text style={S.fieldRowLabel}>How long have you known the party above?</Text>
          <View style={[S.fieldLine, { width: 70 }]}><Text style={S.fieldValue}>{data.known_party_duration}</Text></View>
          <Text style={[S.fieldRowLabel, { marginLeft: 10 }]}>Date last seen</Text>
          <View style={[S.fieldLine, { flex: 1 }]}><Text style={S.fieldValue}>{data.party_last_seen}</Text></View>
        </View>

        <Field label="How often did you see him/her?" value={data.party_see_frequency} />

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 6 }}>
          <Text style={S.fieldRowLabel}>How long have you known the children in this case?</Text>
          <View style={[S.fieldLine, { width: 70 }]}><Text style={S.fieldValue}>{data.known_children_duration}</Text></View>
          <Text style={[S.fieldRowLabel, { marginLeft: 10 }]}>Date last seen</Text>
          <View style={[S.fieldLine, { flex: 1 }]}><Text style={S.fieldValue}>{data.children_last_seen}</Text></View>
        </View>

        <Field label="How often did you see them?" value={data.children_see_frequency} />

        {/* Other party */}
        <View style={[S.ynRow, { marginBottom: 0 }]}>
          <Text style={[S.ynLabel, { fontFamily: 'Helvetica' }]}>Do you know the other party?</Text>
          <View style={S.ynOptions}>
            <View style={S.ynBox}>
              {data.knows_other_party === true ? <Text style={S.ynCheck}>X</Text> : null}
            </View>
            <Text style={S.ynText}>Yes</Text>
            <View style={S.ynBox}>
              {data.knows_other_party === false ? <Text style={S.ynCheck}>X</Text> : null}
            </View>
            <Text style={[S.ynText, { marginRight: 16 }]}>No</Text>
            <Text style={{ fontSize: 8 }}>If yes, for how long? </Text>
          </View>
        </View>
        <View style={[S.fieldLine, { marginBottom: 7 }]}>
          <Text style={S.fieldValue}>{data.other_party_duration}</Text>
        </View>

        <FieldBox label="Comments:" value={data.comments} />

        {/* ── Section A ── */}
        <SectionHead letter="A" title="Physical Environment" />
        <Text style={{ fontSize: 8, marginBottom: 3 }}>
          If you have been in the home of the party for whom you are a reference, describe the home including
          housekeeping standard, who prepares meals, etc.:
        </Text>
        <FieldBox label="" value={data.physical_environment} />

        {/* ── Section B ── */}
        <SectionHead letter="B" title="Care of Children" />
        <FieldBox
          label="Describe how the party for whom you are a reference treats the children (cleanliness, clothing, discipline, supervision):"
          value={data.care_of_children}
        />
        <FieldBox
          label="What is the nature of the relationship between the party and the children from your observation?"
          value={data.party_children_relationship}
        />
        <FieldBox
          label="Have you ever witnessed physical or emotional abuse of the children by either party (explain and give dates)?"
          value={data.witnessed_abuse}
        />

        {/* ── Section C ── */}
        <SectionHead letter="C" title="Children" />
        <FieldBox
          label="State your personal observations of each child, include any physical or emotional problems known to you:"
          value={data.children_observations}
        />
        <FieldBox
          label="Have the children expressed their feelings regarding custody/visitation to you?"
          value={data.children_custody_feelings}
        />

        {/* ── Section D ── */}
        <SectionHead letter="D" title="Parents" />
        <Text style={{ fontSize: 8, marginBottom: 5 }}>
          To your knowledge, does the party for whom you are a reference have problems in any of the following areas?
        </Text>
        <YesNo label="Abuse of Alcohol" value={data.alcohol_abuse} />
        <YesNo label="Abuse of drug/narcotics" value={data.drug_abuse} />
        <YesNo label="Criminal involvement" value={data.criminal_involvement} />
        <FieldBox label="If the answer to any of the above is yes, please give details:" value={data.parent_issues_details} />

        {/* ── Section E ── */}
        <SectionHead letter="E" title="Custody" />
        <FieldBox
          label="Based on your observations, please state which party you feel should have custody and explain why:"
          value={data.custody_recommendation}
        />
        <YesNo label="Do you feel the party is unfit to have custody?" value={data.party_unfit} />
        {data.party_unfit === true && (
          <FieldBox label="If yes, explain why:" value={data.unfit_explanation} />
        )}

        {/* ── Section F ── */}
        <SectionHead letter="F" title="Additional Comments" />
        <FieldBox label="" value={data.additional_comments} />

        {/* ── Signature + Date ── */}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1.4 }}>
            <Text style={S.sigLabel}>Reference Signature</Text>
            {data.signature_data ? (
              <Image src={data.signature_data} style={S.sigImg} />
            ) : (
              <View style={S.sigLine} />
            )}
            <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 8.5, marginRight: 4 }}>Date:</Text>
              <View style={{ flex: 1, borderBottom: 1, borderBottomColor: '#000', paddingBottom: 1 }}>
                <Text style={{ fontSize: 9 }}>{data.submission_date}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={S.pageNum}>(3)</Text>
        <Text style={S.formFooter}>Impact # FCS00 (MOS)</Text>

      </Page>
    </Document>
  )
}
