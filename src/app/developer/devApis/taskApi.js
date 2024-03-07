import axios from "axios";

const API = axios.create({ baseURL: "/api/developer" })

export const devAllTasks = () => API.get("/allTasks");
export const verifierTasks = () => API.get("/verifierProjects");
export const allProjectFiles = (data) => API.post("/allProjectFiles", data);
export const dataVerified = (data) => API.put("/dataVerified", data);

export const startTask = (projectId) => API.post("/startTask", { projectId });
export const completeTask = (projectId) => API.post("/complete", { projectId });

