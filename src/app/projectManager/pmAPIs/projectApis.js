import axios from "axios";
// import Cookies from "js-cookie";

const API = axios.create({ baseURL: "/api/projectManager" })

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
export const pmAllProjects = () => API.get('/allProjects');
export const pmProjectFiles = (data) => API.put('/fetchClientfiles', data);
export const projectCompleted = (projectId) => API.put('/complete', { projectId })
