import instance from "../../utils/apiHelper";

const ADD_TODO_POST_URL = "toDo/add";
const GETTODO_GET_URL = "toDo/data";
const UPDATODO_PATCH_URL = "toDo/upd";
const DELETETODO_DELATE_URL = "toDo/del";

export const signupTodoRoute = (data) => {
    return instance.post(`${ADD_TODO_POST_URL}`, data);
};
export const getTodoRoute = (data) => {
    return instance.post(`${GETTODO_GET_URL}`, data);
};
export const updateTodoRoute = (data) => {
    return instance.post(`${UPDATODO_PATCH_URL}`, data);
};
export const deleteTodoRoute = (data) => {
    return instance.post(`${DELETETODO_DELATE_URL}`, data);
};