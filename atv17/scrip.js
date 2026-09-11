const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let usuarios = [];

app.post('/usuarios', (req, res) => {
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: req.body.nome,
        email: req.body.email
    };
    usuarios.push(novoUsuario);
    res.status(201).json({ mensagem: `Usuário ${novoUsuario.nome} cadastrado!` });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));


