import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MenuAdmin from '../componentes/menu-admin';
import APIHOST from '../app.json'
import Cookies from 'universal-cookie';

const Home = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('sesion_web');

    useEffect(() => {
        if(! token || token === undefined){
            navigate("/");
        }
      });

    return (

        <div className='container'>
            <div>
                <MenuAdmin />
            </div>
            <div className='col-4 offset-4 mt-5'>
                <h1 className='text-center mb-5'>Pagina de home</h1>
                
            </div>
        </div>
        
    );
}

export default Home;