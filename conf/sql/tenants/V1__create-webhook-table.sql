CREATE TABLE webhooks (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    url TEXT NOT NULL,
    username TEXT NOT NULL DEFAULT '',
    headers JSONB NOT NULL DEFAULT '[]',
    context TEXT NOT NULL DEFAULT '',
    enabled BOOLEAN NOT NULL,
    body_template TEXT
);

CREATE TABLE webhooks_features (
    feature TEXT NOT NULL REFERENCES features(id) ON DELETE CASCADE ON UPDATE CASCADE,
    webhook UUID NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (feature, webhook)
);

CREATE TABLE webhooks_projects (
    project UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
    webhook UUID NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (project, webhook)
);

CREATE TABLE users_webhooks_rights (
   username TEXT NOT NULL REFERENCES izanami.users(username) ON DELETE CASCADE ON UPDATE CASCADE,
   webhook TEXT NOT NULL REFERENCES webhooks(name) ON DELETE CASCADE ON UPDATE CASCADE,
   level izanami.RIGHT_LEVEL NOT NULL DEFAULT 'READ',
   PRIMARY KEY (username, webhook)
);

CREATE TABLE webhooks_call_status(
  webhook UUID NOT NULL REFERENCES webhooks(id),
  event bigint NOT NULL,
  pending boolean NOT NULL DEFAULT TRUE,
  last_call  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE events (
  id bigint PRIMARY KEY DEFAULT nextval('izanami.eventid'),
  event JSONB NOT NULL
);