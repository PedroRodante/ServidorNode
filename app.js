var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const DBPATH = (require = "db_SlowFu.db");
var db = new sqlite3.Database(DBPATH); //Abre o banco

//Variaveis locais:
let email;
let telefone;
let nome;
let senha;
let local;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("CHEGUEI!!");
});

app.post("/cadastro_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  console.log("Recebi um dado");

  nome = req.body.nome;
  senha = req.body.senha;
  email = req.body.email;
  telefone = parseInt(req.body.telefone);

  let sql = `SELECT * FROM Usuarios WHERE email="${email}"`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("Erro" + err);
      res.send(err);
    } else if (rows.length > 0) {
      console.log("Email já existe!");
      res.send("Email já existe");
    } else {
      sql = `INSERT INTO Usuarios (nome, senha, email, telefone) VALUES ("${nome}", "${senha}", "${email}", "${telefone}")`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log("Usuário adicionado!");
          res.send("Usuário adicionado");
        }
      });
    }
  });
});

app.get("/login", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  console.log("Realizando login");

  email = req.query.email;
  senha = req.query.senha;

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

app.get("/todos_usuarios", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Atualizei os Usuários");
  db.all(`SELECT * FROM Usuarios`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho na att");
      res.send(err);
    }
    console.log("Acesse-os em: /todos_usuarios");
    res.send(rows);
  });
});

app.post("/cadastro_post", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  console.log("Recebi um dado");

  let titulo = req.body.titulo;
  let valor = parseFloat(req.body.valor);
  let tipo = req.body.tipo;
  let descricao = req.body.descricao;
  let data = parseFloat(req.body.data);
  local = req.body.local;

  sql = `INSERT INTO Posts (titulo, valor, tipo, descricao, data, local, email, telefone) VALUES ("${titulo}", "${valor}", "${tipo}", "${descricao}", "${data}", "${local}", "${email}", "${telefone}")`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Post adicionado!");
      res.send("Post adicionado");
    }
  });
});

app.get("/posts_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Tentei pegar os posts de um usuário");
  console.log(req.body);
  console.log("Recebi um dado");

  db.all(`SELECT * FROM Posts WHERE email="${email}"`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho para puxar esses posts.");
      res.send(err);
    }
    console.log("Peguei os posts de um usuário.");
    res.send(rows);
  });
});

app.get("/todos_posts", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("Atualizei os Posts");
    db.all(`SELECT * FROM Posts`, [], (err, rows) => {
      if (err) {
        console.log("Deu errinho na att");
        res.send(err);
      }
      console.log("Acesse-os em: /todos_posts");
      res.send(rows);
    });
  });

app.listen(port, () => {
  console.log(`Servidor Rodante na porta ${port}`);
});
