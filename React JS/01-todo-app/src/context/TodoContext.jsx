import { createContext, useContext, useReducer } from "react";

const TodoContext = createContext({
    todos: [{
        id: '',
        content: "",
        tags: [],
        type: '' // todo/completed/backlog
    }],
    dispatch: ({ type, payload }) => { },
    ACTIONS: {},
    // addTodo: (todo) => {},
    // removeTodo: (todo_id) => {}
});

// DEFAULT
const ACTIONS = {
    ADD_TODO: "ADD_TODO",
    EDIT_TODO_STATUS: "EDIT_TODO_STATUS",
    EDIT_TODO: 'EDIT_TODO',
    REMOVE_TODO: "REMOVE_TODO"
};

// reducer function

const reducerFnc = (current_state, action) => {
    try {
        switch (action.type) {
            case ACTIONS.ADD_TODO:
                return [...current_state, action.payload]
            case ACTIONS.EDIT_TODO_STATUS:
                const { id, type } = action?.payload;
                return current_state?.map(eachTodo => eachTodo.id === id ? {
                    ...eachTodo,
                    type: type
                } : eachTodo);
            case ACTIONS.EDIT_TODO:
                return current_state?.map(eachTodo => eachTodo.id === action.payload.id ? {
                    ...eachTodo,
                    ...action.payload.body
                } : eachTodo);
            case ACTIONS.REMOVE_TODO:
                return current_state?.filter(eachTodo => eachTodo.id !== action.payload?.id)
            default:
                return current_state;
        }
    } catch (error) {
        console.error(`${error.name} -> ${error.message}`);
        return current_state;
    }
};


const TodoContextProvider = (props) => {

    const [todos, dispatch] = useReducer(reducerFnc, []);

    return <TodoContext.Provider value={{ todos, dispatch, ACTIONS }}>
        {props?.children}
    </TodoContext.Provider>
}

const useTodoContext = () => {
    return useContext(TodoContext);
}

export { TodoContextProvider, useTodoContext };