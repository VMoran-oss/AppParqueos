import { db } from "../api/firebase";
import { collection, getDocs, addDoc, doc, query,orderBy, where } from "firebase/firestore";
// referencia a la collection
const noticiasRef = collection(db, "usuarios");

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
export async function agregarUsuario({ nombre, genero, correoElectronico, contraseña, confirmarContraseña }) {
  try {
    const nuevoUsuario = {
      nombre: nombre.trim(),
      genero: genero.trim(),
      correoElectronico: correoElectronico.trim(),
      contraseña: contraseña.trim(),
      confirmarContraseña: confirmarContraseña.trim(),
    };
    const docRef = await addDoc(usuariosRef, nuevoUsuario);
    console.log("Usuario agregado con ID:", docRef.id);
    return docRef.id;
  } catch (err) {
    console.error("Error en agregarUsuario:", err);
    throw err;
  }
}

