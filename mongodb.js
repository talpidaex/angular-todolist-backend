const express = require("express");
const Todo = require("./models/todo-model");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

/** Tüm üyeleri getir */
app.get("/todo",(req,res)=>{
        Todo.find({},(err,result)=>{
            if(!err){
                res.json(result);
                console.log(result);
            }
        })
});
/** Yeni üye oluşturulurken kullanılan  */
app.post("/todo",(req,res)=>{
    const newUser = new Todo({
        email : req.body.email,
        password : req.body.password,
        pendings : [],
        inProgress : [],
        done : []
    });
    newUser.save((err)=>{
        console.log(err);
    });
    res.json(`${req.body.email} yeni kişisi oluşturuldu!`);

});
/** Mail adresine göre getir */
app.get("/todo/:email",(req,res)=>{
        Todo.findOne({email : req.params.email },(err,result)=>{
            if(!err){
                console.log(result);
                res.json(result)
            }
        })
});
/* Kullanıcı giriş yaptıktan sonra görev eklemek istediğinde kullanılan func. */
app.patch("/todo/:email",(req,res)=>{
    Todo.findOneAndUpdate({
        email : req.params.email
    },{
        $push : {
            pendings : req.body
        }
    },(err,result)=>{
        if(!err){
            res.json(`${req.params.email} kişisine todo eklendi!`);
        }
    })
});
/* update işlemleri için */ 
app.put("/todo/:email",(req,res)=>{
    Todo.findOneAndUpdate({
        email : req.params.email
    },{
        $set : req.body
    },(err,result)=>{
        if(!err){
            res.json(`${req.params.email} update işlemi başarılı!`);
        }
        console.log(result);
    })
});


app.delete("/todo/:email",(req,res)=>{
    Todo.deleteOne({
        email : req.params.email
    },(err,result)=>{
        if(!err){
            res.json(`${req.params.email} update işlemi başarılı!`);
        }
        console.log(err);
    })
})

app.listen("1234",()=>{
    console.log("Listening port :1234");
})


/*Todo.update({
        //conditions
        email : req.params.email
    },{ 
        $set : req.body
    },(err,result)=>{
        if(!err){
            console.log(result);
        }
    })*/