CREATE TABLE syllabi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(255) NOT NULL,
    professor_name VARCHAR(255) NOT NULL,
    office VARCHAR(255),
    office_hours VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    semester VARCHAR(50),
    classroom VARCHAR(50),
    class_days VARCHAR(10),
    class_times VARCHAR(50),
    course_description TEXT
);

CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    syllabus_id INT,
    resource_text TEXT NOT NULL,
    FOREIGN KEY (syllabus_id) REFERENCES syllabi(id) ON DELETE CASCADE
);

CREATE TABLE paragraphs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    syllabus_id INT,
    has_table BOOLEAN DEFAULT FALSE,
    title VARCHAR(255),
    content TEXT,
    FOREIGN KEY (syllabus_id) REFERENCES syllabi(id) ON DELETE CASCADE
);
