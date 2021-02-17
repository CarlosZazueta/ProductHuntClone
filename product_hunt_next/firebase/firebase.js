import app from "firebase/app";
import firebaseConfig from "./config";
import "firebase/auth";

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        this.auth = app.auth();
    }

    //Registra un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        );

        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        });
    }

    //Iniciar sesion
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    //Cerrar sesion
    async cerrarSesion() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;