import axios from "axios";

const API = axios.create({ baseURL: "/api/users" })

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

export const uploadProject = (formData) => API.post("/projectInput", formData);
export const userProjects = () => API.get("/projectData");





