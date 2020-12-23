import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3333",
    timeout: 10000,
    contentType: "application/json; charset=utf-8",
});


export default api;