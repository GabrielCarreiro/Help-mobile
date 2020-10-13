import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: #f0f0f5;
    justify-content: center;
    align-items:center;
    background-color: rgb(64,62,63);
    padding: 20px;
    flex:1;
`;

export const Logo = styled.Image`
    margin-left: 15px;
    width: 230px;
    height: 200px;
    
`;

export const Input = styled.TextInput`
    background-color: #fff;
    color: #303030;
    font-size: 18px; 
    width: 250px;
    height: 40px;
    padding: 0 10px;
    border-radius: 8px;
    margin-top:10px;
    margin-bottom:10px;
`;

export const ButtonInput = styled.TouchableOpacity`
background-color: rgba(239, 80, 40, 131);
    width: 250px;
    height: 40px;
    justify-content: center;
    align-items:center;
    border-radius: 8px;
    margin-top:10px;
    margin-bottom:10px;
`;

export const ButtonInputText = styled.Text`
    color: #fff;
    font-size: 18px; 
`;