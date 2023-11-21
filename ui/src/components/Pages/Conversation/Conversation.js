import React, { useState, useEffect } from 'react';
import '../../../App.css';
import axios from 'axios';
import { createMessage } from '../../../services/MessageService';
import { getMessagesConversation } from '../../../services/MessageService';
import { getCurrentConversation } from '../../../services/ConversationService';
import { evaluateInputAndResponse } from '../../../services/VerificationService';
import { ThreeDots } from 'react-loader-spinner';
import ReactMarkdown from 'react-markdown'

function Conversation({conversationId}) {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [suggestion, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessagesConversation(conversationId);
      const conversation = await getCurrentConversation(conversationId);
      const suggestion = await suggestedQueries();
      setSuggestions(suggestion);
      setMessages(data);
      setConversation(conversation);
    }

    fetchData();

  }, [conversationId]);  // Rerun when conversationId is updated

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: user, recipient: 1, conversation: conversationId };
    
      // Update state with user message
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      setInput('');
      createMessage(userMessage);
      console.log("Sent user message to DB.");
  
      setLoading(true);
      let chatGPTResponse = await evaluateInputAndResponse(input, await jsonifyConversation());
      setLoading(false);
  
      // Update state with ChatGPT response
      const chatGPTMessage = { text: chatGPTResponse, sender: 1, recipient: user, conversation: conversationId };
      setMessages(prevMessages => [...prevMessages, chatGPTMessage]);
      
      createMessage(chatGPTMessage);
      console.log("Sent ChatGPT message to DB.");

      const suggestion = await suggestedQueries(input);
      setSuggestions(suggestion);
      
      }
    }

  // preferably break this down into easier to read functions as well thank you
  const suggestedQueries = async (input) => {

      const suggestedInputQuery = "Hey ChatGPT I am the admin for this user, based on the provided conversation, "
      + "can you please give three suggestions for questions the user should ask you to guide them through their conversation, "
      + "but that wouldn't be asking you to do all the work for them. E.g. Can you please summarise XYZ concept? Can you help me "
      + "schedule a study timetable? Can you ask me some multiple choice questions to test my knowledge? Provde only"
      + " the suggested questions (no other text at all), each separated by a new line.";
  
      let conversationString = "";
        conversationString += "User:" + input;
        conversationString += "\n";

      conversationString += "User:" + suggestedInputQuery;

      const response2 = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: conversationString,
          max_tokens: 500,
          n: 1,
          stop: null,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,
          },
        }
      );
  
      const chatGPTResponse2 = response2.data.choices[0].text.trim();
    
      const suggestions = chatGPTResponse2.split('\n');
      console.log(suggestions);
      let suggestion1 = "How can I optimise my study routine?";
      let suggestion2 = "How could I write a practice exam to test my knowledge?";
      let suggestion3 = "What is the pomodoro technique and how can I use it?";

      if (suggestions[1]) {
        suggestion1 = suggestions[1].split(': ');
      }
      
      if (suggestions[2]) {
        suggestion2 = suggestions[2].split(': ');
      }
      
      if (suggestions[3]) {
        suggestion3 = suggestions[3].split(': ');
      } else {
        suggestion3 = suggestions[0].split(': ');
      }

      return {
        suggestion1: suggestion1,
        suggestion2: suggestion2,
        suggestion3: suggestion3
      }
  }

  async function jsonifyConversation (e) {
    let conversationInitString = "Hi there, I am the admin for a conversation service making use of your large language model. "
    + "For some context, this conversation is aimed towards academic development and being used as an educational tool."
    let messagesParam = [];
    let i = 0;
    let convLength = messages.length;

    messagesParam[0] = {"role": "system", "content": conversationInitString};

    // including the entire conversation has recently started to result in issues
    // latest GPT-4-turbo is too smart :/ 
    // catches onto my manual addition of sources at the end of messages, results in every message having another set of references until it overwhelms
    // too late in term to resolve this issue, so send one message at a time now :(
    // for (i = 0; i < convLength; i++) {
    //   if (messages[i].sender === 1) {
    //     messagesParam[i+1] = {"role": "assistant", "content": messages[i].text};
    //   } else {
    //     messagesParam[i+1] = {"role": "user", "content": messages[i].text};
    //   }
    // }
    messagesParam[1] = {"role": "user", "content": input};
    return messagesParam;
  }

async function sendSuggestedMessage (e) {
  setInput(e.target.value);
}

const suggestion1 = suggestion.suggestion1;
const suggestion2 = suggestion.suggestion2;
const suggestion3 = suggestion.suggestion3;

  let conversationName = "Your conversation is loading...";

  if (conversation.length !== 0) {
    conversationName = conversation[0].name;
  }
  
  return (
      <main className="conversation-container">
        <div className="conversation-header">
          <p>{conversationName}</p>
        </div>
        <div className="conversation-body">
          {messages?.map((message) => (
            <div key={message?._id}
            className={`chat-message ${
              message?.recipient === 1 ? "sent" : "received"
            }`}
            >
              <ReactMarkdown className="message" aria-label={message?.text}>{message?.text}</ReactMarkdown>
              <span className="metadata">{message?.createdAt}</span>
            </div>
          ))}
        </div>
        <div className="conversation-footer">
          <div className="suggestion-buttongroup">
            <button type="button" className="suggestion1" value={suggestion1} onClick={sendSuggestedMessage} >
              <span className="suggestion-text">{suggestion1}</span>
            </button>
            <button type="button" className="suggestion2" onClick={sendSuggestedMessage} value={suggestion2}>
              <span className="suggestion-text">{suggestion2}</span>
            </button>
            <button type="button" className="suggestion3" onClick={sendSuggestedMessage} value={suggestion3}>
            <span className="suggestion-text">{suggestion3}</span>
            </button>
          </div>
        </div>
        <form onSubmit={sendMessage} className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-input"
              aria-label="Input message"
            />
            <div className="flex">
              {loading ? <ThreeDots color="#29274C" className="loader"/> : 
                <button
                  type="submit"
                  className="send-input"
                >
                  Send
                </button>
              }
            </div>
          </form>
      </main>
  );
}

export default Conversation;