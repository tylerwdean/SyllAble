# SyllAble

A goated team of Franciscan Students tackle the biggest problem at the University- Syllabi!!!

## Local development environment

This project will be done in React with Javascript. The server will be an ExpressJS server and the database will be a mariaDB database.

## The generator

The generator uses the library (python-docx)[https://github.com/python-openxml/python-docx] to generate the Syllabi. The data that it uses is in the form of a JSON file. In the file, order of the items generally doesn't matter. However, in the item 'paragraph', which is an array of paragraphs, these are generated in the order that they appear in the JSON file. To create a syllabus, simply update the JSON file with what you want and run the builder.py script.
