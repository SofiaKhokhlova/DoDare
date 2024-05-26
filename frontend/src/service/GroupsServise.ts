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

export const getAllGroupParticipants = (groupId: number, token: any) => axios.get(`http://localhost:8080/api/groups/usergroup/${groupId}`, {
    headers: {
        "Authorization": `Bearer ${token}`,
    },
});

export const getAllUserGroupTasks = (groupId: number, token: any) => axios.get(`http://localhost:8080/api/group-tasks/${groupId}`, {
    headers: {
        "Authorization": `Bearer ${token}`,
    },
});

export const createNewGroupTask = (groupId: number, task: any, token: any) => {
    const formatedTask = {
        ...task, deadline: task.deadline.replace("T", " ")
    };

    return axios.post(`http://localhost:8080/api/group-tasks/${groupId}`, formatedTask, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const updateTask = (groupId: number, taskId: number, task: any, token: any) => {
    const formatedTask = {
        ...task, deadline: task.deadline.replace("T", " ")
    };

    return axios.put(`http://localhost:8080/api/group-tasks/${groupId}/${taskId}`, formatedTask, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const deleteTask = (groupId: number, taskId: number, token: any) => axios.delete(`http://localhost:8080/api/group-tasks/${groupId}/${taskId}`, {
    headers: {
        "Authorization": `Bearer ${token}`,
    },
});

export const updateGroup = (groupId: number, group: any, token: any) => axios.put(`http://localhost:8080/api/groups/${groupId}`, group, {
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export const deleteGroup = (groupId: number, token: any) => axios.delete(`http://localhost:8080/api/groups/${groupId}`, {
    headers: {
        "Authorization": `Bearer ${token}`,
    },
});