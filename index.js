const { users } = require('./models');
const express = require('express');

const app = express();

// middlewares
app.get('/', (req, res) => {
    res.send('hola mundo');
})

// Todas las operaciones que vienen de DB son asincronas
app.get('/users', async (req, res) => {
    console.log(users);
    const Users = await users.findAll();
    res.json(
        {
            "results": [Users]
        }
    );
})

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const Users = await users.findOne(
        {
            where: {
                id: userId
            }
        });
    res.json(
        {
            Users
        }
    );
})

app.listen(8000, () => {
    console.log('Has iniciado el server en el puerto 8000');
})
