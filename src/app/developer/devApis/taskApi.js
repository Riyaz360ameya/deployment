import axios from "axios";

const API = axios.create({ baseURL: "/api/developer" })

export const devAllTasks = () => API.get("/allTasks");

export const startTask = (projectId) => API.post("/startTask", { projectId });
export const completeTask = (projectId) => API.post("/complete", { projectId });

