var express = require('express');
var app = express();
var mysql = require('mysql');
const { response } = require('express');

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'userspractise'
})

connection.connect();

connection.query('SELECT * FROM practisekorisnici', (request, data) =>{

  //view-all
  app.get('/people',
  (req,res)=>{
    var allUsers = '';
    for(var i = 0; i < data.length; i++){
      allUsers += data[i].name + ' ' + data[i].lastname + ' ' + data[i].age + ' ' + data[i].mood + ', '; 
    }
    res.send(allUsers)
  })

  //view-individual-id 
  app.get('/people/:id', //0, 1, or 2
  (req,res)=>{
    res.send(data[req.params.id])
  })
})

// https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express

app.get('/',
(req,res)=>{
  res.send('Hello World. Type in "/people" in the URl. Add "/:id" to see a specific user (0, 1, or 2).')
})

app.listen(3000,
  ()=> {
    console.log('Serve started on port 3000')
  })