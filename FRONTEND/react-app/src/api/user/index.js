import instance from "../../utils/apiHelper";

const SIGNUP_USER_POST_URL = "user/signup";
const LOGIN_USER_POST_URL = "user/login";
const GETUSER_GET_URL = "user/data";
const UPDAUSER_PATCH_URL = "user/update";
const DELETEUSER_DELATE_URL = "user/delete";

export const signupUserRoute = (data) => {
    return instance.post(SIGNUP_USER_POST_URL, data);
};
export const loginUserRoute =(data) => {
    return instance.post(`${LOGIN_USER_POST_URL}`, data);
};
export const getUserRoute = () => {
    return instance.get(`${GETUSER_GET_URL}`);
};
export const updateUserRoute = (data) => {
    return instance.patch(`${UPDAUSER_PATCH_URL}`, data);
};
export const deleteUserRoute = () => {
    return instance.delete(DELETEUSER_DELATE_URL);
};
