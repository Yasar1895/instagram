import { useState } from "react";

export default function MessagePanel({ username, avatar }) {
  const [messages, setMessages] = useState([
    { from: "them", text: "Hey! How are you?" },
    { from: "me", text: "I'm good, what about you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={avatar} alt={username} className="avatar" />
        <span>{username}</span>
      </div>
      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}