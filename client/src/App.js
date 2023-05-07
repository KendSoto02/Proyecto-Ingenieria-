import React, { useState } from 'react';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const enviarDatos = () => {
    fetch('http://localhost:3001/enviar-datos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, telefono })
    })
    .then(response => response.text())
    .then(result => alert(result))
    .catch(error => console.log(error));
    setNombre('')
    setTelefono('')
  }

  return (
    <div className="App">
      <h1>Formulario</h1>
      <label>Nombre:</label>
      <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
      <label>Teléfono:</label>
      <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} />
      <button onClick={enviarDatos}>Enviar</button>
    </div>
  );
}

export default App;
