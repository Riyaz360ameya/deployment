
import axios from "axios";

const API = axios.create({ baseURL: "/api/projectManager" })

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

export const allLeadTasks = () => API.get("/allTasks")
export const assignLeadTask = (task) => API.post('/taskAssign', task);

export const addTeamLead = (user) => API.post('/addTeamLead', user);
export const addDev = (user) => API.post('/addDeveloper', user);
export const getAllLeads = () => API.get('/allLeadsData');
