import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';

export default function LoginScreen({ navigation }){
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');

    function entrar(){
    // logica 
    navigation.navigate('Parking Map'); // ir a screen Mapa de parqueo
    }

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
            <ButtonRounded title="Iniciar Sesion" onPress={iniciarSesion} />    
            <ButtonRounded title="Registrarse" isPrimary={false} 
                onPress={() => navigation.navigate('Register')} />    
        </Layout>
    );
}