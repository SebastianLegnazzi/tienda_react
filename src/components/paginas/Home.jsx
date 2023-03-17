import React, { Component } from 'react';
import '../../assets/css/home.css';
import logo from '../../assets/img/imgTexto1.jpg';
import video from '../../assets/video/presentacion.mp4';
import ReactPlayer from 'react-player'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="ratio ratio-16x9">
                        <ReactPlayer url={video} playing muted loop className="video" width={'100%'} height={'100%'}/>
                        <div className="text-center text-light fst-italic d-flex align-items-center">
                            <h1 className="display-2 fw-bold texto-titulo">Bienvenido a Losadef!</h1>
                        </div>
                    </div>
                </div>

                <div className="container col-xxl-8 px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <img src={logo} className="img-fluid rounded imagen" alt={logo}/>
                        </div>
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold lh-1 mb-3 índigo-300 text-light fst-italic">¿Quienes Somos?</h1>
                            <p className="lead">
                                <p className="text-light">De todo un poco nace en 2022 con la idea de renovar el mercado y la forma de realizar trajes.
                                    La propuesta es la siguiente; que cada persona que desea realizar algun tipo de vestimenta no tenga la necesidad de salir de su casa y
                                    pueda de una forma rapida y eficaz llevar a cabo la prenda deseada.
                                </p>
                                <p className="text-light">Somos un grupo conformado de 10 modistas, los mejores en sus sectores, destinados a lograr el objetivo planteado y
                                    llevando a cabo una nueva forma de vestirte.
                                </p>
                                <p className="text-light">El objetivo? simple, poder llevar a cada parte del pais una casa de modistas, con los costos mas bajos del pais al
                                    poder reducir costos al maximo. Ademas, va a ser intuitiva, facil de usar y sin costos ocultos, sera transparente sin ningun tipo de letra chica.
                                </p>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
