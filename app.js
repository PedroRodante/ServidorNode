var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.get("/", function(req,res){
    res.header("Accsess-Control-Allow-Origin","*");
    res.send("CHEGUEI FILHO DA P***");
});

app.listen(port, () => {
    console.log('Servidor Rodante com a porta ${port}')
});