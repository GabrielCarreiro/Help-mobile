import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: rgb(64,62,63);
    padding: 10px;
`;

export const Tasks = styled.View`
    flex: 1;
`;

export const TasksView = styled.View`
    background-color: rgba(239, 80, 40, 131);
    border: 1px solid white;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

export const TasksText = styled.Text`
    font-size: 16px;
    color: #3a3a3a;
    max-width: 80%;
`;

export const TasksIcons = styled.View`
    flex-direction: row;
`;

export const TasksButtons = styled.TouchableOpacity`
    padding: 5px;
`;

export const CompleteTasksText = styled.Text`
    margin-top: 200px;
`;