"use client";
import { Box, TextField, Button, CircularProgress, Typography } from "@mui/material";
import { useState, useRef } from "react";

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
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "375px", // iPhone width
          height: "667px", // iPhone height
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          padding: "20px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flex: "1 1 auto",
            overflowY: "auto",
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            boxShadow: "inset 0 4px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "10px", // Space between messages
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  backgroundColor: message.role === "assistant" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                  color: message.role === "assistant" ? "#ffffff" : "#ffffff",
                  maxWidth: "80%",
                }}
              >
                <strong>{message.role === "assistant" ? "Assistant" : "You"}:</strong> {message.content}
              </Typography>
            </Box>
          ))}
          <div ref={chatEndRef} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px", // Space between input and button
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              input: {
                color: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                padding: "12px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "#ffffff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                },
              },
              flex: "1", // Makes the input take up the available space
              marginBottom: "0",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            sx={{
              backgroundColor: "#007bff", // Blue color for the button
              "&:hover": {
                backgroundColor: "#0056b3",
              },
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              whiteSpace: "nowrap", // Prevent text from wrapping
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
          </Button>
        </Box>
        {error && (
          <Typography variant="body2" color="error" sx={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}



