import React, { useState, Fragment } from 'react';
import Layout from "../components/layout/Layout";
import Router from "next/router";
import { css } from "@emotion/react";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";

import firebase from "../firebase";
 
//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const Login = () => {

    const [error, setError] = useState(false);

    const STATE_INICIAL = { 
        email: "",
        password: ""
    }

    async function iniciarSesion () {
        try {
            await firebase.login(email, password);
            Router.push('/')
        } catch (error) {
            console.error("Hubo un error al autenticar el usuario ", error.message);
            setError(error.message);
        }
    }

    const {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
    
    const {email, password} = valores;
    
    

    return (
        <div>
            <Layout>
                <Fragment>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >
                        Iniciar Sesión
                    </h1>
                    <Formulario 
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        
                        <Campo>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Tu email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.email && <Error>{errores.email}</Error>}
    
                        <Campo>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Tu password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        
                        {errores.password && <Error>{errores.password}</Error>}

                        {error && <Error>{error}</Error>}
    
                        <InputSubmit type="submit" value="Iniciar Sesión"/>
                    </Formulario>
                </Fragment>
            </Layout>
        </div>
    )
}

export default Login;