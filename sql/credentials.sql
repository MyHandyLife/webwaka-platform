-- credentials.sql
-- Stores encrypted credentials for staging & production + verification state
create table if not exists admin_credentials (
  id uuid primary key default gen_random_uuid(),
  env text not null check (env in ('staging','production')),
  key_name text not null,
  value_cipher bytea not null,
  value_nonce bytea not null,
  verified boolean default false,
  last_verified_at timestamptz,
  updated_by uuid,
  updated_at timestamptz default now(),
  unique(env, key_name)
);

create table if not exists admin_credential_audit (
  id bigserial primary key,
  credential_id uuid references admin_credentials(id) on delete cascade,
  action text not null,
  actor uuid,
  meta jsonb,
  at timestamptz default now()
);

alter table admin_credentials enable row level security;
alter table admin_credential_audit enable row level security;
