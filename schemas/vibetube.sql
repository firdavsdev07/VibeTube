CREATE SCHEMA vibetube;

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE videos (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    "desc" TEXT,
    path TEXT NOT NULL,
    type TEXT,
    filename TEXT,
    size BIGINT,
    author UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);