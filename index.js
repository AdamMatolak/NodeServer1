const express = require('express');
const mongodb = require('mongodb');

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'TaskDB';

const app = express();
const MongoClient = mongodb.MongoClient;

app.get('', (req, res)=>{
    res.send('Hello I am your NodeJS server');
})

app.get('/about', (req, res)=>{
    res.send('<h1>Server: task manager</h1>');
})

app.get('/author', (req, res)=>{
    res.send({'firstname':'Adam','lastname':'Matoľák'});
})

app.get('/task', (req, res)=>{
    MongoClient.connect(connectionURL, (error, client)=>{
        if(error){
            return console.log('Unable to connect to database UwU');
        }
        console.log('Connected UwU');
        let filter='';
        if(req.query.done){
            filter={done:true};
        }else{
            filter={done:false};
        }
        const db=client.db(databaseName);

        db.collection('Tasks').find(filter).toArray((err, result)=>{
            if(err) throw err;
            console.log(result);
            res.send(result);
        })
    })
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
