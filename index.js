const express = require('express');
const app = express();

// Ruta principal
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Nueva ruta /usuario
app.get('/usuario', (req, res) => {
  const usuario = {
    id: 1,
    nombre: 'Bryan',
    rol: 'Administrador'
  };

  res.json(usuario);
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});