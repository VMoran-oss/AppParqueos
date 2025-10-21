import { useState, useEffect } from 'react';
import { Layout, Input, ButtonRounded } from '../components';
import MallSelection from './MallSelectionScreen';

export default function LoginScreen({ navigation }){
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');

    function iniciarSesion(){
    // logica 
    navigation.navigate('SignUp'); // ir a screen registrarse
    navigation.navigate('MallSelection'); // ir a screen registrarse
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
            <ButtonRounded title="Iniciar Sesion" onPress={() => navigation.navigate('MallSelection' ) }/>
            <ButtonRounded title="Registrarse" isPrimary={false}    
             onPress={() => navigation.navigate('SignUp')}/>
        </Layout>
    );
}