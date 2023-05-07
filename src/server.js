const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();

// Configuración de bodyParser y cors
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a la base de datos
const config = {
  user: 'usuarioRegistroAlquileres',
  password: '123456789',
  server: 'localhost',
  database: 'RegistroAlquileres',
  port: 1433,
  encrypt: false
};

// Ruta para manejar las solicitudes POST
app.post('/enviar-datos', (req, res) => {
  // Obtener los datos enviados en la solicitud
  const { nombre, telefono } = req.body;

  // Conectar a la base de datos y guardar los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = `INSERT INTO formulario (nombre, telefono) VALUES ('${nombre}', '${telefono}')`;
      request.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).send('Datos guardados correctamente');
        }
      });
    }
  });
});

// Ruta para manejar las solicitudes GET
app.get('/obtener-datos', (req, res) => {
  // Conectar a la base de datos y obtener los datos
  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error de servidor');
    } else {
      const request = new sql.Request();
      const query = 'SELECT * FROM formulario';
      request.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error de servidor');
        } else {
          res.status(200).json(result.recordset);
        }
      });
    }
  });
});



// Iniciar el servidor Node.js
const port = 3001;
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
