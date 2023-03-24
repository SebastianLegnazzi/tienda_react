import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Global from '../Global';
import React, { Component } from 'react';
import ItemProducto from './ItemProducto'

export default class ModalCarrito extends Component {
    /*===================== Cargo State =====================*/
    constructor(props) {
        super(props)
        this.state = {
            productosCarrito: [],
            status: '',
        }
    }

    /*===================== Modulo que busca el carrito Borrador =====================*/
    buscarCarritoBorrador = () => {
        this.setState({
            productosCarrito: [],
            status: ''
        })
        let hayCarrito = false       //esta variable verifica que exista un carrito "borrador"
        axios.get(Global.urlApi + 'compra/usuario/' + sessionStorage.getItem('id')).then(       //Buscamos todas las compras del usuario
            res => {
                if (res.data.length > 0) {
                    var finBuscar = res.data.length;        //Limite de busqueda de compras en estado "borrador"
                    var i = 0               //index que funciona para buscar entre todas las compras que existen
                    res.data.forEach(compra => {
                        axios.get(Global.urlApi + 'compraestado/compra/' + compra.idCompra).then(       //Buscamos el estado de todas las compras
                            res => {
                                if (res.data[0].idCompraEstadoTipo === 1) {                //Comprobamos que este en estado "1" = "borrador"
                                    hayCarrito = true;
                                    this.buscarCompraItem(res.data[0].idCompra);
                                } else {
                                    i++
                                }
                                if (!hayCarrito && finBuscar <= i) {
                                    this.setState({
                                        productosCarrito: [0],
                                        status: 'none'
                                    })
                                }
                            });
                    });
                } else {
                    this.setState({
                        productosCarrito: [0],
                        status: 'none'
                    })
                }
            });
    };

    /*===================== Modulo que busca el compra item para obtener productos =====================*/
    buscarCompraItem = (idCompra) => {
        axios.get(Global.urlApi + 'compraitem/compra/' + idCompra).then(
            res => {
                res.data.forEach(compraItem => {
                    this.buscarProducto(compraItem.idProducto, compraItem.ciCantidad, compraItem);
                });
            });
    };

    /*===================== Modulo que busca los productos para almacenarlos en la variable global =====================*/
    buscarProducto = (idProducto, cantidad, compraItem) => {
        axios.get(Global.urlApi + 'producto/' + idProducto).then(
            res => {
                res.data[0].cantComprado = cantidad
                res.data[0].compraItem = compraItem
                this.state.productosCarrito.push(res.data[0])
                this.setState({
                    productosCarrito: this.state.productosCarrito,
                    status: 'success',
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
                        this.state.status == "success" ? (
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
                                            this.state.productosCarrito.map((producto, i) => <ItemProducto key={i} producto={producto}/>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>
                                <div className="text-light text-center">
                                    <strong>No tienes productos en el carrito!</strong>
                                </div>
                            </div>
                        )
                    ) : (
                        <div>
                            <div className="text-light text-center">
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
