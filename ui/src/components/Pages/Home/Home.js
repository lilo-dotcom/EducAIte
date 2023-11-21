import React, { useEffect, useState } from 'react';
import '../../Components.css';
import Header from '../../molecules/Header';
import NoConversation from './NoConversation';
import Conversation from '../Conversation/Conversation';
import { getConversationsUser } from '../../../services/ConversationService';
import ConversationSidebar from './ConversationSidebar';

function Home() {
  const [ data, setData ] = useState({});
  const [currentConversationId, setCurrentConversationId] = useState(null);

  const user = localStorage.id;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversationsUser(user);
      setData(data);
    }

    fetchData();

    if (data.length > 0) {
      console.log("Data fetched!");
    }
    }, []);

    const handleConversationSelect = (id) => {
      setCurrentConversationId(id);
    };

    let toRender;
    if (currentConversationId) {
      toRender = <Conversation 
        conversationId={currentConversationId}
        key={currentConversationId}
        className="conversation"
      />;
    } else {
      toRender = <NoConversation />;
    }
    

  return (
    <div className="App">
      <Header className='header'></Header>
      <div className="main-content">
        <ConversationSidebar className="conversation-sidebar" 
          onSelectConversation={handleConversationSelect}
          selectedConversationId={currentConversationId}
        />
          {toRender}
      </div>
    </div>
  );
}

export default Home;