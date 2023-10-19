import { ACTION } from "./App";

function Digit({digit, dispatch}){
    return <button 
    onClick={() => dispatch({type: ACTION.ADD_DIGIT, payload: {digit}})}>
        {digit}
    </button>;
}

export default Digit;