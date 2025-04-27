CREATE TABLE courses (
    code VARCHAR(10) PRIMARY KEY,
    title VARCHAR(64) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(64),
    last_name VARCHAR(64),
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL
);

CREATE TABLE syllabi (
title VARCHAR(128),
course_code VARCHAR(10) REFERENCES courses(code),
professor_id INTEGER REFERENCES users(id),
syllabus JSONB,
semester VARCHAR(64),
id SERIAL PRIMARY KEY
);
