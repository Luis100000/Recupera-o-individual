const express = require('express');
const app = express();
app.use(express.json());

let usuarios = [
    { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
    { id: 2, nome: 'Bruno Costa', email: 'bruno@email.com' }
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(item => item.id === id);
    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.json(usuario);
});

app.post('/usuarios', (req, res) => {
    const novoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
        nome: req.body.nome,
        email: req.body.email
    };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(item => item.id === id);
    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    res.json(usuario);
});

app.patch('/usuarios/:id/nome', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(item => item.id === id);
    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    usuario.nome = req.body.nome;
    res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuarioExiste = usuarios.some(item => item.id === id);
    if (!usuarioExiste) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    usuarios = usuarios.filter(item => item.id !== id);
    res.json({ mensagem: 'Usuário removido' });
});

app.listen(3000, () => {
    console.log('Servidor de Usuários rodando na porta 3000');
});



const express = require('express');
const app = express();
app.use(express.json());

let tarefas = [
    { id: 1, nome: 'Estudar Node.js', concluida: false },
    { id: 2, nome: 'Comprar pão', concluida: true }
];

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(item => item.id === id);
    if (!tarefa) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
});

app.post('/tarefas', (req, res) => {
    const novaTarefa = {
        id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
        nome: req.body.nome,
        concluida: req.body.concluida || false
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(item => item.id === id);
    if (!tarefa) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
    tarefa.nome = req.body.nome;
    tarefa.concluida = req.body.concluida;
    res.json(tarefa);
});

app.patch('/tarefas/:id/nome', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(item => item.id === id);
    if (!tarefa) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
    tarefa.nome = req.body.nome;
    res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefaExiste = tarefas.some(item => item.id === id);
    if (!tarefaExiste) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
    tarefas = tarefas.filter(item => item.id !== id);
    res.json({ mensagem: 'Tarefa removida' });
});

app.listen(3001, () => {
    console.log('Servidor de Tarefas rodando na porta 3001');
});
