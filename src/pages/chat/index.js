import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text, ScrollView } from 'react-native';
import { Container, MessageView, MessageText, MessageTextUser, MessageSendView, MessageSendInput, MessagenSendButton } from './styles'
import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'firebase';
import 'firebase/firestore';

const Chat = () => {
  const [messageUser, setMessageUser] = useState();
  const [allMessage, setAllMessage] = useState([]);
  const [userAuth, setUserAuth] = useState();
  const scrollViewRef = useRef();

  function ordemDecrescente(a, b) {
    return a.date > b.date;
  }


  const loadMessage = useCallback(
    async () => {
      try {
        const response = await firebase.firestore().collection('help-chat').get();
        const temp = [];
        response.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          temp.push({ id: doc.id, ...doc.data() });
        })
        temp.sort(ordemDecrescente);
        setAllMessage(temp);

      } catch (error) {
        console.log('error loadMessage', error);
      }
    }, []);

  const loadUserAuth = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('@HELP:user'));
      setUserAuth(user)
    } catch (error) {
      console.log("Erro ao carregar o usuario", error)
    }
  }

  useEffect(() => {
    loadMessage()
    loadUserAuth()
  }, [])

  const onTarefasChanged = useCallback(snap => {
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setAllMessage(data);
    loadMessage();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('help-chat').onSnapshot(onTarefasChanged);
    return () => unsubscribe();
  }, [])

  console.log(allMessage)

  const handleAddTask = async () => {

    if (!messageUser) return;

    try {
      await firebase.firestore().collection('help-chat').add({
        message: messageUser,
        date: new Date,
        user: userAuth.id,
        name: userAuth.nome
      });
      setMessageUser("");
      loadMessage();
    } catch (error) {
      console.log("error handleAddTask:", error);
    }
  }


  const loadAllMessage = useCallback(() => {
    return allMessage.map(mess => {
      if (mess.user === userAuth.id) {
        return <MessageTextUser key={mess.id}> {mess.name} {'\n'} {mess.message}</MessageTextUser>
      } else {
        return <MessageText key={mess.id}> {mess.name} {'\n'} {mess.message} </MessageText>
      }
    })
  }, [allMessage])


  console.log(userAuth)

  return (
    <>
      <Container>
        <MessageView>
          < ScrollView ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            {loadAllMessage()}
          </ScrollView>
        </MessageView>
        <MessageSendView >
          <MessageSendInput style={{ color: "#fff" }}
            placeholder="Digite aqui"
            placeholderTextColor="white"
            value={messageUser} onChangeText={text => setMessageUser(text)}>
          </MessageSendInput >
          <MessagenSendButton onPress={() => handleAddTask()}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}> Enviar </Text>
          </MessagenSendButton>
        </MessageSendView>
      </Container>
    </>
  )
};

export default Chat;