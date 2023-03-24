import { ModalDetalle } from './ModalDetalle';
import React, { useState } from 'react';

//Modulo de las tarjetas productos
export const Producto = ({ producto }) => {
    //Variables para mostrar u ocultar el modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);       //Funcion que muestra modal
    const handleShow = () => setShow(true);         //Funcion que oculta modal

    return (
        <React.Fragment>
            <div className="tarjetas-productos" >
                <a className="link-light" onClick={handleShow} role="button">
                    <div className="tarjeta-producto__imagen">
                        <img className="foto__producto" src={producto.urlImagen} alt="imagen Producto" />
                    </div>
                    <div className="tarjeta-producto__info">
                        <p className="nombre__producto">{producto.proNombre}</p>
                    </div>
                </a>
            </div>
            <ModalDetalle show={show} producto={producto} handleClose={handleClose} />
        </React.Fragment>
    )
}