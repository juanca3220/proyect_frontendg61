import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import MenuAdmin from '../../componentes/menu-admin';
import APIHOST from '../../app.json'
import Cookies from 'universal-cookie';
const Swal = require('sweetalert2')

const DeporteRegistrar = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('sesion_web');

    const [deporte, setDeporte] = useState({
        "nombre": ""
    });

    useEffect(() => {
        if(! token || token === undefined){
            navigate("/");
        }

        return () => {};
      }, []);

      
    const onSubmit = (e) => {
        e.preventDefault();
        guardar();
    }

    const onChange = (e) => {
        setDeporte({
            ...deporte,
            [e.target.name]: e.target.value
        })
    }

    const guardar = async() => {

        await axios.post(`${APIHOST.APIHOST}/api/deportes/`,
            deporte, 
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
                    navigate("/deportes");
                }
                else{
                     navigate("/deportes");
                }
              })

              return res;

            })
            .catch((error) => {
                console.error(error.response.data)
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
                            Registrar deporte
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name="nombre" className="form-control" value={deporte.nombre} required onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" onClick={guardar}>Guardar</button>
                            </form>
                        </div>
                    </div>


            </div>
        </div>
        
    );
}

export default DeporteRegistrar;