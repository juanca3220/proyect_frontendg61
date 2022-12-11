import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import Menu from '../componentes/menu';
import APIHOST from '../app.json'
import Cookies from 'universal-cookie';
const Swal = require('sweetalert2')

const UsuarioRegistrar = () => {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        "nombre": "",
        "apellidos": "",
        "email": "",
        "password": "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        guardar();
    }

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const guardar = async() => {

        axios.post(`${APIHOST.APIHOST}/api/usuarios/`,usuario, {})
            .then((res) => {
            console.log(res.data)
            
              Swal.fire({
                title: 'Se registro correctamente!',
                text: "",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
                else{
                     navigate("/login");
                }
              })

              return res;

            })
            .catch((error) => {
            console.error(error)
            });
        
    }


    return (

        <div className='container'>
            <div>
                <Menu />
            </div>
            <div className='col-md-4 offset-md-4 mt-5'>
            <div className="card">
                        <div className="card-header bg-primary text-white">
                            Registrar Usuario
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name="nombre" className="form-control" value={usuario.nombre} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellidos</label>
                                    <input type="text" name="apellidos" className="form-control" value={usuario.apellidos} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" value={usuario.email} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" value={usuario.password} required onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" onClick={guardar}>Guardar</button>
                            </form>
                        </div>
                    </div>


            </div>
        </div>
        
    );
}

export default UsuarioRegistrar;