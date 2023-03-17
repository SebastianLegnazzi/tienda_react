import React, { Component } from 'react'
import logCarritoCompras from '../../assets/img/carritoCompra.png'

export default class Tienda extends Component {
    render() {
        return (
            <div className="">
                <div className="container">
                    <h1 className="text-center text-white">Productos</h1>
                    <hr />
                </div>
                {/*===================== Modal - Producto =====================*/}
                <div className="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h1 className="modal-title text-white" id="exampleModalToggleLabel">Detalle del Producto</h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body row">
                                <div id="content__foto__detalle" className="col-md-4">
                                    <img id="foto__detalle" className="img-thumbnail" src="" alt="" />
                                </div>
                                <div id="content__info__detalle" className="col">
                                    <h3 id="nombre__detalle"></h3>
                                    <p id="descripcion__detalle"></p>
                                    <p id="cantidad_detalle"></p>
                                </div>
                            </div>
                            <div id="content__precio__detalle">
                                <p id="precio__detalle"></p>
                            </div>
                            <div className="modal-footer">
                                <form method="post" action="../Accion/accionRegistrarse.php" className="needs-validation" novalidate>
                                    <input type="text" name="idProducto" id="idProducto" className="d-none" />
                                    <div>
                                        <input type="number" name="ciCantidad" id="cantidad_input" min="1" className="form-control" placeholder="Ingrese la cantidad que desea comprar" required />
                                        <div className="invalid-feedback mb-1">
                                            No hay stock suficiente!
                                        </div>
                                        <div className="valid-feedback">
                                            Correcto!
                                        </div>
                                    </div>
                                    <input className="btn btn-success me-2" type="submit" name="boton_enviar" id="boton_enviar" value="Agregar al Carrito" />
                                    <button className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/*===================== Modal - Detalle de compra =====================*/}
                <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div className="modal-dialog modal-xl bg-dark">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h1 className="modal-title text-white" id="exampleModalToggleLabel">Carrito</h1>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body row">
                                <div>
                                    <table id="lista__carrito" className="table table-dark">
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Eliminar</th>
                                            <th className="d-none" id="idCompraEstado"></th>
                                        </tr>
                                        <tr>
                                            <td className="col-md-2"><img src="' . $compraItem->getObjProducto()->getUrlImagen() . '" className="img-thumbnail" /></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="d-none"></td>
                                            <td><a href="#" className="eliminar_producto_carrito"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3 text-white" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                            </svg></a></td>
                                        </tr>
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
                <div className="container d-flex align-items-center justify-content-center">
                    <div id="content__filter" className="col-md-8 text-center">
                        <input type="text" name="filtrador" id="filtrador" className="col-md-6" placeholder="Buscador" onkeyup="filtrar(this.value)" />
                    </div>
                    <div id="content__carrito" className="row justify-content-end">
                        <a className="link-light col-md-3" data-bs-toggle="modal" href="#exampleModalToggle2" role="button">
                            <img id="logo_carrito" src={logCarritoCompras} className="img-fluid" alt="Logo de Carrito" />
                        </a>
                    </div>
                </div>
                {/*===================== Tarjetas de productos =====================*/}
                <div id="content__productos" className="text-center">
                    <div className="tarjetas-productos" onclick="verDetalle(this)">
                        <a className="link-light" data-bs-toggle="modal" href="#exampleModalToggle1" role="button">
                            <div className="tarjeta-producto__imagen">
                                <img className="foto__producto" src="' . $producto->getUrlImagen() . '" alt="" />
                            </div>
                            <div className="tarjeta-producto__info">
                                <p className="nombre__producto"></p>
                                <span className="descripcion__producto d-none"></span>
                                <span className="precio__producto d-none"></span>
                                <span className="stock d-none"></span>
                                <span className="idProducto_Producto d-none"></span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
