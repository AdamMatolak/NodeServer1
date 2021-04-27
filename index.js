const express = require('express');
const mongodb = require('mongodb');

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'TaskDB';

const app = express();
const MongoClient = mongodb.MongoClient;

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

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
        }else{
            let filter='';
            if(req.query.done){
                if(req.query.done=='true'){
                    filter={done:true};
                }else{
                    filter={done:false};
                }
            }else if(req.query.priority){
                filter.priority=parseInt(req.query.priority);
            }
            console.log(filter);
            const db=client.db(databaseName);

            db.collection('Tasks').find(filter).toArray((err, result)=>{
                if(err) throw err;
                //console.log(result);
                res.send(result);
        })
        } 
    })
})

app.post('/task/new', (req, res)=>{
    MongoClient.connect(connectionURL, (error, client)=>{
        const data = (req.body);
        const name = data.name;
        const priority = data.priority;
        let currentDate = new Date();
        let price='undefined';
        if(data.price){
            price = data.price;
        }
        //console.log(name,' ',priority,' ',price,' ',currentDate);
        var newTask = {name: name, priority: priority, price: price, done: 'false', date: currentDate};
        const db=client.db(databaseName);
        db.collection("Tasks").insertOne(newTask, function(err, res) {
            if(err){
                return console.log('Unable to add new task');
            } else{
                console.log("1 document inserted");
            } 
        })
    })
})

// app.get('/task/find', (req, res)=>{
//     const db=client.db(databaseName);
//     MongoClient.connect(connectionURL, (error, client)=>{
//         db.collection("Tasks").findOne({'priority.value': req.params('priority')})
//     })
// })

app.put('/task/done', (req,res)=>{
    
    const id = req.query._id;
    if(!id){
        res.status(400).send({"error":"missing _id parameter"});
    }
    const filter={}
    var newValue = {$set:{done: true}};
    filter._id = new mongodb.ObjectID(id);

    MongoClient.connect(connectionURL, (error, client)=>{
        if(error){
            res.status(400).send({"error":"Unable to save data to database"});
            return console.log("Unable to connect to database");
        }
        const db=client.db(databaseName);
        db.collection("Tasks").updateOne(filter, newValue),(error,res)=>{
            if(error){
                res.status(400).send({"error":"Unable to update task"});
            }else{
                res.status(200).send({"result":"Task has been updated"});
                console.log("1 document updated");
            }
        }
    })
})
    
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}) 