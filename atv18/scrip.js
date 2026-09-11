const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [
  { id: 1, email: 'ana@escola.com', senha: '1234', perfil: 'aluna' },
  { id: 2, email: 'carlos@escola.com', senha: 'abcd', perfil: 'professor' }
];

const sessoes = [];

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'E-mail ou senha incorretos' });
  }

  const token = `token-${usuario.id}-${Date.now()}`;
  sessoes.push({ token, usuarioId: usuario.id });

  res.json({ mensagem: 'Login realizado', token, perfil: usuario.perfil });
});

function autenticar(req, res, next) {
  const token = req.headers['authorization'];
  const sessao = sessoes.find(s => s.token === token);

  if (!sessao) {
    return res.status(401).json({ mensagem: 'Acesso negado' });
  }

  req.usuarioId = sessao.usuarioId;
  next();
}

app.get('/perfil', autenticar, (req, res) => {
  const usuario = usuarios.find(u => u.id === req.usuarioId);
  res.json({ email: usuario.email, perfil: usuario.perfil });
});

app.get('/avisos', autenticar, (req, res) => {
  res.json([
    { id: 1, titulo: 'Reunião de responsáveis' },
    { id: 2, titulo: 'Prova de Matemática' }
  ]);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});




<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>

  <input type="email" id="email" placeholder="E-mail">
  <input type="password" id="senha" placeholder="Senha">
  <button id="entrar">Entrar</button>

  <p id="resultado"></p>

  <script>
    document.querySelector('#entrar').addEventListener('click', async () => {
      const email = document.querySelector('#email').value;
      const senha = document.querySelector('#senha').value;

      try {
        const resposta = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
          document.querySelector('#resultado').textContent = dados.mensagem;
          return;
        }

        localStorage.setItem('token', dados.token);
        document.querySelector('#resultado').textContent = `Bem-vindo, perfil: ${dados.perfil}`;
      } catch (erro) {
        document.querySelector('#resultado').textContent = 'Erro ao conectar com o servidor.';
      }
    });
  </script>
</body>
</html>