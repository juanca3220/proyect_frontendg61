import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MenuAdmin from '../../componentes/menu-admin';
import APIHOST from '../../app.json'
import Cookies from 'universal-cookie';
const Swal = require('sweetalert2')

const Deportes = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('sesion_web');

    const [deportes, setDeportes] = useState([]);

    const cargarDeportes = async () => {
        axios.get(`${APIHOST.APIHOST}/api/deportes/`, {
            headers: {
                'x-auth-token': `${token}`
            }
        })
            .then((res) => {
                setDeportes(res.data.deportes);
            })
            .catch((error) => {
                console.error(error)
            });
    }
    useEffect(() => {
        if (!token || token === undefined) {
            navigate("/");
        }

        cargarDeportes();
    }, [setDeportes]);

    const eliminarDeporte = async (e, iddeporte) => {
        e.preventDefault();

        Swal.fire({
            title: 'Estas seguro de eliminar?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${APIHOST.APIHOST}/api/deportes/${iddeporte}`, {
                    headers: {
                        'x-auth-token': `${token}`
                    }
                })
                    .then((res) => {

                        if (res.data.msg == 'Deporte eliminado') {
                            cargarDeportes();
                        }
                        else {
                            console.log('el deporte no pudo ser eliminado')
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    });
            }
        })

    }

    return (

        <div className='container'>
            <div>
                <MenuAdmin />
            </div>
            <div className='col-12 mt-5'>
                <div className="card">
                    <div className="card-header">
                        <div className='row'>
                            <div className='col-md-6'>
                                Deportes
                            </div>
                            <div className='col-md-6'>
                                <Link to={`/deporte-registrar`} className="btn btn-sm btn-primary float-end">Agregar</Link>

                            </div>
                        </div>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    deportes.map(
                                        item =>
                                            <tr key={item._id}>
                                                <td>{item.nombre}</td>
                                                <td>
                                                    <Link to={`/deporte-editar/${item._id}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                    <button onClick={(e) => eliminarDeporte(e, item._id)} className="btn btn-sm btn-danger">Eliminar</button>
                                                </td>
                                            </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>

    );
}

export default Deportes;