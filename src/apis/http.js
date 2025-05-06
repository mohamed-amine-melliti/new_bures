import axios from 'axios';
const http = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
export default http;
//# sourceMappingURL=http.js.map