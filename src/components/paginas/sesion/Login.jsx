import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { FormularioLogin } from '../../modulos/m_sesion/FormularioLogin';

export default class Login extends Component {
  
  /*===================== Formulario que carga la cuenta =====================*/
  render() {
    return (
      <div className='container col-md-5 col-lg-5 col-xl-4 mt-4 mb-sm-3' style={{ height: '100vh' }}>
        <Card className='bg-dark p-4'>
          <Card.Body>
            <Card.Title className='text-light' >INICIAR SESION</Card.Title>
            <Card.Text>
            <FormularioLogin/>
            </Card.Text>
            <NavLink to="/register" className="text-info">Registrarse</NavLink>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
