var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const DBPATH = (require = "db_SlowFu.db");
var db = new sqlite3.Database(DBPATH); //Abre o banco

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

  let nome = req.body.nome;
  let senha = req.body.senha;
  let email = req.body.email;
  let telefone = parseInt(req.body.telefone);

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

app.post("/alterar_dados_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um dado");
  console.log(req.body);

  let emailNovo = req.body.email;
  let nomeNovo = req.body.nome;
  let senhaNova = req.body.senha;
  let telefoneNovo = parseInt(req.body.telefone);
  let usuarioId = req.body.id;

  console.log("Usuario acionado com id: " + usuarioId);
  sql = `UPDATE Usuarios SET nome="${nomeNovo}", senha="${senhaNova}", email="${emailNovo}", telefone="${telefoneNovo}" WHERE id="${usuarioId}"`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Usuário atualizado!");
      sql = `SELECT * FROM Usuarios WHERE email="${emailNovo}"`;
      db.all(sql, [], (err, rows) => {
        res.send(rows);
      });
    }
  });
});

app.get("/login", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
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
        res.send("Login");
        telefone = rows[0].telefone;
        nome = rows[0].nome;
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

app.post("/dados_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Atualizei os Usuários");
  console.log(req.body);
  let emailCheck = req.body.email;
  console.log(emailCheck);

  db.all(
    `SELECT * FROM Usuarios WHERE email="${emailCheck}"`,
    [],
    (err, rows) => {
      if (err) {
        console.log("Deu errinho na att");
        res.send(err);
      }
      console.log("Acesse-os em: /dados_usuario");
      console.log(rows);
      res.send(rows);
    }
  );
});

app.post("/cadastro_post", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um post para adicionar!");
  console.log(req.body);

  let valor = req.body.valor;
  let tipo = req.body.tipo;
  let descricao = req.body.descricao;
  let data = req.body.data;
  let local = req.body.local;
  let email = req.body.email;
  let telefone  = req.body.telefone;
  let nome = req.body.nome;

  sql = `INSERT INTO Posts (valor, tipo, descricao, data, local, email, telefone, nome) VALUES ("${valor}", "${tipo}", "${descricao}", "${data}", "${local}", "${email}", "${telefone}", "${nome}")`;
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

app.post("/posts_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um dado:");
  console.log(req.body);
  console.log("Tentei pegar os posts de um usuário");

  let emailCheck = req.body.email;

  db.all(`SELECT * FROM Posts WHERE email="${emailCheck}"`, [], (err, rows) => {
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

app.post("/delete_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi um dado");
  console.log(req.body);
  let usuarioId = req.body.id; // Assume que o ID do usuário está na coluna "id"
  sql = `DELETE FROM Usuarios WHERE id="${usuarioId}"`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Usuário deletado PARA SEMPRE");
      res.send("Usuário deletado PARA SEMPRE!");
    }
  });
});

app.post("/delete_post_usuario", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi alguma coisa");

  let postID = parseInt(req.body.postID);

  db.all(`DELETE FROM Posts WHERE postID = ${postID}`, [], (err, rows) => {
    if (err) {
      console.log("Deu errinho na att");
      res.send(err);
    } else {
      console.log(`O post a seguir foi deletado: "${rows}"`);
      res.send(rows);
    }
  });
});

app.get("/sair", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Fui acionado");
  console.log("Saindo!");
  const response = {
    message: "Variáveis deletadas com sucesso!",
  };
  res.json(response);
  console.log("Deu tudo certo!");
});

app.listen(port, () => {
  console.log(`Servidor Rodante na porta ${port}`);
});
