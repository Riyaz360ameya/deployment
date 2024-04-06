import axios from "axios";

const API = axios.create({ baseURL: "/api/developer" })

API.interceptors.request.use((req) => {
    try {

        const token = localStorage.getItem("token");
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    } catch (error) {
        console.log(error.message, '---------error in api')
    }
});


// Developer
export const allProjectFiles = (data) => API.post("/allProjectFiles", data);
export const startTask = (projectId) => API.post("/startTask", { projectId });
export const completeTask = (projectId) => API.post("/complete", { projectId });

// Dev & Verifier
export const devAllTasks = () => API.get("/allTasks");


// Verifier
export const verifierTasks = () => API.get("/verifierProjects");
export const dataVerified = (data) => API.put("/dataVerified", data);
export const verifierFiles = (projectId) => API.post('/verifierFiles', { projectId })





