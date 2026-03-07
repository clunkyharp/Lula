CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE oauth_identities (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  provider TEXT NOT NULL,
  provider_sub TEXT NOT NULL,
  UNIQUE(provider, provider_sub)
);

CREATE TABLE pets (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) UNIQUE,
  name TEXT NOT NULL,
  stage TEXT NOT NULL,
  emotion TEXT NOT NULL,
  health INT NOT NULL,
  happiness INT NOT NULL,
  energy INT NOT NULL,
  hunger INT NOT NULL,
  xp INT NOT NULL,
  level INT NOT NULL,
  alive BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  planned_minutes INT NOT NULL,
  clean_minutes INT NOT NULL,
  violated_minutes INT NOT NULL,
  violations INT NOT NULL,
  earned_coins INT NOT NULL,
  earned_xp INT NOT NULL,
  status TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ
);

CREATE TABLE session_events (
  id UUID PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES sessions(id),
  minute_index INT NOT NULL,
  violated BOOLEAN NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE daily_stats (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  date DATE NOT NULL,
  offline_minutes INT NOT NULL,
  online_minutes INT NOT NULL,
  successful_sessions INT NOT NULL,
  failed_sessions INT NOT NULL,
  UNIQUE(user_id, date)
);

CREATE TABLE quests (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  target_minutes INT NOT NULL,
  completed BOOLEAN NOT NULL,
  reward_coins INT NOT NULL,
  reward_xp INT NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE streaks (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) UNIQUE,
  current INT NOT NULL,
  longest INT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);
