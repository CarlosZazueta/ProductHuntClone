import React, { Fragment, useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import Swal from 'sweetalert2';
import { css } from "@emotion/react";
import Layout from "../components/layout/Layout";
import {
    Formulario,
    Campo,
    InputSubmit,
    Error,
} from "../components/ui/Formulario";

import { FirebaseContext } from "../firebase";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarNuevoProducto from "../validacion/validarNuevoProducto";

const NuevoProducto = () => {
    //state de las imagenes
    const [nombreImagen, setNombreImagen] = useState("");
    const [subiendo, setSubiendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [urlImagen, setUrlImagen] = useState("");

    const [error, setError] = useState(false);
    const router = useRouter();

    const { usuario, firebase } = useContext(FirebaseContext);

    const STATE_INICIAL = {
        nombre: "",
        empresa: "",
        //imagen: "",
        url: "",
        descripcion: "",
    };

    const nuevoProducto = () => {
        //Si el usuario no esta autenticado
        if (!usuario) {
            return router.push("/login");
        }
        //crear el objeto nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
        };

        //insertar en la base de datos;
        firebase.db.collection("productos").add(producto);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto guardado con éxito',
            showConfirmButton: false,
            timer: 1500
          })

        return router.push('/');
    }

    const handleCargarImagen = async (e) => {
        const file = e.target.files[0]; // acceder al file subido con el input

        // asignar donde se guardara el file
        const storageRef = await firebase.storage.ref("productos");
        setNombreImagen(file.name);

        // asignar el nombre del archivo en el storage de firebase
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file); // termina de agregar el archivo
        setUrlImagen(await fileRef.getDownloadURL()); // add urlFile al state

    };

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
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    onChange={(e) => handleCargarImagen(e)}
                                />
                            </Campo>

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
