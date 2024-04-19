CREATE TABLE global_events (
    id bigint PRIMARY KEY DEFAULT nextval('izanami.eventid'),
    event JSONB NOT NULL
);