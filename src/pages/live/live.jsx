import React, { useState, useEffect } from "react";
import "./live.css"; // Ensure this path matches your CSS file location
import Wrapper from "../components/wrapper/Wrapper"; // Adjust this import to your project's structure

const ChatComponent = () => {
  const [chatEntries, setChatEntries] = useState([]);

  useEffect(() => {
    // Ensure the WebSocket URL matches your server configuration
    const socket = new WebSocket("ws://localhost:80/live-attendance");

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      // Transforming incoming data to match the existing data structure
      const transformedEntry = {
        name: newData.StudentName,
        code: `${newData.ClassName}'${newData.SectionName}'`,
        time: newData.Time,
      };

      // Update state to include the new chat entry
      setChatEntries((prevEntries) => [...prevEntries, transformedEntry]);
    };

    socket.onopen = () => console.log("WebSocket Connected");
    socket.onerror = (error) => console.log("WebSocket Error: ", error);
    socket.onclose = () => console.log("WebSocket Disconnected");

    // Clean up function to close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  return (
    <Wrapper className="live-logs-container">
      <h1 className="live-logs">Live Logs</h1>
      <div className="chat-container">
        {chatEntries.map((entry, index) => (
          <div className="chat-entry" key={index}>
            <span className="chat-prefix">{"-->"}</span>

            <span className="chat-name">{entry.name}</span>
            <span className="chat-code">{entry.code}</span>
            <span className="chat-time">{entry.time}</span>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ChatComponent;
