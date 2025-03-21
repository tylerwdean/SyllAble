# SyllAble

A goated team of Franciscan Students tackle the biggest problem at the University- Syllabi!!!

## Starting the servers for development

The project is now incorperated, front end and back end. To start the backend cd into /server and run 'npm run dev'. 
Create a new terminal since that will run in the background and start the client. To do that, cd into client and run 'npm run dev'.
Then you can open up the link the client one says and the project will run. 

## Local development environment

This project will be done in React with Javascript. The server will be an ExpressJS server and the database will be a mariaDB database.

## The generator

The generator uses the library [python-docx](https://github.com/python-openxml/python-docx) to generate the Syllabi. The data that it uses is in the form of a JSON file. In the file, order of the items generally doesn't matter. However, in the item 'paragraph', which is an array of paragraphs, these are generated in the order that they appear in the JSON file. To create a syllabus, simply update the JSON file with what you want and run the builder.py script.

## Getting set up for running the project server and installing all dependencies

Using Ubuntu via WSL: 

1. Clone the project. 
2. cd into /server
3. Install nodejs and npm with the commands: 

sudo apt install unzip
curl -o- https://fnm.vercel.app/install | bash
source /home/tyler/.bashrc
fnm install 22
(verify installation with node -v and npm -v)

4. Install other dependencies (they are specified in the package.json and npm will automatically download them):

npm install

## Set up dev environment for front end

We are using vite to make a React project. To set up the dependencies for vite:

1. cd into /client
2. run the command: npm install

Then to start the project on a local development server for front end work, you can do so using:

npm run dev

## To deploy the React page to the server:

1. run the command: npm run build
2. Move the dist folder from the project into server/public. This will make the express server statically serve this folder. 
3. Start the Express server with the command in /server: npm run start
