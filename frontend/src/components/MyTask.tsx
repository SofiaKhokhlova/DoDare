import {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import '../css/myTask.css';

function MyTask () {
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
                deadline: selectedTask.deadline
            });
        }
    }, [selectedTask]);

    type TaskList = {
        id: number;
        title: string;
        description: string;
        status: string;
        reward: number;
        deadline: string;
    };

    const [tasks, setTasks] = useState<TaskList[]>([
        {
            id: 1,
            title: 'Complete React project',
            description: 'Build a full-fledged React application with TypeScript.',
            status: 'not done',
            reward: 10,
            deadline: '2024-05-15'
        },
        {
            id: 2,
            title: 'Write weekly blog post',
            description: 'Create an engaging blog post on the latest web development trends.',
            status: 'not done',
            reward: 50,
            deadline: '2024-05-01'
        },
        {
            id: 3,
            title: 'Exercise for 30 minutes',
            description: 'Do a workout session for improving fitness.',
            status: 'not done',
            reward: 20,
            deadline: '2024-04-30'
        },
        {
            id: 4,
            title: 'Read a book chapter',
            description: 'Read a chapter of a new book to expand knowledge.',
            status: 'not done',
            reward: 30,
            deadline: '2024-05-10'
        },
        {
            id: 5,
            title: 'Learn TypeScript basics',
            description: 'Study TypeScript fundamentals and practice with examples.',
            status: 'not done',
            reward: 80,
            deadline: '2024-05-20'
        },
        {
            id: 6,
            title: 'Cook a new recipe',
            description: 'Try out a new recipe for dinner.',
            status: 'not done',
            reward: 40,
            deadline: '2024-05-05'
        },
        {
            id: 7,
            title: 'Practice meditation',
            description: 'Spend 10 minutes meditating for relaxation.',
            status: 'not done',
            reward: 15,
            deadline: '2024-04-28'
        },
        {
            id: 8,
            title: 'Create presentation slides',
            description: 'Prepare slides for an upcoming project presentation.',
            status: 'not done',
            reward: 70,
            deadline: '2024-05-12'
        },
        {
            id: 9,
            title: 'Explore new coding libraries',
            description: 'Research and experiment with new coding libraries.',
            status: 'not done',
            reward: 60,
            deadline: '2024-05-08'
        },
        {
            id: 10,
            title: 'Take a nature walk',
            description: 'Enjoy outdoor time with a peaceful nature walk.',
            status: 'not done',
            reward: 25,
            deadline: '2024-04-25'
        }
    ]);

    useEffect(() => {
        const sortedTasks = [...tasks].sort((a, b) => {
            if (a.status === 'done' && b.status !== 'done') {
                return 1;
            } else if (a.status !== 'done' && b.status === 'done') {
                return -1;
            } else {
                return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            }
        });

        setTasks(sortedTasks);
    }, []);

    const [newTask, setNewTask] = useState<TaskList> ({
        id: 0,
        title: "",
        description: "",
        status: "not done",
        reward: 0,
        deadline: ""
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
            const updatedTask: TaskList = {
                id: tasks.length + 1,
                title: newTask.title,
                description: newTask.description,
                status: 'not done',
                reward: parseInt(String(newTask.reward), 10),
                deadline: newTask.deadline
            };

            const updatedTasks = [...tasks, updatedTask];

            updatedTasks.sort((a, b) => {
                if (a.status === 'done' && b.status !== 'done') {
                    return 1;
                } else if (a.status !== 'done' && b.status === 'done') {
                    return -1;
                } else {
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                }
            });

            setTasks(updatedTasks);

            setNewTask({
                id: 0,
                title: '',
                description: '',
                status: 'not done',
                reward: 0,
                deadline: ''
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
        const updatedTasks = tasks.filter(task => task.id !== taskId);

        setTasks(updatedTasks);

        if (selectedTask && selectedTask.id === taskId) {
            setSelectedTask(null);
        }
        setVisibility('NewTask');
    };

    const handleChangeInfo = () => {
        setVisibility("TaskChange");
    }

    const handleSaveChangedTask: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const updatedTasks = tasks.map((task) => {
            if (task.id === selectedTask?.id) {
                // Обновляем поля измененного задания
                return {
                    ...task,
                    title: changedTask.title,
                    description: changedTask.description,
                    reward: parseInt(String(changedTask.reward), 10),
                    deadline: changedTask.deadline
                };
            }
            return task;
        });

        updatedTasks.sort((a, b) => {
            if (a.status === 'done' && b.status !== 'done') {
                return 1;
            } else if (a.status !== 'done' && b.status === 'done') {
                return -1;
            } else {
                return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            }
        });

        setTasks(updatedTasks);

        setSelectedTask(null);
        setVisibility('NewTask');
    }

    const handleTaskStatus = (taskId: number) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                if (task.status === 'not done') {
                    task.status = 'done'
                    //setPoints(points + task.reward);
                }
                //task.status = task.status === 'done' ? 'not done' : 'done';
            }
            return task;
        });

        updatedTasks.sort((a, b) => {
            if (a.status === 'done' && b.status !== 'done') {
                return 1;
            } else if (a.status !== 'done' && b.status === 'done') {
                return -1;
            } else {
                return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            }
        });

        setTasks(updatedTasks);
    }

    const handelCancelChangingTask: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setVisibility('NewTask');
    }

    return(
        <>
            <div className="tasks">
                <div className="tasks-container">
                    <p className='your-tasks'>Your tasks</p>
                    <div className="task-overflow">
                        {tasks.map((task) => (
                            <div key={task.id} className="task" onClick={() => {handleTaskClick(task.id)}}
                                 style={{backgroundColor: selectedTask && selectedTask.id === task.id ? '#C588EA' : '#CAA1E4'}}>
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
                                        checked={task.status === 'done'}
                                        onChange={() => handleTaskStatus(task.id)}
                                    />
                                    <label htmlFor={`taskCheckbox_${task.id}`} style={{backgroundColor: selectedTask && selectedTask.id === task.id ? '#C588EA' : '#CAA1E4'}}>
                                    </label>
                                </div>
                            </div>
                        ))}
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
                                value={newTask.reward}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="new-task-deadline">
                            <input
                                type="date"
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
                                type="date"
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