const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GOOGLE_ACOUNT,
        pass: process.env.GOOGLE_SECRET_APP
    }
});

const mailOptions = {
    from: process.env.GOOGLE_ACOUNT,
    to: 'juans.correa@talentum.edu.co',
    subject: 'testing nodeMailer',
    text: 'Este es un mensaje de prueba, con la ayuda del paquete de nodemailer'
}

const senEmail = () => {
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err.message);
        }else{
            console.log(info.response);
        }
    });
}

module.exports = senEmail;