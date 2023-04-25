var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
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
    console.log(req.dado);
    res.send("JSON RECEBIDO!");
});

app.listen(port, () => {
    console.log(`Servidor Rodante com a porta ${port}`)
});

