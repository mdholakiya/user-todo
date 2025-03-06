import instance from "../../utils/apiHelper";

const ADD_TODO_POST_URL = "toDo/add";
const GETTODO_GET_URL = "toDo/data";
const UPDATODO_PATCH_URL = "toDo/upd";
const DELETETODO_DELATE_URL = "toDo/del";

export const loginTodoRoute = (data) => {
    return instance.post(`${ADD_TODO_POST_URL}`, data);
};
export const getTodoRoute = () => {
    return instance.get(GETTODO_GET_URL);
};
export const updateTodoRoute = (data) => {
    return instance.patch(`${UPDATODO_PATCH_URL}`, data);
};
export const deleteTodoRoute = (id) => {
    return instance.delete(`${DELETETODO_DELATE_URL}/${id}`);
};