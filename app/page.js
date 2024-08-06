"use client";
import { Box, TextField, Button, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello, how can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessage = { role: "user", content: inputValue };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue("");
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedMessages)
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: data.message.content }
        ]);
      } catch (error) {
        console.error("Error:", error);
        setError("There was an error sending your message. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Box sx={{ maxHeight: "70vh", overflowY: "auto", marginBottom: "20px" }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.role === "assistant" ? "flex-start" : "flex-end",
              marginBottom: "10px"
            }}
          >
            <Box sx={{ maxWidth: "50%" }}>
              <Box
                sx={{
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor:
                    message.role === "assistant" ? "#f0f0f0" : "#007bff",
                  color: message.role === "assistant" ? "#000" : "#fff"
                }}
              >
                {message.content}
              </Box>
            </Box>
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Box>
      {error && (
        <Typography color="error" sx={{ marginBottom: "10px" }}>
          {error}
        </Typography>
      )}
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          disabled={loading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          sx={{ marginLeft: "10px" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send"}
        </Button>
      </Box>
    </Box>
  );
}
