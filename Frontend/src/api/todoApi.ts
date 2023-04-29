import axios from 'axios'


const todoApi = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
}); 

export default todoApi;