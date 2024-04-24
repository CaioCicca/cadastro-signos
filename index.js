const express =  require('express');
const { Pool} = require('pg');

const app = express();
const port= 4000;

app.use(express.json());

const poll = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cadastro_signo',
    password: 'azul0404',
    port : 7007
});

app.delete('/cadastros/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await poll.query('DELETE FROM cadastros WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'Sucesso ao deletar'}); 
    } catch (error) {
        console.error('Erro ao criar usuario', error);
        res.status(500).send({mensagem: 'Erro ao criar usuario'});
    }
})

app.put('/cadastros/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {nome, sobrenome, aniversario, email, idade, signo} = req.body;
        await poll.query('UPDATE cadastros SET nome = $1, sobrenome = $2, aniversario = $3, email = $4, idade = $5, signo = $6 WHERE id = $7', [nome, sobrenome, aniversario, email, idade, signo, id]);
        res.status(200).send({mensagem: 'Sucesso ao atualizar'});
    } catch (error) {
        console.error('Erro ao criar usuario', error);
        res.status(500).send({mensagem: 'Erro ao criar usuario'});
    }
})

app.post('/cadastros', async (req, res) => {
    const idade = () => {
        const aniversario = req.body.aniversario;
        const dataUsuario = new Date(aniversario);
        const hoje = new Date();
        const mesUsuario = dataUsuario.getMonth();
        const anoUsuario = dataUsuario.getFullYear();

        if (mesUsuario >= hoje.getMonth()){
            return hoje.getFullYear() - anoUsuario - 1;
        } else {
            return hoje.getFullYear() - anoUsuario;
        }
    }

    const signo = () => {
        const aniversario = req.body.aniversario;
        const data = new Date(aniversario);
        const dia = data.getDate() + 1;
        const mes = data.getMonth() + 1;
    
        if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 19)) {
            return 'Áries';
        } else if ((mes == 4 && dia >= 20) || (mes == 5 && dia <= 20)) {
            return 'Touro';
        } else if ((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) {
            return 'Gêmeos';
        } else if ((mes == 6 && dia >= 21) || (mes == 7 && dia <= 20)) {
            return 'Câncer';
        } else if ((mes == 7 && dia >= 21) || (mes == 8 && dia <= 22)) {
            return 'Leão';
        } else if ((mes == 8 && dia >= 23) || (mes == 9 && dia <= 22)) {
            return 'Virgem';
        } else if ((mes == 9 && dia >= 23) || (mes == 10 && dia <= 22)) {
            return 'Libra';
        } else if ((mes == 10 && dia >= 23) || (mes == 11 && dia <= 21)) {
            return 'Escorpião';
        } else if ((mes == 11 && dia >= 22) || (mes == 12 && dia <= 19)) {
            return 'Sagitário';
        } else if ((mes == 12 && dia >= 20) || (mes == 1 && dia <= 18)) {
            return 'Capricórnio';
        } else if ((mes == 1 && dia >= 19) || (mes == 2 && dia <= 18)) {
            return 'Aquário';
        } else if ((mes == 2 && dia >= 19) || (mes == 3 && dia <= 20)) {
            return 'Peixes';
        } else {
            return 'Erro';
        }
    }

    function limparData() {
        const aniversario = req.body.aniversario;
        const data = new Date(aniversario);
    
        const dia = data.getUTCDate();
        const mes = data.getUTCMonth() + 1;
        const ano = data.getUTCFullYear();
    
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }

    try {
        const {nome, sobrenome, email} = req.body;
        const signoResposta= signo();
        const idadeResposta = idade();
        const aniversarioFormatado = limparData();
        await poll.query('INSERT INTO cadastros (nome, sobrenome, aniversario, email, idade, signo) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobrenome, aniversarioFormatado, email, idadeResposta, signoResposta]);
        res.status(201).send({mensagem: 'Sucesso ao criar'})
    } catch (error) {
        console.error('Erro ao criar usuario', error);
        res.status(500).send('Erro ao criar usuario');
    }
});

app.get('/cadastros/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await poll.query('SELECT * FROM cadastros WHERE id = $1',[id]);
        res.json({
            cadastros: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter cadastro');
        res.status(500).send('Erro ao obter cadastro');
    }
});

app.get('/cadastros', async (req, res) => {
    try {
        const resultado = await poll.query('SELECT * FROM cadastros');
        res.json({
            total: resultado.rowCount,
            cadastros: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos os cadastros');
        res.status(500).send('Erro ao obter todos os cadastros');
    }
});

app.get('/', (req, res) => {
    res.send('Server OK');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});