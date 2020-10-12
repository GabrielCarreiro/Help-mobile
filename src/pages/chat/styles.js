import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: rgb(64,62,63);
    height: 100%;
`;

export const MessageView = styled.View`
    margin-top: -10px;
    padding:10px 20px;
    background-color: rgb(64,62,63);
    height: 91%;
`;

export const MessageText = styled.Text`
    background-color: rgba(239, 80, 40, 131);
    margin: 10px;
    padding: 5px;
    color: #fff;
    font-size: 16px;
    border-radius: 8px;
`;

export const MessageSendView = styled.View`
    background-color: rgb(64,62,63);
    justify-content: center;
    align-items: flex-end;
    height: 48px;
    flex-direction: row;
    width: 100%;
`;

export const MessageSendInput = styled.TextInput`
    background-color: rgb(64,62,63);
    border-radius: 20px;
    border: 1px solid rgba(239, 80, 40, 131);
    width: 250px;
    font-size: 16px;
    height: 45px;
    padding: 10px;
    margin-bottom: 5px;
`;

export const MessagenSendButton = styled.TouchableOpacity`
    background-color: rgba(239, 80, 40, 131);
    height: 45px;
    width: 47px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border-radius: 50px;
    margin-bottom: 5px;
    margin-left: 5px;
`;

export const MessageTextUser = styled.View`
    background-color: rgba(239, 80, 40, 131);
    margin: 10px;
    padding: 5px;
    color: #fff;
    font-size: 16px;
    border-radius: 8px;
`;

export const UserName = styled.Text`
    text-align:right;
    font-size: 16px;
    color: #fff;
`;

export const GetMessage = styled.View`
    justify-content: space-between; 
    flex-direction: row;
    align-items: baseline ;
    
`;
