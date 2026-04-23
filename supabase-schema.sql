-- Run this in your Supabase dashboard → SQL Editor
-- https://tuycoafwmrfijlavrzbt.supabase.co

CREATE TABLE IF NOT EXISTS form_submissions (
  id                        UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at                TIMESTAMPTZ DEFAULT NOW(),

  -- Case header
  case_number               TEXT,
  party_name                TEXT,

  -- Reference personal info
  reference_name            TEXT,
  reference_address         TEXT,
  phone_home                TEXT,
  phone_work                TEXT,
  phone_ext                 TEXT,
  relationship_to_party     TEXT,

  -- Familiarity
  known_party_duration      TEXT,
  party_last_seen           TEXT,
  party_see_frequency       TEXT,
  known_children_duration   TEXT,
  children_last_seen        TEXT,
  children_see_frequency    TEXT,
  knows_other_party         BOOLEAN,
  other_party_duration      TEXT,
  comments                  TEXT,

  -- Section A
  physical_environment      TEXT,

  -- Section B
  care_of_children          TEXT,
  party_children_relationship TEXT,
  witnessed_abuse           TEXT,

  -- Section C
  children_observations     TEXT,
  children_custody_feelings TEXT,

  -- Section D
  alcohol_abuse             BOOLEAN,
  drug_abuse                BOOLEAN,
  criminal_involvement      BOOLEAN,
  parent_issues_details     TEXT,

  -- Section E
  custody_recommendation    TEXT,
  party_unfit               BOOLEAN,
  unfit_explanation         TEXT,

  -- Section F
  additional_comments       TEXT,

  -- Signature
  reference_signature       TEXT,
  submission_date           TEXT
);

-- Allow inserts from the service role key (used by the API route)
-- RLS is bypassed by the service role key, so no policy needed for writes.
-- Optionally enable RLS to block direct public access:
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
