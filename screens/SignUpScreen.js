import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';

export default function RegisterScreen(){
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    return (
        <Layout>
            <Input 
                label="Nombre"
                placeholder="Juan Perez"
                type="default"
                value={nombre}
                onChangeText={setNombre} />
            <Input npm install
                label="Genero"
                placeholder="Femenino/Masculino"
                type="default"
                value={genero}
                onChangeText={setGenero} />                  
            <Input 
                label="Correo electronico"
                placeholder="codigo@esfe.agape.edu.sv"
                type="email-address"
                value={email}
                onChangeText={setEmail} />
            <Input 
                label="Constraseña"
                placeholder="*****"
                hideText={true}
                value={clave}
                onChangeText={setClave} />
            <Input 
                label="Confirmar constraseña"
                placeholder="*****"
                hideText={true}
                value={confirmarClave}
                onChangeText={setConfirmarClave} />
            <ButtonRounded title="Confirmar" />    
            <ButtonRounded title="Iniciar sesion" isPrimary={false} />    
        </Layout>
    );
}