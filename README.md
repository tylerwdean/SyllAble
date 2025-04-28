# SyllAble

Tyler tackles the biggest problem at the University- Syllabi!!!

## Starting the servers for development

Everything has been changed for using docker compose. To run the project, clone the repo. Rename the '.env-example' to '.env' and update the variables in there with your own variables.

To run the project, ensure you have docker on your machine. For the following commands, run them from the root directory of the project. Run `docker compose build` to build the images. Then run `docker compose up -d` to start up the project. All data in the database will persist in a docker volume. To remove the volume, take the volume down with `docker compose down -v`. Otherwise, just use `docker compose down`.

## Local development environment

This project will be done in React with Javascript. The server will be an ExpressJS server and the database will be a mariaDB database.

## The generator

The generator uses the library [python-docx](https://github.com/python-openxml/python-docx) to generate the Syllabi. The data that it uses is in the form of a JSON file. In the file, order of the items generally doesn't matter. However, in the item 'paragraph', which is an array of paragraphs, these are generated in the order that they appear in the JSON file. To create a syllabus, simply update the JSON file with what you want and run the builder.py script.

## To deploy the React page to the server:

1. run the command: npm run build
2. Move the dist folder from the project into server/public. This will make the express server statically serve this folder.
3. Start the Express server with the command in /server: npm run start

## Setting up the database

The database is managed with docker. Upon starting the database, the schema.sql file is applied to the database. This means that with schema changes, you should remove the volume and restart the database, which will remove all data in the database. This is okay for development. Test data can be inserted when needed.

## Managing the DB schema

We will use atlasgo to manage the schema. In the database folder, run this command to apply the changes to the schema:

atlas migrate diff migration_name --dir "file://migrations" --to "file://schema.sql" --dev-url "docker://postgres/15/dev"

The atlas migrations are applied to the database during docker compose startup.
