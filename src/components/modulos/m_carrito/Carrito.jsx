import React, { useState } from 'react';
import ModalCarrito  from './ModalCarrito';

export const Carrito = ({ logCarritoCompras }) => {

    //Variables para mostrar u ocultar el modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /*===================== Carrito =====================*/
    return (
        <React.Fragment>
            <div className="col-md-1 justify-content-end">
                <a className="link-light col-md-3" onClick={handleShow} role="button">
                    <img src={logCarritoCompras} className="img-fluid col-4 col-md-8" alt="Logo de Carrito" />
                </a>
            </div>
            <ModalCarrito show={show} handleClose={handleClose} />
        </React.Fragment>
    )
}