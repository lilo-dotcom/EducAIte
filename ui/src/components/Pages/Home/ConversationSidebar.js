import '../../Components.css';
import React, { useState, useEffect } from 'react';
import { getConversationsUser } from '../../../services/ConversationService';
import { useNavigate } from "react-router";

const ConversationSidebar = ({onSelectConversation, selectedConversationId}) => {

  const user = localStorage.getItem("id");
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      let conversations = await getConversationsUser(user);
      console.log(conversations);
      setConversations(conversations.reverse());
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <aside className="sidebar">
        <button 
          type="button"
          className="new-conversation-button"
          onClick={() => navigate("/new-conversation")}
        >
          New Conversation +
        </button>
        <nav className="conversation-nav">
        {
            conversations ? conversations.map(conversation =>
              <button 
                type="button" 
                className={`conversation-button ${conversation.id === selectedConversationId ? 'selected' : ''}`} 
                value={conversation.id} 
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
              >
                {conversation.name}
              </button>  
            )
            : "Start a new conversation."
          }
        </nav>
        </aside>
  )
}

export default ConversationSidebar;
