const { users } = require('./models');
const express = require('express');
const bcrypt = require('bcryptjs');
const validateToken = require('./middlewares/auth');
const jwt = require('jsonwebtoken');
const sendEmail = require('./middlewares/nodemailer');

const app = express();

// middlewares
app.use(express.json());

app.post('/api/v1/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await users.findOne({ where: { email: email } });

        // Comprobar que exista un usuario con el correo ingresado
        if (user) {
            // DesEncryptar la contraseña para comparar
            bcrypt.compare(password, user.password, function (err, resp) {
                if (err || resp === false) {
                    res.status(401).json({ message: "Las credenciales no son correctas" });
                } else {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name
                    },
                        process.env.JWT_SECRET, { expiresIn: '3m' })
                    res.cookie('access_token', token, {
                        expires: new Date(Date.now() + 180000)
                    }).json({ message: "Has iniciado sesión correctamente"});
                }
            });
        } else {
            res.status(401).json({ message: "No existe ese usuario" });
        }
    } catch (error) {
        console.log(error);
    }
});



app.use(validateToken);

// Esta aqui para enviar el email sin necesidad de logearse,
// por eso esta antes del validateToken
app.post('/api/v1/send-email', (req, res) => {
    sendEmail();
    res.json({
        message: "El correo se ha enviado satisfactoriamente"
    })
})

app.get('/', (req, res) => {
    res.send('hola mundo');
})

// Todas las operaciones que vienen de DB son asincronas
app.get('/api/v1/users', async (req, res) => {
    console.log(users);
    const Users = await users.findAll();
    res.json(
        {
            "results": [Users]
        }
    );
})

app.get('/api/v1/users/:id', async (req, res) => {
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

app.post('/api/v1/users', async (req, res) => {
    let { first_name, last_name, email, active, token, password } = req.body;

    // Encriptar la contraseña de los nuevos usuarios
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    const user = await users.create(
        {
            first_name,
            last_name,
            email,
            active,
            token,
            password: passwordEncrypted,
            created_at: new Date(),
            updated_at: new Date()
        }
    )
    res.json(user);
})

app.put('/api/v1/users/:id', async (req, res) => {
    let { first_name, last_name, email, active, token, password } = req.body;
    const userId = req.params.id;
    const user = await users.update(
        {
            first_name,
            last_name,
            email,
            active,
            token,
            password,
            updated_at: new Date()
        },
        {
            returning: true,
            where: { id: userId }
        }
    );
    res.json(user);
})

app.delete('/api/v1/users/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await users.destroy({ where: { id: userId } });
    res.json({
        message: "Se ha eliminado el registro correctamente",
        user
    });
});



app.listen(8000, () => {
    console.log('Has iniciado el server en el puerto 8000');
})
