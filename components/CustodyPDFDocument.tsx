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
  title: { fontSize: 13, fontFamily: 'Helvetica-Bold', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.8 },
  titleSub: { fontSize: 12, fontFamily: 'Helvetica-Bold', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.8 },

  // ── Case row ──────────────────────────────────────────────────────────────
  caseRow: { flexDirection: 'row', marginBottom: 6 },
  caseLeft: { flex: 1, marginRight: 14 },
  caseRight: { flex: 2 },
  caseLabel: { fontSize: 7, color: '#444', marginBottom: 1 },
  caseLine: { borderBottom: 1, borderBottomColor: '#000', minHeight: 14, paddingBottom: 1, fontSize: 9 },

  // ── Instructions ──────────────────────────────────────────────────────────
  instrBox: { border: 1, borderColor: '#000', padding: 7, marginBottom: 10, fontSize: 8, lineHeight: 1.45 },
  instrLabel: { fontFamily: 'Helvetica-Bold', fontSize: 8 },

  // ── Field helpers ─────────────────────────────────────────────────────────
  fieldWrap: { marginBottom: 7 },
  fieldLabel: { fontSize: 7.5, marginBottom: 1 },
  fieldLine: { borderBottom: 1, borderBottomColor: '#000', minHeight: 15, paddingBottom: 2, fontSize: 9 },
  fieldBox: { border: 1, borderColor: '#000', minHeight: 55, padding: 4, fontSize: 9 },
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
  ynBox: { width: 9, height: 9, border: 1, borderColor: '#000', marginRight: 2 },
  ynBoxFilled: { width: 9, height: 9, border: 1, borderColor: '#000', backgroundColor: '#000', marginRight: 2 },
  ynText: { fontSize: 8, marginRight: 10 },

  // ── Signature ─────────────────────────────────────────────────────────────
  sigRow: { flexDirection: 'row', marginTop: 16, alignItems: 'flex-end' },
  sigLeft: { flex: 3, marginRight: 20 },
  sigRight: { flex: 1 },
  sigLabel: { fontSize: 7, color: '#444', marginBottom: 2 },
  sigLine: { borderBottom: 1, borderBottomColor: '#000', minHeight: 44 },
  sigImg: { height: 40, maxWidth: 220, objectFit: 'contain' },
  sigDateLine: { borderBottom: 1, borderBottomColor: '#000', minHeight: 14, fontSize: 9, paddingBottom: 1 },

  // ── Page number ───────────────────────────────────────────────────────────
  pageNum: { textAlign: 'center', fontSize: 8, color: '#555', marginTop: 14 },

  // ── Form footer ───────────────────────────────────────────────────────────
  formFooter: { fontSize: 7, color: '#777', marginTop: 6 },
})

// ── Helpers ──────────────────────────────────────────────────────────────────

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={S.fieldWrap}>
      <Text style={S.fieldLabel}>{label}</Text>
      <View style={S.fieldLine}>
        {value ? <Text>{value}</Text> : null}
      </View>
    </View>
  )
}

function FieldBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={S.fieldWrap}>
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
        <View style={value === true ? S.ynBoxFilled : S.ynBox} />
        <Text style={S.ynText}>Yes</Text>
        <View style={value === false ? S.ynBoxFilled : S.ynBox} />
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
          <Text style={S.title}>Child Custody Investigations</Text>
          <Text style={S.titleSub}>Reference Questionnaire</Text>
        </View>

        {/* Case Number / Party Name */}
        <View style={S.caseRow}>
          <View style={S.caseLeft}>
            <Text style={S.caseLabel}>Case Number</Text>
            <View style={S.caseLine}>
              <Text>{data.case_number}</Text>
            </View>
          </View>
          <View style={S.caseRight}>
            <Text style={S.caseLabel}>Name of Party for Whom You Are Completing the Questionnaire</Text>
            <View style={S.caseLine}>
              <Text>{data.party_name}</Text>
            </View>
          </View>
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

        <View style={[S.threeCol, { marginBottom: 7 }]}>
          <View style={S.colT}>
            <Text style={S.fieldLabel}>Phone Number: Home</Text>
            <View style={S.fieldLine}><Text>{data.phone_home}</Text></View>
          </View>
          <View style={S.colT}>
            <Text style={S.fieldLabel}>Work</Text>
            <View style={S.fieldLine}><Text>{data.phone_work}</Text></View>
          </View>
          <View style={S.colTL}>
            <Text style={S.fieldLabel}>Ext.</Text>
            <View style={S.fieldLine}><Text>{data.phone_ext}</Text></View>
          </View>
        </View>

        <Field label="Your relationship to the party above (friend, employer, etc.)" value={data.relationship_to_party} />

        <View style={S.twoCol}>
          <View style={S.col1}>
            <Field label="How long have you known the party above?" value={data.known_party_duration} />
          </View>
          <View style={S.col2}>
            <Field label="Date last seen" value={data.party_last_seen} />
          </View>
        </View>

        <Field label="How often did you see him/her?" value={data.party_see_frequency} />

        <View style={S.twoCol}>
          <View style={S.col1}>
            <Field label="How long have you known the children in this case?" value={data.known_children_duration} />
          </View>
          <View style={S.col2}>
            <Field label="Date last seen" value={data.children_last_seen} />
          </View>
        </View>

        <Field label="How often did you see them?" value={data.children_see_frequency} />

        {/* Other party */}
        <View style={[S.ynRow, { marginBottom: 0 }]}>
          <Text style={[S.ynLabel, { fontFamily: 'Helvetica' }]}>Do you know the other party?</Text>
          <View style={S.ynOptions}>
            <View style={data.knows_other_party === true ? S.ynBoxFilled : S.ynBox} />
            <Text style={S.ynText}>Yes</Text>
            <View style={data.knows_other_party === false ? S.ynBoxFilled : S.ynBox} />
            <Text style={[S.ynText, { marginRight: 16 }]}>No</Text>
            <Text style={{ fontSize: 8 }}>If yes, for how long? </Text>
          </View>
        </View>
        <View style={[S.fieldLine, { marginBottom: 7 }]}>
          <Text>{data.other_party_duration}</Text>
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
        <View style={S.sigRow}>
          <View style={S.sigLeft}>
            <Text style={S.sigLabel}>Reference Signature</Text>
            {data.signature_data ? (
              <Image src={data.signature_data} style={S.sigImg} />
            ) : (
              <View style={S.sigLine} />
            )}
          </View>
          <View style={S.sigRight}>
            <Text style={S.sigLabel}>Date</Text>
            <View style={S.sigDateLine}>
              <Text>{data.submission_date}</Text>
            </View>
          </View>
        </View>

        <Text style={S.pageNum}>(3)</Text>
        <Text style={S.formFooter}>Impact # FCS00 (MOS)</Text>

      </Page>
    </Document>
  )
}
