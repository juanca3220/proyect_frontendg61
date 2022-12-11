import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import MenuAdmin from '../../componentes/menu-admin';
import APIHOST from '../../app.json'
import Cookies from 'universal-cookie';
const Swal = require('sweetalert2')

const EventoRegistrar = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('sesion_web');

    const [evento, setEvento] = useState({
        "fecha": "",
        "equipo1": "",
        "equipo2": "",
        "tipo_deporte": "",
        "marcador_eq1": "",
        "marcador_eq2": ""
    });
    const [equipos, setEquipos] = useState([]);
    const [deportes, setDeportes] = useState([]);

    const cargarEquipos = async () => {
        axios.get(`${APIHOST.APIHOST}/api/equipos/`, {
            headers: {
                'x-auth-token': `${token}`
            }
        })
            .then((res) => {
                setEquipos(res.data.equipos);
            })
            .catch((error) => {
                console.error(error)
            });
    }

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
        if(! token || token === undefined){
            navigate("/");
        }
        cargarEquipos();
        cargarDeportes();
      }, []);

      
    const onSubmit = (e) => {
        e.preventDefault();
        guardar();
    }

    const onChange = (e) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value
        })
    }

    const guardar = async() => {

        axios.post(`${APIHOST.APIHOST}/api/eventos/`,
            evento, 
            { 
                headers: {
                    'x-auth-token': `${token}`
                }
            })
            .then((res) => {
            
              Swal.fire({
                title: 'Se registro correctamente!',
                text: "",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/eventos");
                }
                else{
                     navigate("/eventos");
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
                            Registrar evento
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Fecha</label>
                                    <input type="date" name="fecha" className="form-control" value={evento.fecha} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Equipo 1</label>
                                    <select name="equipo1" className="form-select" required onChange={onChange}>
                                        <option value="">Seleccione</option>
                                        {
                                            equipos.map(
                                                item =>
                                                    <option value={item.nombre} key={item._id}>{item.nombre}</option>
                                            )
                                        }
                                            
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Equipo 2</label>
                                    <select name="equipo2" className="form-select" required onChange={onChange}>
                                        <option value="">Seleccione</option>
                                        {
                                            equipos.map(
                                                item =>
                                                    <option value={item.nombre} key={item._id}>{item.nombre}</option>
                                            )
                                        }
                                            
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Marcador equipo 1</label>
                                    <input type="text" name="marcador_eq1" className="form-control" value={evento.marcador_eq1} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Marcador equipo 2</label>
                                    <input type="text" name="marcador_eq2" className="form-control" value={evento.marcador_eq2} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Deporte</label>
                                    <select name="tipo_deporte" className="form-select" required onChange={onChange}>
                                        <option value="">Seleccione</option>
                                        {
                                            deportes.map(
                                                item =>
                                                    <option value={item.nombre} key={item._id}>{item.nombre}</option>
                                            )
                                        }
                                            
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100" onClick={guardar}>Guardar</button>
                            </form>
                        </div>
                    </div>


            </div>
        </div>
        
    );
}

export default EventoRegistrar;