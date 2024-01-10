import axios from "axios";

const API = axios.create({ baseURL: "/api" })

export const devLogInApi = (user) => API.post("/developer/login", user);
export const logOut = () => API.get("/users/logout")
