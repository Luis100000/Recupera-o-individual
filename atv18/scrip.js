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




