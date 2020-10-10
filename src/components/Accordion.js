
import React, { useState, useRef, } from "react";
import {Text, View} from 'react-native';
import {TitleProject, ButtonProject, ButtonAdd, TaskView, TaskUsers} from './styles';


function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState('none');
  const [setRotate, setRotateState] = useState("accordion__icon");
  const [HeightInput, setHeightInput] = useState('none');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? 'none' : setHeightState('flex')
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  function toggleInput() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightInput(
      setActive === "active" ? 'none' :setHeightInput('flex')
    );
  }

  return (
   <View>
      <ButtonProject className={`accordion ${setActive}`} onPress={() => toggleAccordion()}>
        {props.excluir} 
        
      <TitleProject>{props.title}</TitleProject>
      <ButtonAdd onPress={() => toggleInput()}>
          <Text style={{color:"white"}}>{props.add}</Text>
        </ButtonAdd>
      </ButtonProject>
      <TaskView style={{display:setHeight}}> 
          {props.content}
      </TaskView>
      <TaskUsers style={{display:HeightInput}}> 
       {props.input}
      </TaskUsers>
    </View>
  );
}

export default Accordion;
