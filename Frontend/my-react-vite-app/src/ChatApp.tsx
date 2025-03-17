import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { useSearchParams } from 'react-router-dom';

interface ChatMessage {
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  readStatus: boolean;
}

interface TypingNotification {
  sender: string;
  typing: boolean;
}

const ChatApp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sender = searchParams.get('sender') || '';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [currentReceiver, setCurrentReceiver] = useState<string>('');
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const sock = new SockJS('http://localhost:8083/ws');
    const client = over(sock);
    client.connect({}, () => {
      console.log('Connected to WebSocket server');

      client.subscribe('/topic/messages', (message) => {
        const newMessage: ChatMessage = JSON.parse(message.body);

        if (newMessage.receiver === sender || newMessage.sender === sender || newMessage.receiver === 'broadcast') {
          setMessages((prev) => {
            if (!prev.some((msg) => msg.timestamp === newMessage.timestamp && msg.content === newMessage.content)) {
              return [...prev, newMessage];
            }
            return prev;
          });
        }
      });

      client.subscribe('/topic/typing', (typingNotification) => {
        console.log('Received typing notification:', typingNotification.body);

        try {
          const typingInfo: TypingNotification = JSON.parse(typingNotification.body);

          if (typingInfo.sender && typeof typingInfo.typing === 'boolean') {
            setTypingUsers((prev) => {
              let updated;
              if (typingInfo.typing) {
                updated = [...new Set([...prev, typingInfo.sender])];
              } else {
                updated = prev.filter((user) => user !== typingInfo.sender);
              }

              console.log('Updated typing users:', updated); // Debug log
              return updated;
            });
          } else {
            console.warn('Invalid typing notification:', typingInfo);
          }
        } catch (error) {
          console.error('Failed to process typing notification:', error);
        }
      });

      client.subscribe('/topic/readReceipt', (notification) => {
        const { message } = JSON.parse(notification.body);
        alert(message);
      });
    });
    setStompClient(client);

    return () => {
      if (client.connected) {
        client.disconnect(() => {
          console.log('Disconnected from WebSocket server');
        });
      }
    };
  }, [sender]);

  const sendMessage = () => {
    if (stompClient && currentMessage.trim() && currentReceiver.trim()) {
      const message: ChatMessage = {
        sender: sender,
        receiver: currentReceiver,
        content: currentMessage,
        timestamp: new Date().toISOString(),
        readStatus: false,
      };

      setMessages((prev) => [...prev, message]);

      stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
      setCurrentMessage('');
    }
  };

  const notifyTyping = (typing: boolean) => {
    if (stompClient) {
      console.log(`Sending typing notification: ${sender} is typing: ${typing}`);
      stompClient.send('/app/typing', {}, JSON.stringify({ sender: sender, typing }));
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === sender ? 'sent' : 'received'}`}>
            <strong>{msg.sender}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      {/* Typing indicator will only show if there are users typing */}
      {typingUsers.length > 0 && (
        <div className="typing-indicator" style={{ color: 'red', fontSize: '18px', marginTop: '10px' }}>
          <p>{typingUsers.join(', ')} is typing...</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Enter receiver's name"
        value={currentReceiver}
        onChange={(e) => setCurrentReceiver(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type your message here"
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
          notifyTyping(e.target.value.trim() !== '');
        }}
        onBlur={() => notifyTyping(false)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
