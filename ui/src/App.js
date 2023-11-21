import { React, useState } from 'react';
import './App.css';
import UserContext from './components/Auth/AccountContext';
import Views from "./components/Routes/Views";

function App() {
  return(
    <UserContext>
      <Views />
    </UserContext>
  )
}

export default App;
