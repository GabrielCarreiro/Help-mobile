import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, 
    TasksView, 
    TasksIcons, 
    TasksButtons, 
    TasksText, 
    Tasks, 
    CompleteTasksText} from './styles';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';


const AllTasks = ({navigation}) => {
   const [tasks, setTasks] = useState([]);
    const [userAuth, setUserAuth] = useState([]);
    const [listTask, setLitsTask] = useState([]);
    const useFocused = useIsFocused();

    const loadTasks = async () => {
        try {
            const response = await api.get('tarefas')
            setTasks(response.data)
        } catch (error) {
            console.log(error, "Erro ao carregar as tasks")
        }
    }

    const loadUserAuth = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('@HELP:user'));
            setUserAuth(user)
        } catch (error) {
            console.log("Erro ao carregar o usuario", error)
        }
    }

    useEffect(() => {
        loadTasks();
        loadUserAuth();
        validarTasks()
    }, []);

    useEffect(() => {
        loadTasks();
        validarTasks();
    }, [useFocused ]);

    function validarTasks() {
        let colletionTasks = [];
        tasks.map(task => {
            if (task.usuarioId === userAuth.id) {
                colletionTasks.push(task)
            }
        })
        setLitsTask(colletionTasks)
    }
    async function updateTasks(task) {

        const params = {
            ...task,
            concluido: !task.concluido
        }
        try {
            await api.put(`tarefas/${task.id}`, params);
        } catch (error) {
            console.log('Erro ao atualizar a tarefa', error)
        }finally{
            loadTasks();
            validarTasks();
        }
    }

 


    async function deleteTasks(task) {
        try {
            await api.delete(`tarefas/${task.id}`)
        } catch (error) {
            console.log("Erro ao deletar a tarefa", error)
        }finally{
            loadTasks();
            validarTasks();
        }
    }

    return (
        <Container>
            {listTask.length === 0 ? (
                <CompleteTasksText>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold'}}>Parabéns!{"\n"}Você não possui tarefas.</Text>
                </CompleteTasksText>
            ) : (
                    <Tasks>
                        {listTask.map(task => {
                            return (
                                <TasksView key={task.id}>
                                    <TasksText style={{color: "white"}} > {task.descricao}</TasksText>
                                    <Text> {task.concluido ? (
                                        <TasksIcons>
                                            <TasksButtons onPress={() => updateTasks(task)}>
                                                <Feather name="check-circle" size={24} color="white" />
                                            </TasksButtons>
                                            <TasksButtons onPress={() => deleteTasks(task)}>
                                                <Feather name="delete" size={24} color="white" />
                                            </TasksButtons>

                                        </TasksIcons>
                                    ) : (
                                            <TasksButtons onPress={() => updateTasks(task)}>
                                                <Feather name="circle" size={24} color="white"  />
                                            </TasksButtons>

                                        )}
                                    </Text>
                                </TasksView>
                            )
                        })}
                    </Tasks>
                )}
        </Container>
    )
};

export default AllTasks ;