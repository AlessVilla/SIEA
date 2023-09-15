const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configurar el middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

app.post('/reservar', (req, res) => {
  // Procesar los datos recibidos y realizar cálculos aritméticos aquí
  const formData = req.body;
  // Realizar los cálculos necesarios con los datos recibidos

  // Enviar el correo automáticamente después de los cálculos
  enviarCorreo(formData);

  // Enviar una respuesta al cliente, por ejemplo, un mensaje de éxito
  res.send('¡Reserva exitosa!');
});

function enviarCorreo(formData) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Accede a la variable de entorno para el usuario
      pass: process.env.EMAIL_PASS, // Accede a la variable de entorno para la contraseña
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // El remitente
    to: formData.email, // El destinatario, toma el email del formulario
    subject: 'Confirmación de reserva',
    text: 'Gracias por reservar el espacio. Tu reserva ha sido confirmada.', // El mensaje del correo
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
