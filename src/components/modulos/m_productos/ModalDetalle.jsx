import Modal from 'react-bootstrap/Modal';
import '../../../assets/css/modalDetalle.css';
import axios from 'axios';
import Global from '../Global';
import Swal from 'sweetalert2';

export const ModalDetalle = ({ show, handleClose, producto }) => {
    /*===================== Funcion que agrega al carrito el producto =====================*/
    const agregarCarrito = (e) => {
        e.preventDefault();
        let cantProducto = document.getElementById('cantidad_input').value;
        let hayCarrito = false       //esta variable verifica que exista un carrito "borrador"
        axios.get(Global.urlApi + 'compra/usuario/' + sessionStorage.getItem('id')).then(       //Buscamos todas las compras del usuario
            res => {
                if (res.data.length > 0) {
                    var finBuscar = res.data.length;        //Limite de busqueda de compras en estado "borrador"
                    var i = 0       //index que funciona para buscar entre todas las compras que existen
                    res.data.forEach(compra => {
                        axios.get(Global.urlApi + 'compraestado/compra/' + compra.idCompra).then(       //Buscamos el estado de todas las compras
                            res => {
                                if (res.data[0].idCompraEstadoTipo === 1 && !hayCarrito) {                //Comprobamos que este en estado "1" = "borrador"
                                    verificarProductoRep(res.data[0].idCompra, cantProducto);
                                    hayCarrito = true;
                                } else {
                                    i++
                                }
                                if (!hayCarrito && finBuscar <= i) {
                                    crearCarritoBorrador(cantProducto);
                                }
                            });
                    });
                } else {
                    crearCarritoBorrador(cantProducto);
                }
            });
    };

    /*===================== Modulo que crea y carga el producto en un carrito "borrador" =====================*/
    const crearCarritoBorrador = (cantProducto) => {
        axios.post(Global.urlApi + 'compra', {            //Creamos una compra nueva
            idUsuario: sessionStorage.getItem('id')
        }).then(
            res => {
                axios.post(Global.urlApi + 'compraestado', {       //Le seteamos el estado de "borrador"
                    idCompra: res.data.resp,
                    idCompraEstadoTipo: 1
                });
                cargarProducto(res.data.resp, cantProducto)
            });
    }

    /*===================== Modulo Producto Repetido =====================*/
    const verificarProductoRep = (idCompra, cantProducto) => {
        var productoRep = false;
        var i = 0;
        var cantProductosCarrito = 0;
        axios.get(Global.urlApi + 'compraitem/compra/' + idCompra).then(
            res => {
                if (res.data.length > 0) {
                    cantProductosCarrito = res.data.length
                    res.data.forEach(productoCarrito => {
                        if (productoCarrito.idProducto === producto.idProducto) {
                            let cantProdNuevo = (parseInt(cantProducto) + parseInt(productoCarrito.ciCantidad));      //Suma la cantidad del producto al carrito
                            axios.put(Global.urlApi + 'compraitem', {
                                idCompraItem: productoCarrito.idCompraItem,
                                idProducto: productoCarrito.idProducto,
                                idCompra: productoCarrito.idCompra,
                                ciCantidad: cantProdNuevo
                            });
                            actualizarStock(cantProducto);
                            productoRep = true;
                        } else {
                            i++;
                        }
                        if (!productoRep && cantProductosCarrito <= i) {
                            cargarProducto(idCompra, cantProducto)          //Carga producto si no se encuentra en el carrito
                        }
                    });
                } else {
                    cargarProducto(idCompra, cantProducto)
                }
            });
    }

    /*===================== Modulo Actualiza Stock =====================*/
    const actualizarStock = (cantComprada) => {
        let stockActualizado = (producto.proCantStock - cantComprada);
        axios.put(Global.urlApi + 'producto', {
            idProducto: producto.idProducto,
            proNombre: producto.proNombre,
            proDetalle: producto.proDetalle,                        //Actualiza Stock
            proCantStock: stockActualizado,
            proPrecio: producto.proPrecio,
            urlImagen: producto.urlImagen
        })
        Swal.fire({
            icon: 'success',
            title: 'El producto fue cargado al carrito!',       //Alerta de success
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(function () {
            window.location.href = "/tienda";
        }, 1500);
    }

    /*===================== Modulo Carga Producto =====================*/
    const cargarProducto = (idCompra, cantProducto) => {
        axios.post(Global.urlApi + 'compraitem', {
            ciCantidad: cantProducto,
            idCompra: idCompra,
            idProducto: producto.idProducto
        });
        actualizarStock(cantProducto);
    }



    /*===================== Modal de detalle =====================*/
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header className="bg-dark text-light border-1 border-secondary justify-content-center">
                <Modal.Title className='fs-1'>Detalle del producto</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <div>
                    <div className='row'>
                        <div id="content__foto__detalle" className="col-md-3">
                            <img id="foto__detalle" className="img-thumbnail" src={producto.urlImagen} alt={producto.proNombre} />
                        </div>
                        <div id="content__info__detalle" className="col mt-sm-3">
                            <h3 id="nombre__detalle">{producto.proNombre}</h3>
                            <p id="descripcion__detalle">{producto.proDetalle}</p>
                            <p id="cantidad_detalle">Stock disponible: {producto.proCantStock}</p>
                            <p id="precio__detalle">Precio ${producto.proPrecio}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body >
            <Modal.Footer className="bg-dark border-0">
                <form method="post" onSubmit={agregarCarrito} className="needs-validation col-md-4">
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
