create table users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32) NOT NULL,
  accepted BOOLEAN NOT NULL,
  limitation INTEGER,  
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);