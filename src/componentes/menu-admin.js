import React from "react";
import { Link } from 'react-router-dom';

const menuNavegacionAdmin = () => {

    return (

        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/eventos"} className="nav-link">
                                    Eventos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/equipos"} className="nav-link">
                                    Equipos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/deportes"} className="nav-link">
                                    Deportes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/logout"} className="nav-link">
                                    <i className="fab fa-user"></i>Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    );

}

export default menuNavegacionAdmin;