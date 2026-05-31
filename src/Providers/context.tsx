import {createContext, type ReactNode, useReducer} from 'react'
import type {ITodo} from "../Types/ITodo.ts";

export const TODO_ACTIONS = {
    ADD: "ADD_TODO", EDIT: "EDIT_TODO", DELETE: "DELETE_TODO", TOGGLE_STATUS: "TOGGLE_STATUS_TODO"
} as const

const initialState = {
    todos: []
}

interface ITodos {
    id: string;
    title: string;
    done: boolean;
}

type IAction =
    | { type: 'ADD_TODO'; payload: ITodo }
    | { type: 'DELETE_TODO'; payload: { id: string } }
    | { type: 'TOGGLE_STATUS_TODO'; payload: { id: string; done: boolean } }
    | { type: 'EDIT_TODO'; payload: { id: string; title: string } }

interface IState {
    todos: ITodos[];
}

interface IContext {
    state: IState;
    dispatch: React.Dispatch<IAction>;
}

export const TodoContext = createContext<IContext>({
    state: initialState,
    dispatch: () => {}
})

const reducer = (state: IState = initialState, action: IAction): IState => {
    const {type, payload} = action
    switch (type) {
        case TODO_ACTIONS.ADD: {
            return {...state, todos: [...state.todos, payload]}
        }
        case TODO_ACTIONS.DELETE: {
            return {
                ...state,
                //     todo: fix
            }
        }
        case TODO_ACTIONS.TOGGLE_STATUS: {

            return {
                ...state,
                todos: state.todos.map(item => item.id === payload.id ? ({...item, done: payload.done}) : item)
            }
        }
        case TODO_ACTIONS.EDIT: {
            return {
                ...state, todos: state.todos.map(item => {
                    const newTodo = {...item, ...payload}
                    return item.id === action.payload.id ? newTodo : item
                })
            }
        }
        default:
            return state
    }
}


const TodoProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TodoContext value={{state, dispatch}}>
            {children}
        </TodoContext>)
}

export default TodoProvider;