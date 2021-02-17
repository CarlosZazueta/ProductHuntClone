import React, { Fragment, useContext } from "react";
import Buscador from "../ui/Buscador";
import Navegacion from "./Navegacion";
import Link from "next/link";
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Boton from '../ui/Boton';
import FirebaseContext from "../../firebase/context.js";

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;

    &:hover {
        cursor: pointer;
    }
`;

const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext);

    function cerrarSesion() {
        firebase.cerrarSesion();
    }

    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>

                    <Buscador />

                    <Navegacion />
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    {usuario ? (
                        <Fragment>
                            <p
                                css={css`
                                    margin-right: 2rem;
                                `}
                            >
                                Hola: {usuario.displayName}
                            </p>

                            <Boton 
                                bgColor="true"
                                onClick={() => cerrarSesion()}
                            >Cerrar sesión</Boton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Link href="/login">
                                <Boton bgColor="true"> Iniciar Sesión </Boton>
                            </Link>

                            <Link href="/crear-cuenta">
                                <Boton> Crear Cuenta </Boton>
                            </Link>
                        </Fragment>
                    )}
                </div>
            </ContenedorHeader>
        </header>
    );
};

export default Header;
