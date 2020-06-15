var express = require('express');
var app = express();
var mysql = require('mysql');
const { response } = require('express');

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'users'
})

connection.connect();

connection.query('SELECT * FROM korisnici', (request, data) =>{

  //view-all
  app.get('/users',
  (req,res)=>{
    var allUsers = '';
    for(var i = 0; i < data.length; i++){
      allUsers += data[i].ID + ' ' + data[i].Ime + ' ' + data[i].Prezime + ' ' + data[i].Email + ', '; 
    }
    res.send(allUsers)
  })

  //view-individual-id 
  app.get('/users/:id', //0, 1, or 2     <---- kako da bude 1,2, i 3 ?
  (req,res)=>{
    res.send(data[req.params.id])
  })
})

// https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express

app.get('/',
(req,res)=>{
  res.send('Hello World. Type in "/users" in the URl. Add "/users/:id" to see a specific user (0, 1, or 2).')
})

app.listen(3000,
  ()=> {
    console.log('Serve started on port 3000')
  })