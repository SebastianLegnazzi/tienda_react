import Modal from 'react-bootstrap/Modal';
import '../../../assets/css/modalDetalle.css';
import axios from 'axios';

//Modulo de modal de detalle
export const ModalDetalle = ({ show, handleClose, producto }) => {

    //funcion que agrega al carrito el producto
    const agregarCarrito = (e) =>{
        e.preventDefault();
        let cantProducto = document.getElementById('cantidad_input').value;



        
        //SEGUIR CON LA CONSULTA PARA ALMACENAR EN EL CARRITO EL PRODUCTO




    }

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header className="bg-dark text-light border-1 border-secondary justify-content-center">
                <Modal.Title className='fs-1'>Detalle del producto</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <div>
                    <div className='row'>
                        <div id="content__foto__detalle" className="col-md-4">
                            <img id="foto__detalle" className="img-thumbnail" src={producto.urlImagen} alt={producto.proNombre} />
                        </div>
                        <div id="content__info__detalle" className="col mt-sm-3">
                            <h3 id="nombre__detalle">{producto.proNombre}</h3>
                            <p id="descripcion__detalle">{producto.proDetalle}</p>
                            <p id="cantidad_detalle">Stock disponible: {producto.proCantStock}</p>
                        </div>
                    </div>
                    <div id="content__precio__detalle" className='mt-4'>
                        <p id="precio__detalle">Precio ${producto.proPrecio}</p>
                    </div>
                </div>
            </Modal.Body >
            <Modal.Footer className="bg-dark border-0">
                <form method="post" onSubmit={agregarCarrito} className="needs-validation">
                    <input type="text" name="idProducto" id="idProducto" className="d-none" />
                    <div>
                        <input type="number" name="ciCantidad" id="cantidad_input" max={producto.proCantStock} min="1" className="form-control" placeholder="Ingrese la cantidad que desea comprar" required />
                    </div>
                    <input className="btn btn-success me-2" type="submit" name="boton_enviar" id="boton_enviar" value="Agregar al Carrito" />
                    <button className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}>Cerrar</button>
                </form>
            </Modal.Footer>
        </Modal >
    )
}
