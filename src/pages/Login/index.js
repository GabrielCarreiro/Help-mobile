import React,{useState} from 'react';
import {View, Text, TouchableOpacity, ViewPagerAndroid} from 'react-native';
import { Container, Input, Button, ButtonText, Logo} from './styles';
import {useAuth} from '../../hooks/auth';
import { navigate } from '@react-navigation/native';

const Login = ({navigation}) =>{
    var {signIn} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const handleSubmit = async () => {
        if(!email) return;
        if(!password) return;
        
      try {
        await signIn({email, password});
        console.log("handleSubmit success");
      } catch (error) {
        console.log("handleSubmit error", error);
      } 
    };

    return(
        <Container>
            <Logo source={{uri:"https://i.imgur.com/H9oAf6h.png"}} />
            <Input placeholder = "Email" value={email} onChangeText={text => setEmail(text)}/> 
            <Input placeholder = "Senha" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/> 
            <Button onPress={() => handleSubmit()}>
                <ButtonText> Acessar </ButtonText>
            </Button>
            <Button onPress={() => navigation.navigate('SignUp')}>
                <ButtonText> Cadastrar-se </ButtonText>
            </Button>
        </Container>
    )
}
export default Login;