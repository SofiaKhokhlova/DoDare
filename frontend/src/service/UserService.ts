import axios from "axios";

const register = (user: any) => axios.post('http://localhost:8080/api/auth/register', user);

export default register;