import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import { Picker } from '@react-native-community/picker'
import { useAuth } from '../../hooks/auth';
import Accordion from "../../components/Accordion";
import api from '../../services/api'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import {Header,
        ViewLogout,
        Container,
        LogoutText,
        ButtonTextHome,
        Expandir, 
        Texto,
        Input,
        AccordionView,
        ButtonSignUp,
        ButtonSignUpText,
        ButtonView,
        ButtonAdd,
        ButtonDelProject,
        SignUserButton,
        SelectUserView,
        PickerUser,
        Tela
        } from './styles.js';



const Project = () => {
    const [projects, setProjects] = useState([]);
    const [selectUser, setSelectUser] = useState();
    const [display, setDisplay] = useState('flex');
    const [newProjects, setNewProjects] = useState();
    const [userAuth, setUserAuth] = useState();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTasks, setNewTasks] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const { signOut } = useAuth();
    const useFocused = useIsFocused();

    //Função que obtêm da api todas os projetos.
    const loadProjects = async () => {
        try {
            const response = await api.get('projetos')
            setProjects(response.data)
        } catch (error) {
            console.log("Erro ao carregar os projetos", error)
        }
    };

    //Função que obtêm o usuario logado no sistema .
    const loadUserAuth = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('@HELP:user'));
            setUserAuth(user)
        } catch (error) {
            console.log("Erro ao carregar o usuario logado", error)
        }finally{
            setSelectUser(null)
            setDisplay('flex')
        }
    };

    //Função que obtêm da api todos os usuarios
    const loadUser = async () => {
        try {
            const response = await api.get('usuarios')
            setUsers(response.data)
        } catch (error) {
            console.log(error, "Erro ao carregar os usuarios")
        }
    };
    
    //Função que obtêm da api todos as tarefas
    const loadTasks = async () => {
        try {
            const response = await api.get('tarefas')
            setTasks(response.data)
        } catch (error) {
            console.log(error, "Erro ao carregar as tasks")
        }
    };

    useEffect(() => {
        loadProjects();
        loadTasks();
        loadUser();
        loadUserAuth();
    }, []);

    useEffect(() => {
        loadUserAuth();
        loadTasks();
    }, [useFocused || false]);

    //Função para cadastrar os projetos na API.
    async function addProjects() {

        if (!newProjects) return;
        let project = projects[projects.length - 1];

        const params = {
            "descricao": newProjects,
            "idUsuario": userAuth.id,
            "id": project.id + 1
        };

        try {
            await api.post(`projetos`, params)
        } catch (error) {
            console.log("eita carai", error)
        }finally{
            setNewProjects(null);
            setSelectUser(null);
            setDisplay('flex');
            loadProjects();
        }
    }

    //Funcão para adicionar na API uma nova tarefas.
    async function addTasks(proj) {

        if (!selectedValue || selectedValue === 0) return;
        if(!newTasks) ret
        let task = tasks[tasks.length - 1];

        const params = {
            "descricao": newTasks,
            "concluido": false,
            "projetoId": proj.id,
            "usuarioId": selectedValue,
            "id": task.id + 1
        };

        try {
            await api.post('tarefas', params)
        } catch (error) {
            console.log("Erro ao carregar a tarefa", error)
        }finally{
            loadProjects();
            loadTasks();
            setNewTasks(null)
            setSelectedValue(null)
        }
    }

    //Função para deletar da API o projetos e todas as tarefas vinculadas a esse projeto.
    async function Delete(proj) {

        if (userAuth.id != proj.idUsuario) return;
        try {
            await api.delete(`projetos/${proj.id}`)
        } catch (error) {
            console.log(error, "delete error")
        }
        tasks.map(async (task) => {
            if (task.projetoId === proj.id) {
                try {
                    await api.delete(`tarefas/${task.id}`)
                } catch (error) {
                    console.log(error, 'Erro ao deletar a tarefa')
                }finally{
                    loadProjects();
                    loadTasks();
                }
            }
        })
    }


    //Função para listar todas as tarefas na tela do usuario.
    function validarTasks(proj) {
        return tasks.map(task => {
            if (task.projetoId === proj.id) {
                return <Expandir key={task.id} >
                            <Texto>
                                {task.descricao}
                            </Texto>
                            {users.map(user => {
                                if (user.id === task.usuarioId) {
                                    return <Texto key={user.id} style={{textAlign: 'center'}}> {user.nome} </Texto>
                                }
                            })}
                            <Texto>
                                {task.concluido ? "Concluida" : "Pendente"}
                            </Texto>
                        </Expandir>
                    }
                })
            }

    //Função que abre no acordeão uma view para cadastro das tarefas 
    function InputTasks(proj) {
        let teste = proj;
        return (
            <View>
                <Input  value={newTasks} 
                        onChangeText={text => setNewTasks(text)}   
                        placeholder="Digite o nome da tarefa"
                        placeholderTextColor="white">
                </Input>
                <SelectUserView>
                    <PickerUser 
                        style={{color:'white' ,backgroundColor: '#403E3F'}}
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>    
                        <Picker.Item label="Selecione um usuario" value={0} />
                            {users.map(user => {
                                return (
                                    <Picker.Item key={user.id} label={user.nome} value={user.id} />
                                )
                            })}
                    </PickerUser>
                    <Feather name="arrow-down" size={24} color="white" />
                </SelectUserView>
                <SignUserButton onPress={() => addTasks(teste)}>
                    <Text style={{color:"white", fontWeight:"bold"}}> Cadastrar </Text>
                </SignUserButton>
            </View>
        )
    }

    
    function buttonView() {
        setSelectUser('view')
        setDisplay('none')
    }

    function buttonAdd() {
        setSelectUser('add')
        setDisplay('none')
    }

    return (
        <Tela>  
            <Header>
                <ViewLogout>
                    <Feather name="arrow-left" size={28} color="white" onPress={() => signOut() } />
                    <LogoutText onPress={() => signOut() }> Logout </LogoutText>
                </ViewLogout>
            </Header>
           
            <Container>
                <ButtonView style={{ display: display }} onPress={() => buttonView()}>
                    <ButtonTextHome> Visualizar Projetos</ButtonTextHome>
                </ButtonView>

                <ButtonAdd style={{ display: display }} onPress={() => buttonAdd()}>
                    <ButtonTextHome> Criar Projeto </ButtonTextHome>
                </ButtonAdd>

                {selectUser === 'view' ? (
                    <AccordionView>
                        {projects.map((proj) => {
                            return (
                                <Accordion
                                    key={proj.id}
                                    title={proj.descricao}
                                    content={validarTasks(proj)}
                                    excluir={<ButtonDelProject onPress={() => Delete(proj)}>
                                        <Feather name="delete" size={24} color="white" />
                                    </ButtonDelProject>}
                                    add={<Feather name="plus-circle" size={24} color="white" />}
                                    input={InputTasks(proj)}
                                />
                            )
                        })}
                    </AccordionView>
                ) : (
                        <View>
                            {selectUser &&
                                <View>
                                    <Input value={newProjects}
                                        onChangeText={text => setNewProjects(text)}
                                        placeholder="Digite o nome projeto"
                                        placeholderTextColor="white">
                                    </Input>
                                    <ButtonSignUp>
                                        <ButtonSignUpText onPress={() => addProjects()}> Cadastrar </ButtonSignUpText>
                                    </ButtonSignUp>
                                </View>
                            }
                        </View>
                    )}
            </Container>
        </Tela>
    )
};

export default Project;