import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Global from '../../modulos/Global';
import axios from 'axios';
import md5 from 'md5';


/*===================== Variables de referencia a inputs del formulario =====================*/
const refUsuario = React.createRef();
const refContrasenia = React.createRef();

/*===================== Formulario que valida la cuenta =====================*/
export const FormularioLogin = ({ }) => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity()) {
            const usuario = refUsuario.current.value;                //Cargamos los datos de los inputs
            const contrasenia = md5(refContrasenia.current.value);
            let usrEncontrado = false;
            axios.get(Global.urlApi + 'usuarios/' + usuario).then(      //Realizamos la consulta con el nombre de la cuenta
                res => {
                    if (res.data.length > 0) {
                        res.data.forEach(cuenta => {                          //Buscamos entre todos los usuarios cual es la que coincide con la contraseña
                            if (cuenta.usPass === contrasenia) {
                                sessionStorage.setItem('login', true);   //Guardamos datos para manter la sesion
                                sessionStorage.setItem('id', res.data[0].idUsuario);   //Guardamos datos para manter la sesion
                                sessionStorage.setItem('usuario', res.data[0].usNombre);   //Guardamos datos para manter la sesion
                                sessionStorage.setItem('contrasenia', res.data[0].usPass);
                                usrEncontrado = true;

                            }
                        });
                    }
                    if (usrEncontrado) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Se inició la sesión',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(function () {
                            window.location.href='/'
                        }, 1500);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'El usuario y/o contraseña no coinciden',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        }
        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="Usuario" className='mb-3'>
                <div className="form-floating">
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        pattern="[a-zA-Z]+\s?[0-9]*"
                        ref={refUsuario}
                    />
                    <Form.Control.Feedback type="invalid">Ingrese un usuario valido!</Form.Control.Feedback>
                    <label for="floatingInput"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-1 mb-1 bi-person-fill text-dark" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>Usuario</label>
                </div>
            </Form.Group>
            <Form.Group controlId="Contrasenia" className='mb-3'>
                <div className="form-floating">
                    <Form.Control
                        required
                        type="password"
                        placeholder=" "
                        ref={refContrasenia}
                    />
                    <Form.Control.Feedback type="invalid">Ingrese una contraseña</Form.Control.Feedback>
                    <label for="floatingInput"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock me-1 mb-1 text-dark" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                    </svg>Contraseña</label>
                </div>
            </Form.Group>
            <Button type="submit" className='btn btn-lg btn-success col-md-6'>Iniciar Sesion</Button>
        </Form >
    );
}