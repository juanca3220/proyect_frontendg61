import React, { useState, useEffect } from 'react';
import * as moment from 'moment'
import axios from 'axios';
import Menu from '../componentes/menu';
import APIHOST from '../app.json'

const Inicio = () => {

    const [eventos, setEventos] = useState([]);

    const cargarEventos = async() => {
        axios.get(`${APIHOST.APIHOST}/api/eventos/`, { })
            .then((res) => {
            //console.log(res.data)
            setEventos(res.data.eventos);
            })
            .catch((error) => {
            console.error(error)
            });
    }
    useEffect(() => {
        cargarEventos();
      }, [setEventos]);

    return (

        <div className='container'>
            <div>
                <Menu />
            </div>
            <div className='col-md-12 mt-5'>
                <h1 className='text-center mb-5'>Eventos</h1>

                <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Deporte</th>
                                        <th>Equipo 1</th>
                                        <th>Equipo 2</th>
                                        <th>Marcador eq1</th>
                                        <th>Marcador eq2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        eventos.map(
                                            item =>
                                                <tr key={item._id}>
                                                    <td>{moment(item.fecha).format('YYYY-MM-DD')}</td>
                                                    <td>{item.tipo_deporte}</td>
                                                    <td>{item.equipo1}</td>
                                                    <td>{item.equipo2}</td>
                                                    <td>{item.marcador_eq1}</td>
                                                    <td>{item.marcador_eq2}</td>
                                                </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                
            </div>
        </div>
        
    );
}

export default Inicio;