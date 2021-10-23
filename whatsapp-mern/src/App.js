import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const [messages, setMessages] = useState([]);

  // create your axios file first
  useEffect(() => { 
    axios.get('/messages/sync')
      .then(response => { 
        console.log(response.data)
        setMessages(response.data);
      })
  }, []);

  useEffect(() => {
    var pusher = new Pusher('c8af291452c3fc8cf94a', {
      cluster: 'us3'
    });
  
    /* pusher.subscribe('messages') messages is found in the 
      pusher trigger in the changeStream cold block
    */
    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));

      // set the messages
      // ...messages -> means keep all the initial messages in the array 
      //      then add the newMessage
      setMessages([...messages, newMessage]);
    });
    
    // cleanup function
    return () => { 
      // unbind since above the channel was binded
      channel.unbind_all();
      channel.unsubscribe();
    }

    // we need to add [messages] since we should update everytime message is added
  }, [messages])

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat component */}
        <Chat messages = {messages}/>
      </div>
    </div>
  );
}

export default App;
