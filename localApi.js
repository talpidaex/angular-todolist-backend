const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/todo", (req, res) => {
    fs.readFile("db.json",(err,data)=>{
            if(!err){
                res.send(data);
            }
    })
})

var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json());

/* Post işlemleri */
app.post("/todo", urlencodedParser, (req, res) => {
    fs.readFile("db.json", (err, data) => {
        var json = JSON.parse(data)
        json.pendings.push(req.body)
        fs.writeFile("db.json", JSON.stringify(json), (err) => {
            console.log(err);
        })
    })
    res.send(req.body);
})
/* Post işlemleri */
app.put("/todo", (req, res) => {
    console.log(req.body);
    fs.writeFile("db.json", JSON.stringify(req.body), (err) => {
        console.log(err);
    });
    res.json({message : "İşlem başarılı"})
})
/* Delete işlemi yerinde put çağırılıyor! */
var port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Port : 3001");
})