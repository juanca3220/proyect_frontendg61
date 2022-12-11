import React, { useState, useEffect } from 'react';
import * as moment from 'moment'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MenuAdmin from '../../componentes/menu-admin';
import APIHOST from '../../app.json'
import Cookies from 'universal-cookie';
const Swal = require('sweetalert2')

const Eventos = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('sesion_web');

    const [eventos, setEventos] = useState([]);

    const cargarEventos = async () => {
        axios.get(`${APIHOST.APIHOST}/api/eventos/`, {
            headers: {
                'x-auth-token': `${token}`
            }
        })
            .then((res) => {
                setEventos(res.data.eventos);
            })
            .catch((error) => {
                console.error(error)
            });
    }
    useEffect(() => {
        if (!token || token === undefined) {
            navigate("/");
        }

        cargarEventos();
    }, [setEventos]);

    const eliminarEvento = async (e, idevento) => {
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
                axios.delete(`${APIHOST.APIHOST}/api/eventos/${idevento}`, {
                    headers: {
                        'x-auth-token': `${token}`
                    }
                })
                    .then((res) => {

                        if (res.data.msg == 'Evento eliminado') {
                            cargarEventos();
                        }
                        else {
                            console.log('el evento no pudo ser eliminado')
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
                                Eventos
                            </div>
                            <div className='col-md-6'>
                                <Link to={`/evento-registrar`} className="btn btn-sm btn-primary float-end">Agregar</Link>

                            </div>
                        </div>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Equipo 1</th>
                                    <th>Equipo 2</th>
                                    <th>Marcador eq1</th>
                                    <th>Marcador eq2</th>
                                    <th>Deporte</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventos.map(
                                        item =>
                                            <tr key={item._id}>
                                                <td>{moment(item.fecha).format('YYYY-MM-DD')}</td>
                                                <td>{item.equipo1}</td>
                                                <td>{item.equipo2}</td>
                                                <td>{item.marcador_eq1}</td>
                                                <td>{item.marcador_eq2}</td>
                                                <td>{item.tipo_deporte}</td>
                                                <td>
                                                    <Link to={`/evento-editar/${item._id}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                    <button onClick={(e) => eliminarEvento(e, item._id)} className="btn btn-sm btn-danger">Eliminar</button>
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

export default Eventos;