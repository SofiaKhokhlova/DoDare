import {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import '../css/myTask.css';
import {completeTask, createTask, deleteTask, getAllTasks, updateTask} from "../service/TasksService.ts";
import { useAppContext } from '../context/PointsContext.tsx';


function MyTask () {
    const { points, updatePoints } = useAppContext();

    type TaskList = {
        id: number;
        title: string;
        description: string;
        status: number;
        reward: number;
        deadline: string;
        userId: number;
    };

    const [tasks, setTasks] = useState<TaskList[]>([]);

    const sortTasks = (tasks: TaskList[]): TaskList[] => {
        return [...tasks].sort((a, b) => {
            if (a.status === 1 && b.status !== 1) {
                return 1;
            } else if (a.status !== 1 && b.status === 1) {
                return -1;
            } else {
                return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            }
        });
    };

    useEffect(() => {
        getAllTasks(localStorage.getItem("accessToken"))
            .then(response => {
                console.log(localStorage.getItem("accessToken"));
                const sortedTasks = sortTasks(response.data);
                setTasks(sortedTasks);
            })
            .catch(error => {
                console.error(error);
            })
    }, [updatePoints]);

    const [selectedTask, setSelectedTask] = useState<TaskList | null>(null);
    const [visibility, setVisibility] = useState('NewTask');
    const [changedTask, setChangedTask] = useState<TaskList | null>(null);

    useEffect(() => {
        if (selectedTask) {
            setChangedTask({
                id: selectedTask.id,
                title: selectedTask.title,
                description: selectedTask.description,
                status: selectedTask.status,
                reward: selectedTask.reward,
                deadline: selectedTask.deadline,
                userId: selectedTask.userId
            });
        }
    }, [selectedTask]);

    const [newTask, setNewTask] = useState<TaskList> ({
        id: Math.floor(Math.random() * (100000 - 3 + 1)) + 3,
        title: "",
        description: "",
        status: 0,
        reward: 0,
        deadline: "",
        userId: parseInt(localStorage.getItem("userId"))
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleInputTaskChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setChangedTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleAddTask: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (newTask.title && newTask.description && newTask.deadline && newTask.reward > 0) {
            createTask(newTask, localStorage.getItem("accessToken"))
                .then(response => {
                    const updatedTasks = sortTasks([...tasks, response.data]);
                    setTasks(updatedTasks);
                    setNewTask({
                        id: Math.floor(Math.random() * (100000 - 3 + 1)) + 3,
                        title: '',
                        description: '',
                        status: 0,
                        reward: 0,
                        deadline: '',
                        userId: parseInt(localStorage.getItem("userId"))
                    });
                })
                .catch(error => {
                    console.error(error);
                    console.log(localStorage.getItem("accessToken"));
                });
        } else {
            alert('Please fill out all fields to add a new task.');
        }
    };

    const handleTaskClick = (taskId: number) => {
        const task = tasks.find((task) => task.id === taskId);
        if (task){
            setSelectedTask(task);
            setVisibility("TaskInfo");
        }
    }

    const handleDeleteTask = (event: MouseEvent<HTMLButtonElement>, taskId: number) => {
        event.preventDefault();

        deleteTask(taskId, localStorage.getItem("accessToken"))
            .then(() => {
                const updatedTasks = tasks.filter(task => task.id !== taskId);
                setTasks(updatedTasks);

                if (selectedTask && selectedTask.id === taskId) {
                    setSelectedTask(null);
                }

                setVisibility('NewTask');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleChangeInfo = () => {
        setVisibility("TaskChange");
    }

    const handleSaveChangedTask: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (!changedTask) return;

        const updatedTask = {
            ...changedTask,
            reward: parseInt(String(changedTask.reward), 10)
        };

        updateTask(selectedTask.id, updatedTask, localStorage.getItem("accessToken"))
            .then(response => {
                const updatedTasks = tasks.map(task => task.id === updatedTask.id ? response.data : task);
                setTasks(sortTasks(updatedTasks));
                setSelectedTask(null);
                setVisibility('NewTask');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleTaskStatus = (taskId: number) => {
        completeTask(taskId, localStorage.getItem("accessToken"))
            .then(response => {
                updatePoints(response.data);

            })
            .catch(error => {
                console.log(error);
            })
    };

    const handelCancelChangingTask: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setVisibility('NewTask');
    }

    const handleCancelTaskInfo: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setVisibility('NewTask');
        setSelectedTask(null);
    }

    return(
        <>
            <div className="tasks">
                <div className="tasks-container">
                    <p className='your-tasks'>Your tasks</p>
                    <div className="task-overflow">
                        {tasks.length === 0 ?
                            (<p className="no-tasks">
                                You have no tasks.
                                <br/>Create your task in the form on the right.
                            </p>)
                            :(tasks.map((task) => (
                            <div key={task.id} className="task" onClick={() => {handleTaskClick(task.id)}}
                                 style={{backgroundColor: selectedTask && selectedTask.id === task.id ? '#C588EA' : '#CAA1E4',
                                        marginBottom: task.id === tasks[tasks.length - 1].id ? "0" : "1.574vh"}}>
                                <div className="title-deadline">
                                    <p className="task-title">{task.title}</p>
                                    <p className="task-deadline">available till: {task.deadline}</p>
                                </div>
                                <div className="task-content">
                                    <img src="/point.png" alt="point-img" />
                                    <p className="task-reward">{task.reward}</p>
                                    <input
                                        id={`taskCheckbox_${task.id}`}
                                        className='status'
                                        type="checkbox"
                                        checked={task.status === 1}
                                        onChange={() => handleTaskStatus(task.id)}
                                    />
                                    <label htmlFor={`taskCheckbox_${task.id}`} style={{backgroundColor: selectedTask && selectedTask.id === task.id ? '#C588EA' : '#CAA1E4'}}>
                                    </label>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>

                { visibility === 'NewTask' && <div className="new-task">
                    <p className="new-task-form-name">New task</p>
                    <form className="new-task-form">
                        <div className="new-task-title">
                            <input
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={newTask.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="new-task-description">
                        <textarea
                            placeholder="Description"
                            name="description"
                            value={newTask.description}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div className="new-task-reward">
                            <input
                                type="text"
                                placeholder="Reward"
                                name="reward"
                                value={newTask.reward === 0 ? "" : newTask.reward}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="new-task-deadline">
                            <input
                                type="datetime-local"
                                placeholder="Deadline"
                                name="deadline"
                                value={newTask.deadline}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="add-task" onClick={handleAddTask}>Add Task</button>
                    </form>
                </div> }

                { visibility === 'TaskInfo' && <div className="task-info">
                    <p className="task-info-name">Information</p>
                    <div className="task-info-title">
                        <p>{selectedTask.title}</p>
                    </div>
                    <div className="task-info-description">
                        <p>{selectedTask.description}</p>
                    </div>
                    <div className="task-info-reward">
                        <p>{selectedTask.reward}</p>
                    </div>
                    <div className="task-info-deadline">
                        <p>{selectedTask.deadline}</p>
                    </div>
                    <button className="change-info" onClick={handleChangeInfo}>Change</button>
                    <a href="" className="cancel-task-info" onClick={handleCancelTaskInfo}>Cancel</a>
                </div> }

                { visibility === 'TaskChange' && <div className="task-change">
                    <p className="task-change-form-name">Change Task</p>
                    <form className="task-change-form">
                        <div className="task-change-title">
                            <input
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={changedTask.title}
                                onChange={handleInputTaskChange}
                            />
                        </div>
                        <div className="task-change-description">
                            <textarea
                                placeholder="Description"
                                name="description"
                                value={changedTask.description}
                                onChange={handleInputTaskChange}
                            />
                        </div>
                        <div className="task-change-reward">
                            <input
                                type="text"
                                placeholder="Reward"
                                name="reward"
                                value={changedTask.reward}
                                onChange={handleInputTaskChange}
                            />
                        </div>
                        <div className="task-change-deadline">
                            <input
                                type="datetime-local"
                                placeholder="Deadline"
                                name="deadline"
                                value={changedTask.deadline}
                                onChange={handleInputTaskChange}
                            />
                        </div>
                        <button className="save-change-task" onClick={handleSaveChangedTask}>Save</button>
                        <button className="delete-change-task" onClick={(event) => handleDeleteTask(event, changedTask.id)}>Delete</button>
                        <a href="" onClick={handelCancelChangingTask}>Cancel</a>
                    </form>
                </div> }
            </div>
        </>
    );
}

export default MyTask;