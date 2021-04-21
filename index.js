const express = require('express');

const app = express();

app.get('', (req, res)=>{
    res.send('Hello I am your NodeJS server');
})

app.get('/about', (req, res)=>{
    res.send('<h1>Server: task manager</h1>');
})

app.get('/author', (req, res)=>{
    res.send({'firstname':'Adam','lastname':'Matoľák'});
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})