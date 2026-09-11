const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bem-vindo ao Sistema Escolar!');
});

app.get('/sobre', (req, res) => {
    res.send('Este projeto é uma aplicação de gerenciamento escolar desenvolvida com Node.js e Express.');
});

app.get('/equipe', (req, res) => {
    res.send('Nossa equipe é formada por desenvolvedores focados em soluções educacionais.');
});

app.get('/contato', (req, res) => {
    res.send('Para suporte ou dúvidas, envie um e-mail para suporte@sistemaescolar.com.');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
