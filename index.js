const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/registrar-reserva', (req, res) => {
  const datosReserva = req.body;
  // Aquí guardarías los datos de la reserva en la base de datos
  // y enviarías el correo automático si es necesario
  console.log(datosReserva);
  res.status(200).json({ message: 'Reserva registrada correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
