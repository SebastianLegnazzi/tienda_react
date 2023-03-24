import React, { Component } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import Global from '../Global';

export default class ItemProducto extends Component {

    /*===================== Modulo que acciona borrar producto =====================*/
    borrarProducto = () => {
        Swal.fire({
            title: '¿Estás seguro de que desea eliminar este producto?',
            imageUrl: this.props.producto.urlImagen,
            imageHeight: 200,
            imageAlt: this.props.producto.proNombre,
            showDenyButton: true,
            input: 'range',
            inputLabel: 'Elija la cantidad de productos que desea eliminar del carrito',
            inputAttributes: {
                min: 1,
                max: this.props.producto.cantComprado,
                step: 1
            },
            inputValue: 1,
            confirmButtonText: 'Eliminar',
            denyButtonText: 'Cancelar',

        }).then((result) => {
            if (result.isConfirmed) {
                this.actualizadStock(result.value)
                this.borrarProdCarrito(result.value)
                Swal.fire({
                    icon: 'success',
                    title: 'El producto fue borrado del carrito!',       //Alerta de success
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(function () {
                    window.location.href = "/tienda";
                }, 1500);
            } else if (result.isDenied) {

            }
        })

    }

    /*===================== Modulo que suma el stock borrado del carrito nuvamente al producto =====================*/
    actualizadStock = (cantSumar) => {
        let stockActualizado = parseInt(this.props.producto.proCantStock) + parseInt(cantSumar)
        axios.put(Global.urlApi + 'producto', {
            idProducto: this.props.producto.idProducto,
            proNombre: this.props.producto.proNombre,
            proDetalle: this.props.producto.proDetalle,
            proCantStock: stockActualizado,
            proPrecio: this.props.producto.proPrecio,
            urlImagen: this.props.producto.urlImagen
        })
    }

    /*===================== Modulo que borra el producto del carrito =====================*/
    borrarProdCarrito = (cantBorrar) => {
        let nuevaCant = parseInt(this.props.producto.compraItem.ciCantidad) - parseInt(cantBorrar)
        if (nuevaCant <= 0) {
            axios.delete(Global.urlApi + 'compraitem/' + this.props.producto.compraItem.idCompraItem)
        } else {
            axios.put(Global.urlApi + 'compraitem/', {
                idCompraItem: this.props.producto.compraItem.idCompraItem,
                idProducto: this.props.producto.compraItem.idProducto,
                idCompra: this.props.producto.compraItem.idCompra,
                ciCantidad: nuevaCant
            })
        }
    }

    render() {
        return (
            <tr>
                <td className="col-md-2"><img src={this.props.producto.urlImagen} alt={this.props.producto.proNombre} className="img-thumbnail" /></td>
                <td>{this.props.producto.proNombre}</td>
                <td>{this.props.producto.proDetalle}</td>
                <td>{this.props.producto.proPrecio}</td>
                <td>{this.props.producto.cantComprado}</td>
                <td><a href="#" onClick={this.borrarProducto} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3 text-white" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg></a></td>
            </tr>
        )
    }
}