import axios from "axios";


const API = axios.create({ baseURL: "/api" })

API.interceptors.request.use((req) => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        console.log(req, '-------------req with token')
        return req;
    } catch (error) {
        console.log(error.message, '---------error in api')
    }
});
export const getAllTasks = () => API.get('/teamLead/allTasks')
export const taskAssign = (task) => API.post("/teamLead/taskAssign", task)
export const reAssignTask = (projectId) => API.post('/teamLead/reAssign', { projectId })
export const forwardTask = (projectId) => API.post('/teamLead/reAssign', { projectId })

export const devUnderLead = (leadType) => API.put('/teamLead/getDev',{leadType})