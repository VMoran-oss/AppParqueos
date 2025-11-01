import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../api/firebase';
import { agregarUsuario, obtenerUsuarioPorId } from '../services/userService';
import { doc, getDoc } from 'firebase/firestore';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear el Proveedor (Provider)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rol, setRol] =useState("");

   async function cargarRol(uid) {
          try {
              const obj = await obtenerUsuarioPorId(uid);
              
                setRol(obj?.rol);
              
          } catch (error) {
              console.error("No se logro cargar el perfil");
          }
      }
  // 3. Listener de Firebase para el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // Si authUser existe, ponlo en el estado 'user', si no, 'user' será null
      setUser(authUser);
      if (authUser){
      cargarRol(authUser.uid);
      }
      setLoading(false);
    });

    // Función de limpieza para desuscribirse del listener
    return () => unsubscribe();
  }, []);

  // 4. Funciones de autenticación
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password, data) => {
    try {
      // 1. Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const authUser = userCredential.user;

      // 2. Crear el documento de usuario en Firestore
      // Usamos el UID de Authentication como ID del documento en Firestore
      const userData = {
        uid: authUser.uid,
        email: authUser.email,
        nombre: data.nombre,
        genero: data.genero,
        rol: 'usuario'
      };
      await agregarUsuario(authUser.uid, userData);

      return userCredential;
    } catch (error) {
      // Manejar errores (ej. email ya en uso)
      console.error("Error al registrar:", error);
      throw error;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  // 5. Valor que proveerá el contexto
  const value = { user, rol, loading, login, register, logout };

  // No renderizar nada hasta que sepamos si el usuario está logueado o no
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 6. Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};