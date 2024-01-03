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
export const pmAllProjects = () => API.get('/projectManager/allProjects');
export const projectCompleted = (projectId) => API.put('/api/projectManager/complete', { projectId })
