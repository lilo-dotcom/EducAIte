# EducAIte

Hello! EducAIte is the culmination of my thesis project for my Bachelor of Software Engineering (Honours) at UNSW.  
It aims to tackle the challenge of verifying information provided by AI systems such as ChatGPT.  
As a result, this is a conversational agent interface designed to be used in an academic setting. It prioritises academic credibility, reliability, and accuracy.  
Information provided by the conversational agent is derived from genuine, academic texts found on Google Scholar and appropriate in-text referencing is conducted.  

## Getting Started  
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes (hopefully)!

### Prerequisites  
You will need to install NodeJS. Please do so from https://nodejs.org/en/ and ensure you install NPM alongside it.  
  
### Clone the repository  
`git clone https://github.com/lilo-dotcom/EducAIte.git`    
`cd yourprojectname`  

### Install dependencies  
You will need to install the dependencies for the UI and API separately.  
**UI:**  
`cd ui`  
`npm install`  

**API:**  
`cd ..`  
`cd api`  
`npm install`  

### Set up environment variables
You will need to set-up environment variables to make use of a database, and set up this database.  
Follow the information provided in the API models and dbconfig files.  
Additionally, you will need an account with OpenAI and need to replace the API key with your own or store it as an environment variable.  

## Run the application
You will need to run the API and UI in two different terminals.  

**API:**  
`cd api`  
`npm run start:dev`  

**UI:**  
`cd ui`  
`npm start`  
Press y to indicate to run on a different port  

The application should now be running on your local server (e.g., http://localhost:3001).  

### Authors  
This project was completed by myself, Leila Barry (z5206290).  
Alongside my thesis supervisor was Claude Sammut and assessor was Wayne Wobcke.  
Huge thank you to both for their continued support and advice throughout the year!  
