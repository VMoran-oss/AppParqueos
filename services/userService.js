import { db } from "../api/firebase";
import { collection, getDocs, addDoc, query, orderBy, where } from "firebase/firestore";

// referencia a la collection
const usuariosRef = collection(db, "usuarios");

// Obtener todos los usuarios ordenados por nombre
export async function obtenerUsuarios() {
  try {
    const q = query(usuariosRef, orderBy("nombre")); // orderBy solo acepta 1 campo
    const snap = await getDocs(q);
    const array = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return array;
  } catch (err) {
    console.error("Error en obtenerUsuarios:", err);
    return [];
  }
}

// Agregar un nuevo usuario
export async function agregarUsuario({ nombre, genero, email, clave, confirmarClave }) {
  try {
    const nuevoUsuario = {
      nombre: nombre.trim(),
      genero: genero.trim(),
      email: email.trim(),
      clave: clave.trim(),
      // confirmarClave: confirmarClave.trim(),
    };
    const docRef = await addDoc(usuariosRef, nuevoUsuario);
    console.log("Usuario agregado con ID:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error en agregarUsuario:", err);
    throw err;
  }
}

// Verificar usuario en (inicio de sesión)
export async function verificarUsuario(email, clave) {
  try {
    // Buscar el usuario por su correo y clave
    const q = query(
      usuariosRef,
      where("email", "==", email.trim()),
      where("clave", "==", clave.trim())
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      // Usuario encontrado
      const userData = snap.docs[0].data();
      console.log("Usuario encontrado:", userData);
      return userData;
    } else {
      // No existe
      return null;
    }
  } catch (err) {
    console.error("Error en verificarUsuario:", err);
    throw err;
  }
}
