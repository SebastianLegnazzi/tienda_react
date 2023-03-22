import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2';
import Global from '../../modulos/Global';
import axios from 'axios';
import md5 from 'md5';
import { useNavigate } from "react-router-dom";


/*===================== Variables de referencia a inputs del formulario =====================*/
const refUsuario = React.createRef();
const refEmail = React.createRef();
const refContrasenia = React.createRef();
const refContraseniaRep = React.createRef();

/*===================== Formulario que carga la cuenta =====================*/
export const FormularioRegistrarse = ({ }) => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity()) {
            const usuario = refUsuario.current.value;
            const email = refEmail.current.value;                       //Obtenemos valores de los inputs
            const contrasenia = md5(refContrasenia.current.value);
            const contraseniaRep = md5(refContraseniaRep.current.value);
            if (contrasenia === contraseniaRep) {                           //Verificamos que la contraseñas conicidan
                axios.get(Global.urlApi + 'usuarios/email/' + email).then(      //Verificamos que el usuario no este registrado con el email
                    res => {
                        if (res.data.length == 0) {
                            axios.post(Global.urlApi + 'usuarios', {            //Cargamos el usuario 
                                usNombre: usuario,
                                usMail: email,
                                usPass: contrasenia,
                            })
                            Swal.fire({                                         //Devolvemos alerta succes
                                icon: 'success',
                                title: 'El usuario fue registrado exitosamente!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setTimeout(function () {
                                navigate('/login')                   //Envia el usuario al login
                            }, 1500);
                        } else {
                            Swal.fire({
                                icon: 'error',                       //Devolvemos alerta error
                                title: 'El email ya se encuentra registrado!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                )
            } else {
                Swal.fire({
                    icon: 'error',                               //Devolvemos alerta error
                    title: 'La contraseñas no coinciden!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        setValidated(true);
    };

    /*===================== Formulario para pedir datos =====================*/
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
            <Form.Group controlId="Email" className='mb-3'>
                <InputGroup hasValidation>
                    <div className="form-floating">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.([a-z]{3})(\.[a-z]{2})*$"
                            required
                            ref={refEmail}
                        />
                        <Form.Control.Feedback type="invalid">Ingrese un Email valido!</Form.Control.Feedback>
                        <label for="floatingInput"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-at" viewBox="0 0 16 16">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                        </svg>Email</label>
                    </div>
                </InputGroup>
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
            <Form.Group controlId="ContraseniaRep" className='col-sm-12 mb-3'>
                <div className="form-floating">
                    <Form.Control
                        required
                        type="password"
                        placeholder=" "
                        ref={refContraseniaRep}
                    />
                    <Form.Control.Feedback type="invalid">Ingrese una contraseña</Form.Control.Feedback>
                    <label for="floatingInput"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock me-1 mb-1 text-dark" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                    </svg>Repetir Contraseña</label>
                </div>
            </Form.Group>
            <Button type="submit" className='btn btn-lg btn-success col-md-4'>Registrarse</Button>
        </Form >
    );
}