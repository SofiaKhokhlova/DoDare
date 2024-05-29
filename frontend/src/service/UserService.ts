import axios from "axios";

export const register = (user: any) => axios.post('http://localhost:8080/api/auth/register', user);

export const login = (user: any) => axios.post('http://localhost:8080/api/auth/login', user);

export const userDetails = (token: any) => axios.get('http://localhost:8080/api/user/me', {
    headers: {
        'Authorization': `Bearer ${token}`
    },
});
