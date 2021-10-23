import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
// middleware so that if info in the db changes, no need to 
// keep on refreshing
import Pusher from 'pusher';
import cors from 'cors'; 

// app config 
const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1286309",
    key: "c8af291452c3fc8cf94a",
    secret: "98b89daa31d1e910b24d",
    cluster: "us3",
    useTLS: true
  });
  

// middleware
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => { 
//     // allowing requests coming from any headpoint (not good for security)
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });

// DB config 
const connection_url = 'mongodb+srv://kweis:kw3iskw3is!@cluster0.o9esy.mongodb.net/whatsAppDB?retryWrites=true&w=majority'

mongoose.connect(connection_url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})

const db = mongoose.connection;

// once mongoose connection is open, fire up a function
db.once('open', () => { 
    console.log("DB connected"); 

    // messagecontent -> being returned by dbMessages.js
    const msgCollection = db.collection("messagecontents");
    // it watches the messagecontent collection
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => { 
        console.log("a change has occured", change); 

        if (change.operationType === 'insert') { 
            // fullDocument field can be found in console once info has been printed
            const messageDetails = change.fullDocument; 
            pusher.trigger('messages', 'inserted', 
                { 
                    name: messageDetails.name, 
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                }
            );
        } else { 
            console.log("An error has been encountered");  
        }
    })
})


// api routes
app.get('/', (req, res) => res.status(200).send('hello world!'));

app.get('/messages/sync', (req, res) => { 
    // find function is used to get all the messages
    Messages.find((err, data) => { 
        if (err) { 
            res.status(500).send(err)
        } else { 
            // this is different from 201 below
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body 

    Messages.create(dbMessage, (err, data) => { 
        if (err) { 
            res.status(500).send(err);
        } else { 
            res.status(201).send(`new message created: \n ${data}`);
        }
    })
})

// listen
app.listen(port, () => console.log(`Listening on port: ${port}`));