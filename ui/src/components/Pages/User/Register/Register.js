import React, { useState } from 'react';
import '../../../../App.css';
import Header from '../../../molecules/Header';
import SignUp from './RegisterUser';

function Register() {

  return (
    <div className="App">
      <div className="index">
        <div className="colmask">
          <Header></Header>
          <SignUp></SignUp>
          <div className="about">
            <h2>About EducAIte:</h2>
            <h3>
            EducAIte is a thesis project that attempts to tackle the challenge of verifying information from AI sources such as ChatGPT. Our goal is to provide an online platform that emphasises the importance of academic credibility and promoting ethical AI usage.
            </h3>
            <h3>
              EducAIte - Your gateway to credible AI-enhanced learning, ensuring reliable information and promoting responsible AI usage among students.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;