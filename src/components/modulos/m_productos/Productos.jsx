import React, { Component } from 'react'
import axios from 'axios';
import { Producto } from './Producto';
import Global from '../Global';

export default class Productos extends Component {

    /*===================== Cargo State =====================*/
    constructor(props) {
        super(props)
        this.state = {
            productos: {},
        }
    }

    /*======= Metodo que se ejecuta antes de cargar la pagina =======*/
    componentDidMount() {
        this.getProductos();
    }

    /*===================== Consultas Ajax =====================*/
    getProductos = () => {
        axios.get(Global.urlApi + 'producto')
            .then(
                res => {
                    this.setState({
                        productos: res.data,
                    });
                });
    }

    render() {
        return (
            <div>
                {/*===================== Tarjetas de productos =====================*/}
                <div id="content__productos" className="text-center" >
                    {
                        this.state.productos.length >= 1 ? (  //Condicion
                            //Foreach del objeto Productos    -    LLamo al modulo para que muestre los datos con sus parametros
                            this.state.productos.map((producto) =>
                                <Producto key={producto.idProducto} producto={producto} />) //Caso True
                        ) : (                                                                                                  //Caso False
                            <div className="text-light">
                                <strong className="me-2">Cargando...</strong>
                                <div className="spinner-border spinner-border-sm ml-auto" role="status" aria-hidden="true"></div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
