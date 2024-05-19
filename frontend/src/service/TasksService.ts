import axios from "axios";

export const getAllTasks = (token: any) => axios.get('http://localhost:8080/api/tasks', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const createTask = (task: any, token: any) => {
    const formatedTask = {
        ...task, deadline: task.deadline.replace("T", " ")
    };

    return axios.post('http://localhost:8080/api/tasks', formatedTask,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
};

export const updateTask = (taskId: number, task: any, token: any) => {
    const formatedTask = {
        ...task, deadline: task.deadline.replace("T", " ")
    };

    return axios.put(`http://localhost:8080/api/tasks/${taskId}`, formatedTask,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
};

export const deleteTask = (taskId: number, token: any) => axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});