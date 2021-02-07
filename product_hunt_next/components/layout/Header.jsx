import React from "react";
import Buscador from "../ui/Buscador";
import Navegacion from "./Navegacion";
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>P</p>

          <Buscador />

          <Navegacion />
        </div>

        <div>
            <p>Hola: Clemente</p>
            <button type="button">Cerrar sesión</button>
            <Link href="/">Iniciar Sesión</Link>
            <Link href="/">Crear Cuenta</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
