import axios from "axios";

const API = axios.create({ baseURL: "/api" })

export const pmLogInApi = (formData) => API.post("/projectManager/login", formData);
export const logOut = () => API.get("/users/logout")
