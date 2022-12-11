import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MenuAdmin from '../componentes/menu-admin';
import APIHOST from '../app.json'
import Cookies from 'universal-cookie';
import ClienteEdit from './clientes-edit';
const Swal = require('sweetalert2')

const Clientes = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('sesion_web');

    const [clientes, setClientes] = useState([]);

    const cargarClientes = async() => {
        axios.get(`${APIHOST.APIHOST}/api/clientes/`, { 
            headers: {
                'x-auth-token': `${token}`
            }
            })
            .then((res) => {
            //console.log(res.data)
            setClientes(res.data.clientes);
            })
            .catch((error) => {
            console.error(error)
            });
    }
    useEffect(() => {
        if(! token || token === undefined){
            navigate("/");
        }
        
        cargarClientes();
      }, [setClientes]);

    const eliminarCliente = async (e, idCliente) => {
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
                axios.delete(`${APIHOST.APIHOST}/api/clientes/${idCliente}`, { 
                    headers: {
                        'x-auth-token': `${token}`
                    }
                    })
                    .then((res) => {
                
                        if(res.data.msg == 'cliente eliminado'){
                            console.log('el cliente fue eliminado')
                            cargarClientes();
                        }
                        else{
                            console.log('el cliente no pudo ser eliminado')
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
                                    Clientes
                                </div>
                                <div className='col-md-6'>
                                <Link to={`/clientes-registrar`} className="btn btn-sm btn-primary float-end">Agregar</Link>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="card-body">

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '75%' }}>Nombre</th>
                                        <th style={{ width: '15%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clientes.map(
                                            item =>
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>
                                                    <Link to={`/clientes-edit/${item._id}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                        <button onClick={(e) => eliminarCliente(e, item._id)} className="btn btn-sm btn-danger">Eliminar</button>
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

export default Clientes;