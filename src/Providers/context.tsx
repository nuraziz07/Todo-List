import {createContext, useReducer} from 'react'

export const TODO_ACTIONS = {
    ADD: "ADD_TODO", EDIT: "EDIT_TODO", DELETE: "DELETE_TODO", TOGGLE_STATUS: "TOGGLE_STATUS_TODO"
}

const initialState = {
    todos: []
}

export const TodoContext = createContext(initialState)

const reducer = (state = initialState, action) => {
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

const TodoProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (// todos, onDelete, onAdd, onUpdate
        <TodoContext value={{state, dispatch}}>
            {children}
        </TodoContext>)
}

export default TodoProvider;