import React, { useState, useEffect, useCallback } from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import { ViewMessage, MessageText} from './styles'

import firebase from 'firebase';
import 'firebase/firestore';

const Chat = () =>{
    const [messageUser, setMessageUser] = useState();
    const [allMessage, setAllMessage] = useState([]);
    console.log(messageUser)

    const loadMessage = useCallback(
        async () => {
          try {
            const response = await firebase.firestore().collection('help-chat').get();
            const temp = [];
            response.forEach(doc => {
              // console.log(doc.id, '=>', doc.data());
              temp.push({id: doc.id, ...doc.data()});
            })
            setAllMessage(temp);

          } catch (error) {
            console.log('error loadMessage', error);
          }
      },[]);
   
    useEffect(() =>{
        loadMessage()
    },[])

    const onTarefasChanged = useCallback(snap => {
        const data = snap.docs.map(doc => ({id: doc.id, ...doc.data()}));

        setAllMessage(data);
        loadMessage();
      }, []);

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('help-chat').onSnapshot(onTarefasChanged);
        return () => unsubscribe();
      }, [])

    console.log(allMessage)
    
    const handleAddTask =  async () => {
          try {
            await firebase.firestore().collection('help-chat').add({
             message: messageUser
            });
            setMessageUser("");
            loadMessage();
          } catch (error) {
            console.log("error handleAddTask:", error);
          }
    }
/*  */

    return (
        <>  
            <ViewMessage>
                {allMessage.map(mess =>{
                    return(
                    <MessageText key={mess.id}> {mess.message}</MessageText>
                    )
                })}
            </ViewMessage>
            <View style={{justifyContent:"center", flex: 1, alignItems:"center"}}>
                <TextInput  style={{width:200, backgroundColor:"red", color: "#fff"}} 
                            placeholder="Digite aqui"
                            value={messageUser} onChangeText={text => setMessageUser(text)}> 
                </TextInput>
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <Text> Enviar </Text>
                </TouchableOpacity>
            </View>
        </>
    )
};

export default Chat;