-- Create "courses" table
CREATE TABLE "public"."courses" ("code" character varying(10) NOT NULL, "title" character varying(64) NOT NULL, PRIMARY KEY ("code"));
-- Create "users" table
CREATE TABLE "public"."users" ("id" serial NOT NULL, "firstname" character varying(64) NULL, "lastname" character varying(64) NULL, "email" character varying(64) NOT NULL, "password" character varying(256) NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "users_email_key" UNIQUE ("email"));
-- Create "syllabi" table
CREATE TABLE "public"."syllabi" ("title" character varying(128) NULL, "course_code" character varying(10) NULL, "professor_id" integer NULL, "syllabus" jsonb NULL, "semester" character varying(64) NULL, CONSTRAINT "syllabi_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "public"."courses" ("code") ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "syllabi_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "public"."users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
