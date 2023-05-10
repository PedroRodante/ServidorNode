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

app.post("/cadastro_usuario", function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    console.log("Recebi um dado");

    let nome = (req.body.nome);
    let senha = (req.body.senha);
    let email = (req.body.email);
    let telefone = parseInt(req.body.telefone);

    let sql = `SELECT * FROM Usuarios WHERE email="${email}"`;
    db.all(sql, [], (err, rows) =>
    {
        if (err) {
            res.send(err);
            console.log(err);
        } else if (rows.length > 0) {
            res.send("Email já existe");
            console.log("Email já existe!");
        } else {
            sql = `INSERT INTO Usuarios (nome, senha, email, telefone) VALUES ("${nome}", "${senha}", "${email}", "${telefone}")`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Usuário adicionado");
                    console.log("Usuário adicionado!");
                }
            });
        }
    });
});



app.get("/login", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query);
    console.log("Realizando login");
    
    let email = req.query.email;
    let senha = req.query.senha;

    let sql = `SELECT * FROM Usuarios WHERE email = "${email}"`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.send(err);
        }
        if (rows.length === 0) {
            console.log("Usuário não encontrado.");
            res.send("Usuário não encontrado.");
        } else {
            console.log("Usuário encontrado.");
            if (senha === rows[0].senha) {
                console.log("Senha correta.");
                res.send("Login realizado com sucesso!");
            } else {
                console.log("Senha incorreta.");
                res.send("Senha incorreta.");
            }
        }
    });
});

app.get("/todos_usuarios", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    console.log("Atualizei os Usuários");
    db.all(`SELECT * FROM Usuarios`, [], (err, rows) =>
    {
        if(err)
        {
            console.log("Deu errinho na att");
            res.send(err);
        }
        console.log("Acesse-os em: /todos_usuarios");
        res.send(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor Rodante na porta ${port}`)
});