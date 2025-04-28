-- Rename a column from "code" to "course_code"
ALTER TABLE "public"."courses" RENAME COLUMN "code" TO "course_code";
-- Rename a column from "title" to "course_title"
ALTER TABLE "public"."courses" RENAME COLUMN "title" TO "course_title";
-- Modify "courses" table
ALTER TABLE "public"."courses" ADD COLUMN "course_description" character varying(2048) NULL;
