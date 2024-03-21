import axios from "axios";


const API = axios.create({ baseURL: "/api/teamLead" })

// API.interceptors.request.use((req) => {
//     try {
//         const token = localStorage.getItem("token");
//         if (token) {
//             req.headers.Authorization = `Bearer ${token}`;
//         }
//         console.log(req, '-------------req with token')
//         return req;
//     } catch (error) {
//         console.log(error.message, '---------error in api')
//     }
// });
export const getAllTasks = () => API.get('/allTasks')
export const taskAssign = (task) => API.post("/taskAssign", task)
export const forwardTask = (projectId) => API.post('/forward', { projectId })
export const reAssignTask = (projectId) => API.post('/reAssign', { projectId })
export const devUnderLead = (leadType) => API.get('/getDev')

export const leadTaskFiles = (projectId) => API.put('/getTaskFiles', { projectId })