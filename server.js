const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = 3000; // Puerto en el que se ejecutará el servidor

app.use(express.json());

// Ruta para recibir solicitudes de envío de correo
app.post('/enviar-correo', (req, res) => {
  const { emailOrganizadorReserva, asunto, mensaje } = req.body;

  // Configura el transporte SMTP para enviar correos
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'siea@aneiap.co',
      pass: 'alesvica'
    }
  });

  // Configura el correo
  const mailOptions = {
    from: 'siea@aneiap.co',
    to: emailOrganizadorReserva,
    subject: asunto,
    text: mensaje
  };

  // Envía el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo' });
      } else {
        console.log('Correo enviado con éxito:', info.response);
        res.status(200).json({ message: 'Correo enviado con éxito' });
      }      
  });
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
