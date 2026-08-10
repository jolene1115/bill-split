-- Bill Split - database schema

-- One row per bill. The auto-generated 'id' is the sharable link
create table bills(
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tax_percent numeric not null default 0,
  tip_percent numeric not null default 0,
  created_at timestamptz not null default now()
);

-- People splitting a given bill.
-- Each gets a highlighter color for the UI.
create table participants(
  id uuid primary key default gen_random_uuid(),
  bill_id uuid not null references bills(id) on delete cascade,
  name text not null,
  color text not null default '#FFD966'
);

--Line items on a bill
create table items (
  id uuid primary key default gen_random_uuid(),
  bill_id uuid not null references bills(id) on delete cascade,
  name text not null,
  price numeric not null
);

-- Which participant(s) an item is assigned to. An item can be shared by more than one person
create table item_assignments(
  item_id uuid not null references items(id) on delete cascade,
  participant_id uuid not null references participants(id) on delete cascade,
  primary key (item_id, participant_id)
);
