import React from 'react'
import { Link } from 'react-router-dom' // Importa Link desde react-router-dom

function Home() { // Nota: El nombre del componente debe empezar con mayúscula
  return (
    <div>
      hola
      <Link to='/login'>Prueba</Link> {/* Usa Link en lugar de link */}
    </div>
  )
}

export default Home