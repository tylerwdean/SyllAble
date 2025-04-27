-- Modify "syllabi" table
ALTER TABLE "public"."syllabi" ADD COLUMN "id" serial NOT NULL, ADD PRIMARY KEY ("id");
-- Rename a column from "firstname" to "first_name"
ALTER TABLE "public"."users" RENAME COLUMN "firstname" TO "first_name";
-- Rename a column from "lastname" to "last_name"
ALTER TABLE "public"."users" RENAME COLUMN "lastname" TO "last_name";
