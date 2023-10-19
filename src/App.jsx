import React, { useReducer } from "react";
import './App.css';
import Digit from "./Digit";
import Operation from "./Operation";

export const ACTION = {
  ADD_DIGIT: "add-Digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "chose-operation",
  EQUALS: "equals"
}

function reducer(state, {type, payload}){
  switch(type){

    case ACTION.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0"){
        return state;
      }else if(payload.digit === "." && (state.currentOperand == null || state.currentOperand.includes("."))){
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

      case ACTION.CLEAR:
        return{}
        
      case ACTION.CHOOSE_OPERATION:
        if(state.currentOperand == null && state.previousOperand == null){
            return state;
        }
        if(state.previousOperand == null){
          return{
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }
        if(state.previousOperand != null && state.currentOperand == null){
          return{
            ...state,
            operation: payload.operation,
          }
        }
        if(state.previousOperand != null && state.currentOperand != null){
              return{
                ...state,
                previousOperand: calculate(state),
                currentOperand: null,
                operation: payload.operation,
              }
            }
          case ACTION.EQUALS:
            if(state.previousOperand == null || state.currentOperand == null || state.operation == null) return state;
            return {
              ...state,
              overwrite: true,
              currentOperand: calculate(state),
              previousOperand: null,
              operation: null,
            }
          case ACTION.DELETE_DIGIT:
            if(state.currentOperand == null) return state;
            if(state.overwrite){
              return {
                ...state,
                overwrite: false,
                currentOperand: null,
                previousOperand: null,
                operation: null,
              }
            }
            if(state.currentOperand.length === 1){
              return {
                ...state,
                currentOperand: null,
              }
            }
            return {
              ...state,
              currentOperand: state.currentOperand.slice(0, -1),
            }
        }
        
        
  }

  function calculate({previousOperand, currentOperand, operation}){
    const firstNum = parseFloat(previousOperand);
    const secondNum = parseFloat(currentOperand);
    let equals = "";
    if(isNaN(firstNum) || isNaN(secondNum)) return "";
    switch(operation){
      case "/":
        equals = firstNum / secondNum;
        break;
        case "*":
        equals = firstNum * secondNum;
        break;
        case "+":
        equals = firstNum + secondNum;
        break;
        case "-":
        equals = firstNum - secondNum;
        break;
    }
  
    return equals.toString();
  }

function App(){

  const [{currentOperand, previousOperand, operation}, dispatch] = 
  useReducer(reducer, {});

  return(
    <>
    <div className="calculator-grid">
     <div className="output">
      <div className="previous-operand">{previousOperand}{operation}</div>
      <div className="current-operand">{currentOperand}</div>
     </div>
     <button className="span-two" onClick={() => 
      dispatch({type: ACTION.CLEAR})}>AC</button>
     <button onClick={() => dispatch({type: ACTION.DELETE_DIGIT})}>DEL</button>
     <Operation operation={"/"} dispatch={dispatch}></Operation>
     <Digit digit={"1"} dispatch={dispatch}></Digit>
     <Digit digit={"2"} dispatch={dispatch}></Digit>
     <Digit digit={"3"} dispatch={dispatch}></Digit>
     <Operation operation={"*"} dispatch={dispatch}></Operation>
     <Digit digit={"4"} dispatch={dispatch}></Digit>
     <Digit digit={"5"} dispatch={dispatch}></Digit>
     <Digit digit={"6"} dispatch={dispatch}></Digit>
     <Operation operation={"+"} dispatch={dispatch}></Operation>
     <Digit digit={"7"} dispatch={dispatch}></Digit>
     <Digit digit={"8"} dispatch={dispatch}></Digit>
     <Digit digit={"9"} dispatch={dispatch}></Digit>
     <Operation operation={"-"} dispatch={dispatch}></Operation>
     <Digit digit={"."} dispatch={dispatch}></Digit>
     <Digit digit={"0"} dispatch={dispatch}></Digit>
     <button className="span-two" onClick={() => 
      dispatch({type: ACTION.EQUALS})}>=</button>
     </div>
    </>
  );
}

export default App;