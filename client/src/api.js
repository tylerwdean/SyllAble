import axios from "axios";

export const fetchSyllabi = async () => {
    const response = await axios.get("/api/syllabi");
    return response.data;
};
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, 
  });
  
  export default api;