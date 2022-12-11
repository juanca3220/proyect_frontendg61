import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menu from '../componentes/menu';
import APIHOST from '../app.json'
import Cookies from 'universal-cookie';

const Login = () => {

    //poder redireccionar de un componente a otro
    const navigate = useNavigate();


    const [usuario, setUsuario] = useState({ email: '', password: ''});

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, [])


    const iniciarSesion = async (e) => {
        e.preventDefault();

        axios.post(`${APIHOST.APIHOST}/api/auth/`, { 
            email: usuario.email,
            password: usuario.password
        }).then( response => {
            if(response.data.token === null){
                alert(response.data.msg);
            }
            else{
                const cookies = new Cookies();
                cookies.set('sesion_web', response.data.token, { path: '/' });

                navigate("/home");
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }

    return (

        <div className='container'>
            <div>
                <Menu />
            </div>
            <div className='col-4 offset-4 mt-5'>
                <h1 className='text-center mb-5'>Iniciar sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" required onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={iniciarSesion}>Iniciar sesión</button>
                </form>
            </div>
        </div>
        
    );
}

export default Login;