import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Global from '../Global';
import Swal from 'sweetalert2';
import React, { Component } from 'react'

export default class ModalCarrito extends Component {
    /*===================== Cargo variables =====================*/
    constructor(props) {
        super(props)
        this.state = {
            productosCarrito: [],
        }
    }

    /*===================== Modulo que busca el carrito Borrador =====================*/
    buscarCarritoBorrador = () => {
        this.setState({
            productosCarrito: []
        })
        axios.get(Global.urlApi + 'compra/usuario/' + sessionStorage.getItem('id')).then(       //Buscamos todas las compras del usuario
            res => {
                if (res.data.length > 0) {
                    res.data.forEach(compra => {
                        axios.get(Global.urlApi + 'compraestado/compra/' + compra.idCompra).then(       //Buscamos el estado de todas las compras
                            res => {
                                if (res.data[0].idCompraEstadoTipo === 1) {                //Comprobamos que este en estado "1" = "borrador"
                                    this.buscarCompraItem(res.data[0].idCompra)
                                }
                            });
                    });
                }
            });
    };

    /*===================== Modulo que busca el compra item para obtener productos =====================*/
    buscarCompraItem = (idCompra) => {
        axios.get(Global.urlApi + 'compraitem/compra/' + idCompra).then(
            res => {
                if (res.data.length > 0) {
                    res.data.forEach(compraItem => {
                        this.buscarProducto(compraItem.idProducto, compraItem.ciCantidad);
                    });
                }
            });
    }

    /*===================== Modulo que busca los productos para almacenarlos en la variable global =====================*/
    buscarProducto = (idProducto, cantidad) => {
        axios.get(Global.urlApi + 'producto/' + idProducto).then(
            res => {
                res.data[0].cantComprado = cantidad
                this.state.productosCarrito.push(res.data[0])
                this.setState({
                    productosCarrito: this.state.productosCarrito
                })
            });
    }

    render() {
        return (
            <Modal onShow={this.buscarCarritoBorrador} show={this.props.show} onHide={this.props.handleClose} size="xl">
                <Modal.Header className="bg-dark text-light border-1 border-secondary justify-content-center">
                    <Modal.Title className='fs-1'>Detalle Carrito</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {this.state.productosCarrito.length >= 1 ? (
                        <div>
                            <table className="table table-dark">
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
                                    {
                                        this.state.productosCarrito.map((producto, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className="col-md-2"><img src={producto.urlImagen} alt="" className="img-thumbnail" /></td>
                                                    <td>{producto.proNombre}</td>
                                                    <td>{producto.proDetalle}</td>
                                                    <td>{producto.proPrecio}</td>
                                                    <td>{producto.cantComprado}</td>
                                                    <td><a href="#" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3 text-white" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                    </svg></a></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <div className="text-light text-center">
                                <p>Si tarda mas de 3 segundos, posiblemente no tengas productos en el carrito!</p>
                                <strong className="me-2">Cargando...</strong>
                                <div className="spinner-border spinner-border-sm ml-auto" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                    )}
                </Modal.Body >
                <Modal.Footer className="bg-dark border-0">
                    <button className="btn btn-success me-2" >Comprar</button>
                    <button className="btn btn-danger" onClick={this.props.handleClose}>Cerrar</button>
                </Modal.Footer>
            </Modal >
        )
    }
}
