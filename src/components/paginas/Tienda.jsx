import React, { Component } from 'react';
import logCarritoCompras from '../../assets/img/carritoCompra.png';
import '../../assets/css/tienda.css';
import Productos from '../modulos/m_productos/Productos'
import { Carrito } from '../modulos/m_tienda/Carrito';

export default class Tienda extends Component {

    render() {

        /*===================== Pagina =====================*/
        return (
            <div className="">
                <div className="container">
                    <h1 className="text-center text-white">Productos</h1>
                    <hr />
                </div>
                {/*===================== Modal - Detalle de compra =====================*/}
                <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
                    <div className="modal-dialog modal-xl bg-dark">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h1 className="modal-title text-white" id="exampleModalToggleLabel">Carrito</h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body row">
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
                                </div>
                                <span id="total-Compra"></span>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success me-2" id="iniciar_compra">Comprar</button>
                                <button className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*===================== Pagina =====================*/}
                <div className="d-flex align-items-center justify-content-center">
                    <div id="content__filter" className="col-md-6 text-center">
                        <input type="text" name="filtrador" id="filtrador" className="col-md-6" placeholder="Buscador" />
                    </div>
                    {/*===================== Carrito =====================*/}
                    <Carrito logCarritoCompras={logCarritoCompras} />
                </div>
                    {/*===================== Productos =====================*/}
                    <Productos />

            </div>
        )
    }
}
