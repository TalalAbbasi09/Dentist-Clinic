import React, { useState } from 'react';
import '../styles/Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 Welcome to DentistConnect AI. How can I help you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickResponses = [
    'Book an appointment',
    'Our services',
    'Office hours',
    'Contact information'
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputValue('');
  };

  const handleQuickResponse = (response) => {
    setInputValue(response);
    handleSendMessage();
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let responseText = '';

    if (input.includes('appointment') || input.includes('book')) {
      responseText = 'To book an appointment, please visit our "Book Appointment" page. You can select your preferred service, date, and time slot!';
    } else if (input.includes('service')) {
      responseText = 'We offer various services including Cleaning, Whitening, Braces, Root Canal, Implants, and Checkups. Visit our Services page for more details!';
    } else if (input.includes('hour') || input.includes('time')) {
      responseText = 'We are open Monday through Friday, 8:00 AM to 6:00 PM. We look forward to seeing you!';
    } else if (input.includes('contact') || input.includes('phone') || input.includes('address')) {
      responseText = 'You can reach us at (555) 123-4567 or visit us at 123 Dental Avenue, Suite 456, New York, NY 10001. Check our Contact page for more information!';
    } else {
      responseText = 'Thank you for your message! For specific inquiries, please contact us at (555) 123-4567 or visit our Contact page.';
    }

    return {
      type: 'bot',
      text: responseText
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>DentistConnect AI</h3>
          <button className="close-btn" onClick={toggleChat}>✕</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-bubble">
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="quick-responses">
          {quickResponses.map((response, index) => (
            <button 
              key={index}
              className="quick-response-btn"
              onClick={() => handleQuickResponse(response)}
            >
              {response}
            </button>
          ))}
        </div>

        <div className="chatbot-input">
          <input 
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-btn" onClick={handleSendMessage}>
            ➤
          </button>
        </div>
      </div>

      <button className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
}
