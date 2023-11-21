import React, { useState, useEffect } from 'react';
import '../Components.css';
import { useNavigate } from "react-router";
import { getUser } from '../../services/UserService';

function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser(userId);
      setUser(user);
    }
    fetchData();
  }, []);

  const username = user.email;


  function logout () {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/register");
  }

  return (
    <header className="app-header">
      <div className="user-info">
        <span className="username">{username || ''}</span>
      </div>
    <div className="header-content">
      <p className="educaite">
        <span className="title">EDUC</span>
        <span className="standout-title">AI</span>
        <span className="title">TE</span>
      </p>
        </div>
      <button type="button" className="logout-button" onClick={logout}>Logout</button>
    </header>    
  )
}

export default Header;