import { db } from "../api/firebase";
import { doc, setDoc, getDoc } from 'firebase/firestore';

// referencia a la collection
const usuariosRef = "usuarios";

//agregar usuarios
export function agregarUsuario(uid, userData){
  //'uid' es el ID del documento
  const userDocRef = doc (db, "usuarios", uid);
  return setDoc(userDocRef, userData);
};

export async function obtenerUsuarioPorId(uid) {
  const userDocRef = doc(db, usuariosRef, uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // El documento no existe
    console.warn("No se encontró el perfil de usuario en Firestore para el UID:", uid);
    return null;
  }
};