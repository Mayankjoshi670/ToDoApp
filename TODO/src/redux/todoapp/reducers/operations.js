import { ADD_TODO, DELETE_ALL, REMOVE_TODO, UPDATE_CHECKBOX, UPDATE_TODO } from "../actions";
const initialState = [
    { id: 1, todo: 'Buy Laptop', completed: false },
    { id: 2, todo: 'Master Redux', completed: false },
    { id: 3, todo: 'Watering Plants', completed: true },
];
export const operationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            // Prepend the new todo item to the beginning of the array
            return [action.payload, ...state];
        case DELETE_ALL:
            return [];
        case REMOVE_TODO:
            const filteredTodos = state.filter((todo) => todo.id !== action.payload);
            return filteredTodos;
        case UPDATE_TODO:
            let data = action.payload;
            const updatedArray = state.map((item) => {
                if (item.id === data.id) {
                    return {
                        ...item,
                        todo: data.todo,
                        completed: data.completed
                    };
                }
                return item;
            });
            return updatedArray;
        case UPDATE_CHECKBOX:
            const updatedCheckboxArray = state.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed
                    };
                }
                return item;
            });
            return updatedCheckboxArray;
        default:
            return state;
    }
};
