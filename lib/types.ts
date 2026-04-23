export interface FormData {
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
  signature_data: string  // base64 PNG from signature canvas
  submission_date: string
}

export const initialFormData: FormData = {
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
  signature_data: '',
  submission_date: '',
}
