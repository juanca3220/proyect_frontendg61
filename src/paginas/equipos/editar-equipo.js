import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import MenuAdmin from '../../componentes/menu-admin';
import APIHOST from '../../app.json'
import Cookies from 'universal-cookie';
const Swal = require('sweetalert2')

const EquipoEdit = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('sesion_web');

    const { idequipo } = useParams();

    const [equipo, setEquipo] = useState([]);

    const buscarEquipo = async() => {
        await axios.get(`${APIHOST.APIHOST}/api/equipos/${idequipo}`, { 
            headers: {
                'x-auth-token': `${token}`
            }
            })
            .then((res) => {
                setEquipo(res.data.equipo);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    useEffect(() => {
        if(! token || token === undefined){
            navigate("/");
        }
        buscarEquipo();
      }, []);

      
    const onSubmit = (e) => {
        e.preventDefault();
        guardar();
    }

    const onChange = (e) => {
        setEquipo({
            ...equipo,
            [e.target.name]: e.target.value
        })
    }

    const guardar = () => {
        axios.put(`${APIHOST.APIHOST}/api/equipos/${idequipo}`,
            equipo, 
            { 
                headers: {
                    'x-auth-token': `${token}`
                }
            })
            .then((res) => {
            console.log(res.data)
            
              Swal.fire({
                title: 'Se edito correctamente!',
                text: "",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/equipos");
                }
                else{
                     navigate("/equipos");
                }
              })

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
                            Editar equipo
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name="nombre" className="form-control" value={equipo.nombre} required onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" onClick={guardar}>Guardar</button>
                            </form>
                        </div>
                    </div>


            </div>
        </div>
        
    );
}

export default EquipoEdit;