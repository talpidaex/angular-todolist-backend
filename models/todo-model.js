const mongoose = require("mongoose");
//mongodb conf.
mongoose.connect("mongodb://localhost:27017/todolist",
{useNewUrlParser : true, 
useUnifiedTopology: true });

mongoose.connection.on('error',console.error.bind(console,'connection error!'));
mongoose.connection.once('open',()=>{

    console.log("MongoDB Connection Success!");
  
});

const todoSchema = new mongoose.Schema({
    email : String,
    password : String,
    pendings : Array,
    inProgress : Array,
    done : Array
});
const Todo = mongoose.model('todos',todoSchema);

module.exports = Todo;