import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Chat } from "./Chat/Chat";
import { Controls } from "./Controls/Controls";
import styles from "./Chat/Chat.module.css";
import { Loader } from "./Loader/Loader";

// Store API key securely in .env file
const API_KEY =import.meta.env.VITE_GEMINI_API_KEY;
const googleai = new GoogleGenerativeAI(API_KEY);
const gemini = googleai.getGenerativeModel({ model: "gemini-2.0-flash" });


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
  
    // Initialize chat on component mount
    useEffect(() => {
      async function initChat() {
        try {
          const newChat = gemini.startChat({ history: [] });
          setChat(newChat);
        } catch (error) {
          console.error("Error initializing chat:", error);
        }
      }
      initChat();
    }, []);
  
    function addMessage(message) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  
    async function handleContentSend(content) {
      addMessage({ content, role: "user" });
      setIsLoading(true);
  
      if (!chat) {
        addMessage({ content: "Chat service unavailable. Please try again later.", role: "system" });
        setIsLoading(false);
            setIsStreaming(true);
        return;
        
      }
  
      try {
        const result = await chat.sendMessage(content);
        console.log("API Response:", result); // Debugging: Check response structure
  
        // ✅ Extract response correctly
        const responseText = result.response.text?.() || "I couldn't process your request.";
        
        addMessage({ content: responseText, role: "assistant" });
        setIsLoading(false);
            setIsStreaming(true);
      } catch (error) {
        console.error("Error sending message:", error);
        addMessage({
          content: "Sorry, I couldn't process your request. Please try again!",
          role: "system",
        });
      }
    }
  
    return (
      <div className={styles.App}>
        {isLoading && <Loader />}
        <header className={styles.Header}>
          <img className={styles.Logo} src="/logo.png" />
          <h2 className={styles.Title}>AI Chatbot (Powered by Gemini AI).</h2>
        </header>
        <div className={styles.ChatContainer}>
          <Chat messages={messages} />
        </div>
        <Controls
          isDisabled={isLoading || isStreaming}
          onSend={handleContentSend}
        />
      </div>
    );
}

export default Chatbot