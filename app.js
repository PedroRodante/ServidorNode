var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const DBPATH = require ='db_SlowFu.db';
var db = new sqlite3.Database(DBPATH);//Abre o banco
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.send("CHEGUEI!!");
});

app.post("/dado", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    console.log("Recebi um dado");
    console.log(req.body.dado);
    res.send("JSON RECEBIDO!");
});

app.get("/todos_usuarios", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    console.log("Estou aqui!");
    db.all(`SELECT * FROM Usuarios`, [], (err, rows) =>
    {
        if(err)
        {
            console.log("aqui 2");
            res.send(err);
        }
        console.log("linhas: " + rows);
        res.send(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor Rodante com a porta ${port}`)
});