import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Logout = () => {

    const navigate = useNavigate();

    const cookies = new Cookies();
    cookies.remove('sesion_web');

    useEffect(() => {
        navigate("/");
    }, [])

    return (

        <div>
            
        </div>
        
    );
}

export default Logout;