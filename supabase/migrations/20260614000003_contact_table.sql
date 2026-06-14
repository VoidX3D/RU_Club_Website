CREATE TABLE IF NOT EXISTS contact_submissions (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

DO $$ BEGIN
  ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public insert" ON contact_submissions
    FOR INSERT TO anon WITH CHECK (
      name IS NOT NULL AND name != '' AND
      email IS NOT NULL AND email != '' AND
      subject IS NOT NULL AND subject != '' AND
      message IS NOT NULL AND message != ''
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE OR REPLACE FUNCTION public.check_contact_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF (SELECT count(*) FROM public.contact_submissions
      WHERE email = NEW.email
      AND created_at > now() - interval '1 hour') >= 5 THEN
    RAISE EXCEPTION 'Too many submissions. Please try again later.';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS contact_rate_limit ON contact_submissions;
CREATE TRIGGER contact_rate_limit
  BEFORE INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.check_contact_rate_limit();
