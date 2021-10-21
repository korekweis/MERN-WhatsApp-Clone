import React from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import Mic from '@mui/icons-material/Mic';

function Chat() {
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
                <p className="chat_message"> 
                    <span className="chat_name">Seokjin</span>
                    
                    Hey! How are you? 
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

                <p className="chat_message"> 
                    <span className="chat_name">Seokjin</span>
                    
                    Message me once you're in LA, okay? Let's have dinner!
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

                <p className=" chat_message chat_receiver"> 
                    <span className="chat_name">Chrissy</span>
                    
                    JINJA?!?!?!?!?!
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
                <p className=" chat_message chat_receiver"> 
                    <span className="chat_name">Chrissy</span>
                    
                    Okay!!! see you!!  
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>

            <div className="chat_footer"> 
                <InsertEmoticonIcon /> 
                <form>
                    <input 
                        placeholder="Type a message"
                        type="text"
                    /> 
                    <button
                        // onClick={sendMessage}
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
