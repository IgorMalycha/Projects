import { ACTION } from "./App";

function Operation({operation, dispatch}){
    return <button onClick={() => 
        dispatch({type: ACTION.CHOOSE_OPERATION, payload: {operation}})}>
            {operation}
        </button>;
}

export default Operation;