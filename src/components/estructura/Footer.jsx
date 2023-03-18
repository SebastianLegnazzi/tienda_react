import React, { Component } from 'react'
import '../../assets/css/footer.css'


export default class Footer extends Component {
    render() {
        return (
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-5">
                <p className="col-md-4 mb-0 text-white" id="universidad"> Primer Proyecto - React</p>
                <ul className="nav justify-content-end flex-column col-3,5">
                    <li className="nav-item"><a href="https://github.com/SebastianLegnazzi/tienda_react" className="nav-link px-2 text-white"><span> Legnazzi Sebastian Nicolas</span></a></li>
                </ul>
            </footer>
        )
    }
}
