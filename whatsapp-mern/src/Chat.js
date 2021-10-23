import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SelectInput from '@mui/material/Select/SelectInput';
import axios from "./axios";

function Chat({ messages }) {

    const[input, setInput] = useState("");

    const sendMessage = async (e) => { 
        // this is for preventing refresh
        e.preventDefault();

        await axios.post('/messages/new', {
            "message": input,
            "name": "Chrissy Vee",
            "timestamp": "Today 3:00 pm", 
            "received": false
        });

        // reset input
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body"> 
                
                {/* map all the messages */}

                {/* 
                in p className => if message was received, we attach the receiver class 
                */}
                {messages.map((message) => (
                    <p className={ `chat_message ${message.received && "chat_receiver"} `}> 
                        <span className="chat_name">{message.name}</span>
                        { message.message } 
                        <span className="chat_timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat_footer"> 
                <InsertEmoticonIcon /> 
                <form>
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    /> 
                    <button
                        onClick={sendMessage}
                        type="submit">
                    Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
