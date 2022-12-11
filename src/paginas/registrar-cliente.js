import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import MenuAdmin from '../componentes/menu-admin';
import APIHOST from '../app.json'
import Cookies from 'universal-cookie';
const Swal = require('sweetalert2')

const ClienteRegistrar = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('sesion_web');

    const { idcliente } = useParams();

    const [cliente, setCliente] = useState({
        "nombre": "",
        "apellidos": "",
        "documento": "",
        "telefono": "",
    });

    useEffect(() => {
        if(! token || token === undefined){
            navigate("/");
        }
      }, []);

      
    const onSubmit = (e) => {
        e.preventDefault();
        guardar();
    }

    const onChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const guardar = async() => {

        axios.post(`${APIHOST.APIHOST}/api/clientes/`,
            cliente, 
            { 
                headers: {
                    'x-auth-token': `${token}`
                }
            })
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
                    navigate("/clientes");
                }
                else{
                     navigate("/clientes");
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
                <MenuAdmin />
            </div>
            <div className='col-md-4 offset-md-4 mt-5'>
            <div className="card">
                        <div className="card-header bg-primary text-white">
                            Editar cliente
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name="nombre" className="form-control" value={cliente.nombre} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellidos</label>
                                    <input type="text" name="apellidos" className="form-control" value={cliente.apellidos} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Documento</label>
                                    <input type="text" name="documento" className="form-control" value={cliente.documento} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input type="text" name="telefono" className="form-control" value={cliente.telefono} required onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" onClick={guardar}>Guardar</button>
                            </form>
                        </div>
                    </div>


            </div>
        </div>
        
    );
}

export default ClienteRegistrar;