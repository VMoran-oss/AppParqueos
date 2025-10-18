import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';

export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');

    return (
        <Layout>
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
            <ButtonRounded title="Iniciar Sesion" />    
            <ButtonRounded title="Registrarse" isPrimary={false} />    
        </Layout>
    );
}