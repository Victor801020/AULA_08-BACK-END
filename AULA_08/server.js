const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const BancoDeDados = [
    {
        "id": 1,
        "usuario": "Erika Ramos",
        "totalReceitas": 2500,
        "totalDespesas": 1200,
        "saldoAtual": 1300,
        "status": "Limpo"
    },
    {
        "id": 2,
        "usuario": "Lucas Andrade",
        "totalReceitas": 1500,
        "totalDespesas": 2200,
        "saldoAtual": -700,
        "status": "Endividado"
    },
    {
        "id": 3,
        "usuario": "Camila Rocha",
        "totalReceitas": 1800,
        "totalDespesas": 1800,
        "saldoAtual": 0,
        "status": "No Limite"
    }
];

app.get('/usuarios', (req, res) => {
    return res.status(200).json(BancoDeDados);
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuarioEncontrado = BancoDeDados.find(u => u.id === parseInt(id));
    if (!usuarioEncontrado) {
            return res.status(404).json({ erro: `Usuário com ID ${id} não foi encontrado.` });
        }
    res.status(200).json(usuarioEncontrado);
});

app.post('/transacoes', (req, res) => {
    const { valor, tipo } = req.body;
    if (!valor || (tipo !== 'receita' && tipo !== 'despesa')) {
        return res.status(400).json({ erro: "A transação deve ter um valor positivo e tipo 'receita' ou 'despesa'." });
    }
    res.status(201).json({ idTransacao: Date.now(), valor, tipo });
});

app.listen(PORT, () => {
    console.log(`Servidor ativo em http://localhost:${PORT}`);
});
