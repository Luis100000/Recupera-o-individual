const express = require('express');
const app = express();

const usuarios = ['Ana', 'Bruno', 'Carlos'];
const tarefas = ['Estudar Express', 'Fazer exercícios', 'Revisar código'];
const reservas = ['Mesa 1', 'Mesa 4', 'Sala de Reunião'];
const turmas = ['Turma A', 'Turma B', 'Turma C'];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.get('/reservas', (req, res) => {
    res.json(reservas);
});

app.get('/status', (req, res) => {
    res.send('Sistema ativo');
});

app.get('/turmas', (req, res) => {
    res.json(turmas);
});

app.listen(3000, () => {
    console.log('Servidor rodando');
});
