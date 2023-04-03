import axios from "axios"

const api = axios.create({
    baseURL: "https://projeto-full-stack-api.onrender.com/",
    timeout: 5000
})

export default api