// This custom hook allows you to manage a state with an undo/redo history.
// It uses a circular buffer to store the history of states, allowing you to go back and forth between them.
// The `capacity` parameter defines the maximum number of states to keep in history.
// The `push` function updates the state and adds a new entry to the history.
// The `undo` function reverts to the previous state, and the `redo` function moves forward to the next state.
// This is useful for implementing features like undo/redo in applications where you need to track changes over time.
// Example usage:           
// const [state, push, undo, redo] = useStateWithHistory(initialState, 10);

import { useState, useRef, useCallback } from 'react' 

function useStateWithHistory(initialState, capacity = 10) 
{ 
    const [state, setState] = useState( initialState); 
    const history = useRef([initialState]); 
    const pointer = useRef (0); 

    const push = useCallback( (value) => { 
        const newHistory = history. current.slice(0, pointer. current + 1); 
        if (newHistory. length >= capacity) newHistory. shift(); 
        history.current = [...newHistory, value]; 
        pointer.current = history .current. length - 1; 
        setState(value); 
    }, [capacity]); 
    
    const undo = useCallback( ( ) => { 
        if (pointer.current > 0) { 
            pointer.current--; setState(history.current [pointer.current]); 
            return true; 
        } return false; 
    }, []); 
        
    const redo = useCallback( ( ) => { 
        if (pointer .current < history .current. length - 1) { 
            pointer.current++; 
            setState(history. current [pointer.current]);
            return true; 
        } 
        return false;
    }, []);
        
    return [state, push, undo, redo];
}
export default useStateWithHistory;
