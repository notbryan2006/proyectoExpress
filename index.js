const express = require('express');
const pool = require('./db');

const app = express();

app.use(express.json());

// ================== RUTA INICIAL ==================
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// ================== USUARIOS ==================

// Obtener todos
app.get('/alumnos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM alumno');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Obtener por ID
app.get('/alumnos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validación
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser numérico' });
    }

    const resultado = await pool.query(
      'SELECT * FROM alumno WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json(resultado.rows[0]);

  } catch (error) {
    console.error('Error al consultar alumno:', error);
    res.status(500).json({ error: 'Error al obtener el alumno' });
  }
});

// ================== MATERIAS ==================

// Obtener todas
app.get('/materias', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM materia');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar materias:', error);
    res.status(500).json({ error: 'Error al obtener las materias' });
  }
});

// Obtener por ID
app.get('/materias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validación
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser numérico' });
    }

    const resultado = await pool.query(
      'SELECT * FROM materia WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json(resultado.rows[0]);

  } catch (error) {
    console.error('Error al consultar materia:', error);
    res.status(500).json({ error: 'Error al obtener la materia' });
  }
});


// ================== SERVIDOR ==================
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
