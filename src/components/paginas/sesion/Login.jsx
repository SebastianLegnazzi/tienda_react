import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import md5 from 'md5';
import axios from 'axios';
import Global from '../../modulos/Global';
import Swal from 'sweetalert2';

export default class Login extends Component {
  refUsuario = React.createRef();
  refContrasenia = React.createRef();

  /*===================== Formulario que valida la cuenta =====================*/
  envioFormulario = (e) => {
    e.preventDefault();
    let usuario = this.refUsuario.current.value;                //Cargamos los datos de los inputs
    let contrasenia = md5(this.refContrasenia.current.value);
    let usrEncontrado = false;
    axios.get(Global.urlApi + 'usuarios/' + usuario).then(      //Realizamos la consulta con el nombre de la cuenta
      res => {
        if (res.data.length > 0) {
          res.data.forEach(cuenta => {                          //Buscamos entre todos los usuarios cual es la que coincide con la contraseña
            if (cuenta.usPass === contrasenia) {
              sessionStorage.setItem('login', true);   //Guardamos datos para manter la sesion
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
            window.location.href="/"
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

  render() {
    return (
      <div className='container col-md-4 mt-4 mb-sm-3' style={{ height: '100vh' }}>
        <Card className='bg-dark p-4'>
          <Card.Body>
            <Card.Title className='text-light' >INICIAR SESION</Card.Title>
            <Card.Text>
              <form className="needs-validation" onSubmit={this.envioFormulario}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" ref={this.refUsuario} required placeholder=" " />
                  <label for="floatingInput"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi me-1 mb-1 bi-person-fill text-dark" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>Usuario</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" ref={this.refContrasenia} required placeholder=" " />
                  <label for="floatingPassword"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock me-1 mb-1 text-dark" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                  </svg>Contraseña</label>
                </div>
                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-success" type="submit">INICIAR</button>
                <NavLink to="/register" className="text-info">Registrarse</NavLink>
              </form>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
