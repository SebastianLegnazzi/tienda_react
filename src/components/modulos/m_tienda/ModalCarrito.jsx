import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Global from '../Global';
import Swal from 'sweetalert2';

export const ModalCarrito = ({ show, handleClose }) => {

    /*===================== Modal Detalle Carrito =====================*/ 
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header className="bg-dark text-light border-1 border-secondary justify-content-center">
                <Modal.Title className='fs-1'>Detalle Carrito</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <div>
                    <table id="lista__carrito" className="table table-dark">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Eliminar</th>
                                <th className="d-none" id="idCompraEstado"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="col-md-2"><img src="" alt="" className="img-thumbnail" /></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="d-none"></td>
                                <td><a href="#" className="eliminar_producto_carrito"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3 text-white" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg></a></td>
                            </tr>
                        </tbody>
                    </table>
                    <p id="total-Compra"></p>
                </div>
            </Modal.Body >
            <Modal.Footer className="bg-dark border-0">
                <button className="btn btn-success me-2" >Comprar</button>
                <button className="btn btn-danger" onClick={handleClose}>Cerrar</button>
            </Modal.Footer>
        </Modal >
    )
}