import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text, ScrollView, View } from 'react-native';
import {  Container,
          MessageView, 
          MessageText,
          MessageTextUser, 
          MessageSendView, 
          MessageSendInput, 
          MessagenSendButton,
          UserName,
          GetMessage } from './styles'
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesome } from '@expo/vector-icons'; 

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

  const onMessageChanged = useCallback(snap => {
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setAllMessage(data);
    loadMessage();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('help-chat').onSnapshot(onMessageChanged);
    return () => unsubscribe();
  }, [])

  const sendMessage = async () => {

    if (!messageUser) return;

    let date = new Date;
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let time = hours +':'+  minutes

    try {
        await firebase.firestore().collection('help-chat').add({
        message: messageUser,
        date: new Date,
        user: userAuth.id,
        name: userAuth.nome,
        time: time 
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
      return <MessageTextUser key={mess.id}> 
                  <UserName > {mess.name} </UserName>  
                  <GetMessage> 
                    <Text style={{fontSize: 12, color:'#fff'}}>{mess.time}  </Text> 
                    <Text style={{fontSize: 16, color:'#fff',  textAlign:'right', width:'92%' }}>{mess.message} </Text>
                  </GetMessage>   
              </MessageTextUser>
      } else {
        return <MessageText key={mess.id}> 
                  <UserName > {mess.name} </UserName>  
                  <GetMessage> 
                    <Text style={{fontSize: 12, color:'#fff'}}>{mess.time}  </Text> 
                    <Text style={{fontSize: 16, color:'#fff', textAlign:'right', width:100}}>{mess.message} </Text>
                  </GetMessage>   
                </MessageText>
              }
          })
  }, [allMessage])


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
          <MessagenSendButton onPress={() =>  sendMessage()}>
            <FontAwesome name="location-arrow" size={28} color="black" onPress={() => sendMessage()} style={{transform: [{ rotate: "45deg" }]}} />
          </MessagenSendButton>
        </MessageSendView>
      </Container>
    </>
  )
};

export default Chat;