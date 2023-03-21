import React, { Component } from 'react'
import '../../assets/css/header.css';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {

    render() {
        return (
            <div className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <a href="../../index.php" className="navbar-brand losadef text-white">
                        Losadef
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample03">
                        <ul className="navbar-nav me-auto mb-2 m-2 mb-sm-0">
                            <li><NavLink to="/" className="px-2 mx-1 btn btn-lg btn-outline-light">Home</NavLink></li>
                            <li><NavLink to="/tienda" className="px-2 mx-1 btn btn-lg btn-outline-light">Tienda</NavLink></li>
                        </ul>
                        <ul className="navbar-nav mb-2 m-2 mb-sm-0">
                            <li><NavLink to="/login" className="px-2 mx-1 btn btn-lg btn-outline-light">Iniciar Sesion</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
