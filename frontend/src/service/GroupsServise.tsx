import axios from "axios";

export const createGroup = (group: any, token: any) => axios.post("http://localhost:8080/api/groups", group, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});

export const getAllUserGroups = (token: any) => axios.get("http://localhost:8080/api/groups", {
    headers: {
        "Authorization": `Bearer ${token}`,
    },
});