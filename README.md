EducAIte
Hello! EducAIte is the culmination of my thesis project for my Bachelor of Software Engineering (Honours) at UNSW.
It aims to tackle the challenge of verifying information provided by AI systems such as ChatGPT.
As a result, this is a conversational agent interface designed to be used in an academic setting. It prioritises academic credibility, reliability, and accuracy.
Information provided by the conversational agent is derived from genuine, academic texts found on Google Scholar and appropriate in-text referencing is conducted.

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes (hopefully)!

Prerequisites
You will need to install NodeJS. Please do so from https://nodejs.org/en/ and ensure you install NPM alongside it.

Clone the repository
git clone https://github.com/yourusername/yourprojectname.git REPLACE THIS
cd yourprojectname

Install dependencies
You will need to install the dependencies for the UI and API separately.
UI:
cd ui
npm install

API:
cd ..
cd api
npm install

Set up environment variables
For the sake of this assignment, the information required is within the code.
The OpenAI API key will only be accessible until the end of 2023. If you wish to run the code following this, you will need to create an OpenAI account.
FIGURE OUT HOW I CONNECTED MY DB

Run the application
You will need to run the API and UI in two different terminals.
API:
cd api
npm run start:dev

UI:
cd ui
npm start
Press y to indicate to run on a different port

The application should now be running on your local server (e.g., http://localhost:3001).

Authors
This project was completed by myself, Leila Barry (z5206290).
Alongside my thesis supervisor was Claude Sammut and assessor was Wayne Wobcke.
Huge thank you to both for their continued support and advice throughout the year!