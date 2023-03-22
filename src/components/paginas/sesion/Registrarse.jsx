import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FormularioRegistrarse } from '../../modulos/m_sesion/FormularioRegistrarse';

export default class Registrarse extends Component {
  render() {
    return (
      <div className='container col-md-8 col-lg-7 col-xl-5 mt-4 mb-3' style={{ height: '100vh' }
      }>
        <Card className='bg-dark p-4'>
          <Card.Body>
            <Card.Title className='text-light' >Registrarse</Card.Title>
            <Card.Text>
              <FormularioRegistrarse />
            </Card.Text>
            <NavLink to="/login" className="text-info">Iniciar Sesion</NavLink>
          </Card.Body>
        </Card>
      </div >
    )
  }
}
