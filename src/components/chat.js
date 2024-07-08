import React, { useState, useEffect, Suspense, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HeaderTitle from "./header";
import "./styles.scss";
import Footer from "./footer";
import ReactMarkdown from "react-markdown";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [genAI, setGenAI] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const API_KEY = ""; //Use your API KEY HERE!
    const genAIInstance = new GoogleGenerativeAI(API_KEY);
    setGenAI(genAIInstance);

    const generativeModel = genAIInstance.getGenerativeModel({
      model: "gemini-pro",
    });
    setModel(generativeModel);
  }, []);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, sender: "user" },
      ]);

      setNewMessage("");
      setLoading(true);

      if (genAI && model) {
        try {
          const result = await model.generateContent(newMessage);
          const response = await result.response;
          const botResponse = response.text();

          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponse, sender: "bot" },
          ]);
        } catch (error) {
          console.error("Error fetching from API:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }

      setNewMessage("");
    }
  };

  const chatListRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatMarkDownText = (text) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  return (
    <>
      <div className="screen">
        <>
          <HeaderTitle />
          <Paper className="chat">
            <List
              ref={chatListRef}
              style={{
                width: "100% !important",
                height: "100% !important",
                overflowY: "auto",
              }}
            >
              {messages.map((message, index) => (
                <ListItem
                  key={index}
                  style={{
                    textAlign: message.sender === "user" ? "right" : "left",
                  }}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar>
                      {message.sender === "user" ? <PersonIcon /> : "Bot"}
                    </Avatar>
                  </ListItemAvatar>
                  <Suspense>
                    <Typography
                      component="div"
                      variant="body2"
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        background:
                          message.sender === "user" ? "#007BFF" : "#28A745",
                        color: "white",
                        display: "inline-block",
                        maxWidth: "70%",
                        wordWrap: "break-word",
                      }}
                    >
                      {formatMarkDownText(message.text)}
                    </Typography>
                  </Suspense>
                </ListItem>
              ))}
              <div ref={chatEndRef} />
            </List>
          </Paper>

          <Grid container className="textField">
            <Grid item xs={12} sm={12} md={12}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Digite uma mensagem..."
                  variant="outlined"
                  fullWidth={true}
                  color="primary"
                  value={newMessage}
                  onChange={handleInputChange}
                  className="textField"
                  focused
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="buttonSend"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color="primary" />
                  ) : (
                    <Typography variant="h7">ENVIAR</Typography>
                  )}
                </Button>
              </form>
            </Grid>
          </Grid>

          <Footer />
        </>
      </div>
    </>
  );
}

export default Chat;
