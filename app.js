const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { request, response } = require("express");
var cors = require('cors');

var app = express();
app.use(cors({
  "Access-Control-Allow-Origin" : "http://localhost:4200"
}));

mongoose.connect('mongodb://localhost/todoApi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
  extended: true
}));

const todoSchema = new mongoose.Schema({
  pending: [{ todo: String }],
  inProgress: [{ todo: String }],
  done: [{ todo: String }]

});

const Todo = mongoose.model('todo-api', todoSchema);

app.get("/todo", (request, response) => {
  
  Todo.find(function (err, result) {
    if (!err) {
     response.send(result);
    }
  })
});

app.post("/todo", (request, response) => {

    newData = {
      todo : request.body.todo
    }

    console.log(request.body);

 /* newData = {
    todo: request.todo
  }
  */
  /*Todo.findOne(
    { _id: "5f3865564c33e0213c737076" }
    , (err, res) => {
      if (err) {
        console.log(err);
      } else {
        res.pending.push(newData);
        res.save();
        response.send("Başarılı");
      }
    })
    */
})



app.listen(3000);