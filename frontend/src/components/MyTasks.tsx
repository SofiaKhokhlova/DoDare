import '../css/myTasks.css';
import { useState } from 'react';

function MyTasks() {
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
            status: 'done',
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
            status: 'done',
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
            status: 'done',
            reward: 25,
            deadline: '2024-04-25'
        }
    ]);

    function handleTaskStatus(taskId: number) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId)
                task.status = task.status === 'done' ? 'not done' : 'done';

            return task;
        });

        setTasks(updatedTasks);
    }

    return (
        <>
            <div className="my-tasks-page">
                <header>
                    <div className="logo-title-container">
                        <img src="/logo.png" alt="logo" />
                        <p>DODARE</p>
                    </div>
                    <div className="profile-header">
                        <img src="/point.png" alt="" />
                        <p className='point'>0</p>
                        <p className='user'>user_name</p>
                        <a className='profile-photo' href=""></a>
                    </div>
                </header>
                <div className="sidebar">
                    <div className="menu">
                        <div className="my-tasks">
                            <img src="/mytask-icon.png" alt="mytask" />
                            <a href="">My tasks</a>
                        </div>
                        <div className="groups">
                            <img src="/groups-icon.png" alt="groups" />
                            <a href="">Groups</a>
                        </div>
                        <div className="store">
                            <img src="/store-icon.png" alt="store" />
                            <a href="">Store</a>
                        </div>
                        <div className="stats">
                            <img src="/stats-icon.png" alt="stats" />
                            <a href="">Statistics</a>
                        </div>
                        <div className="inventory">
                            <img src="/inventory-icon.png" alt="inventory" />
                            <a href="">Inventory</a>
                        </div>
                    </div>
                    <div className="log-out">
                        <img src="/exit-icon.png" alt="log-out" />
                        <a href="">Log out</a>
                    </div>
                </div>

                <div className="tasks-container">
                    <p className='your-tasks'>Your tasks</p>
                    <div className="task-overflow">
                        {tasks.map((task) => (
                            <div key={task.id} className="task">
                                <div className="title-deadline">
                                    <p className="task-title">{task.title}</p>
                                    <p className="task-deadline">available till: {task.deadline}</p>
                                </div>
                                <div className="task-content">
                                    <img src="/point.png" alt="point-img" />
                                    <p className="task-reward">{task.reward}</p>
                                    <input
                                        id="taskCheckbox"
                                        className='status'
                                        type="checkbox"
                                        checked={task.status === 'done'}
                                        onChange={() => handleTaskStatus(task.id)}
                                    />
                                    <label htmlFor="taskCheckbox"></label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyTasks;