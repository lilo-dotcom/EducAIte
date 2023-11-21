import { useNavigate } from "react-router";
import { React } from 'react';
import "../../Components.css";

const NoConversation = () => {
  const navigate = useNavigate();

  return (
    <main className="conversation-container">
      <div className="conversation-header">
        Select a conversation from the sidebar, or:
      </div>
      <button className="new-conversation-main-button" onClick={() => navigate("/new-conversation")}>
        Start a new one +
      </button>
    </main>
  )
}

export default NoConversation;