import React, { Fragment, useState } from "react";
import Router from "next/router";
import { css } from "@emotion/react";
import Layout from "../components/layout/Layout";
import {
    Formulario,
    Campo,
    InputSubmit,
    Error,
} from "../components/ui/Formulario";

import firebase from "../firebase";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarNuevoProducto from "../validacion/validarNuevoProducto";

const NuevoProducto = () => {
    const [error, setError] = useState(false);

    const STATE_INICIAL = {
        nombre: "",
        empresa: "",
        imagen: "",
        url: "",
        descripcion: "",
    };

    async function nuevoProducto() {

    }

    const {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur,
    } = useValidacion(STATE_INICIAL, validarNuevoProducto, nuevoProducto);

    const { nombre, empresa, imagen, url, descripcion } = valores;

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
                        Nuevo Producto
                    </h1>
                    <Formulario onSubmit={handleSubmit} noValidate>
                        <fieldset>
                            <legend>Información General</legend>
                            <Campo>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder="Tu nombre"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChange}
                                />
                            </Campo>

                            {errores.nombre && <Error>{errores.nombre}</Error>}

                            <Campo>
                                <label htmlFor="empresa">Empresa</label>
                                <input
                                    type="text"
                                    id="empresa"
                                    placeholder="Nombre de la empresa"
                                    name="empresa"
                                    value={empresa}
                                    onChange={handleChange}
                                />
                            </Campo>

                            {errores.empresa && (
                                <Error>{errores.empresa}</Error>
                            )}

                            <Campo>
                                <label htmlFor="imagen">Imagen</label>
                                <input
                                    type="file"
                                    id="imagen"
                                    name="imagen"
                                    value={imagen}
                                    onChange={handleChange}
                                />
                            </Campo>

                            {errores.imagen && <Error>{errores.imagen}</Error>}

                            <Campo>
                                <label htmlFor="url">Url</label>
                                <input
                                    type="url"
                                    id="url"
                                    placeholder="https://url.com"
                                    name="url"
                                    value={url}
                                    onChange={handleChange}
                                />
                            </Campo>

                            {errores.url && <Error>{errores.url}</Error>}
                        </fieldset>

                        <fieldset>
                            <legend>Sobre tu producto</legend>

                            <Campo>
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    id="descripcion"
                                    placeholder="Describe tu producto..."
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={handleChange}
                                ></textarea>
                            </Campo>

                            {errores.descripcion && (
                                <Error>{errores.descripcion}</Error>
                            )}
                        </fieldset>

                        {error && <Error>{error}</Error>}

                        <InputSubmit
                            type="submit"
                            value="Agreagar Nuevo Producto"
                        />
                    </Formulario>
                </Fragment>
            </Layout>
        </div>
    );
};

export default NuevoProducto;
