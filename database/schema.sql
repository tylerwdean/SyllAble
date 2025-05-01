CREATE TABLE courses (
    course_code VARCHAR(10) PRIMARY KEY,
    course_title VARCHAR(64) NOT NULL,
    course_description VARCHAR(2048)
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
course_code VARCHAR(10) REFERENCES courses(course_code),
professor_id INTEGER REFERENCES users(id),
syllabus JSONB,
semester VARCHAR(64),
id SERIAL PRIMARY KEY
);
