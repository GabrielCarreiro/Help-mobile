import React,{useState, useEffect} from 'react';
import api from '../../services/api'
import {Input,
        Container,
        ButtonInput,
        ButtonInputText,
        Logo} from './styles';

const SignUp = ({ navigation: { goBack } }) =>{
        const [newName, setNewName] = useState();
        const [newEmail, setNewEmail] = useState();
        const [newPassword, setNewPassword] = useState();
        const [users, setUsers] = useState([]);

        const loadUser = async () =>{
            try {
               const response = await api.get('usuarios') 
               setUsers(response.data)
            } catch (error) {
                console.log(error,"Erro ao carregar os usuarios")
            }
        }

        useEffect(() => {
            loadUser();
        },[])

        const addUser = async () =>{
            if(!newName) return;
            if(!newEmail) return;
            if(!newPassword) return;

            let user = users[users.length - 1]

            const params={
                "id": user.id +1,
                "nome": newName,
                "email": newEmail,
                "password": newPassword
            }
            try {
                await api.post(`usuarios`, params)
                loadUser();
                goBack();
            } catch (error) {
                console.log("Erro ao cadastrar", error)
            }
        }

    return(
        <Container>
            <Logo source={require('../../../assets/splash.png')} />
             <Input value={newName} onChangeText={text => setNewName(text)} placeholder="Digite seu nome" />
             <Input value={newEmail} onChangeText={text => setNewEmail(text)} placeholder="Digite seu email"/>
             <Input value={newPassword}  onChangeText={text => setNewPassword(text)} placeholder="Digite sua senha" secureTextEntry={true}/>
             <ButtonInput onPress={() => addUser()}>
                <ButtonInputText> Cadastrar</ButtonInputText>
             </ButtonInput>
        </Container>
       
    )
};

export default SignUp;
