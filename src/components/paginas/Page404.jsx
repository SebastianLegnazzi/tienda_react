import React, { Component } from 'react'
import '../../assets/css/page404.css'

export default class Page404 extends Component {
  render() {
    /*======= Pagina de Error cuando se ingresa a una URL que no existe =======*/ 
    return (
      <div className = "bg-danger rounded contenedor d-flex justify-content-center align-items-center" >
        <p className="text-white">Pagina no encontrada!</p>
      </div>
    )
  }
}
