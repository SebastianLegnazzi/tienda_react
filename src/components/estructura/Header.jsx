import React, { Component } from 'react'
import '../../assets/css/header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a href="../../index.php" className="navbar-brand losadef text-white">
                        Losadef
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample03">
                        <ul className="navbar-nav me-auto mb-2 m-2 mb-sm-0">
                            <li><a href="../../index.php" role="button" className="px-2 mx-1 btn btn-lg btn-outline-light">Home</a></li>
                        </ul>

                        <div className="text-end d-flex align-items-center">
                  <button type='button' className='btn btn-lg btn-outline-light me-2' onclick="cerrarSesion()">SALIR</button>
                  <a href='../sesion/IniciarSesion.php' className='btn btn-lg btn-outline-light me-2'>INGRESAR</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
