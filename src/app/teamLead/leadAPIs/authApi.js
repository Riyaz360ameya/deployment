import axios from "axios";

const API = axios.create({ baseURL: "/api" })
export const logInApi = (user) => API.post("/teamLead/login", user)
export const logOut = () => API.get("users/logout")
