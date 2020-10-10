import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    justify-content: center;
    align-items: center; 
`;

export const Logo = styled.Image`
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
    text-align:center;
    
    
`;

export const Button = styled.TouchableOpacity`
    background-color: rgba(239, 80, 40, 131);
    width: 250px;
    height: 50px;
    justify-content: center;
    align-items:center;
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 5px; 
`;

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px; 
`;
