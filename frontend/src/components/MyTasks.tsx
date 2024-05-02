import '../css/myTasks.css';
import { useState, useEffect } from 'react';

function MyTasks() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            <div className="my-tasks-page"
                 style={{
                     height: `${windowHeight}px`
                 }}>
                <header
                    style={{
                        height: `calc((91/1080) * ${windowHeight}px)`
                }}>
                    <div className="logo-title-container" >
                        <img src="/logo.png" alt="logo"
                             style={{
                                 height: `calc((94/1080) * ${windowHeight}px)`
                        }} />
                        <p
                            style={{
                                fontSize: `calc((50/1080) * ${windowHeight}px`,
                                margin: `calc((15/1080) * ${windowHeight}px) 0 0 0`
                        }}>
                            DODARE</p>
                    </div>
                    <div className="profile-header"
                         style={{
                             fontSize: `calc((25/1080) * ${windowHeight}px`
                         }}>
                        <img src="/point.png" alt=""
                             style={{
                                 height: `calc((34/1080) * ${windowHeight}px)`
                        }} />
                        <p className='point'>0</p>
                        <p className='user'>user_name</p>
                        <a className='profile-photo' href=""
                           style={{
                               height: `calc((60/1080) * ${windowHeight}px)`
                        }}></a>
                    </div>
                </header>
                <div className="sidebar"
                     style={{
                         marginTop:`calc((91/1080) * ${windowHeight}px)`,
                         height:`calc((989/1080) * ${windowHeight}px)`
                     }}>
                    <div className="menu"
                         style={{
                             marginTop:`calc((58/1080) * ${windowHeight}px)`,
                             fontSize:`calc((35/1080) * ${windowHeight}px)`
                         }}>
                        <div className="my-tasks"
                             style={{
                                 height:`calc((51/1080) * ${windowHeight}px)`,
                                 marginBottom:`calc((10/1080) * ${windowHeight}px)`
                        }}>
                            <img src="/mytask-icon.png" alt="mytask"
                                 style={{
                                     height:`calc((35/1080) * ${windowHeight}px)`,
                                     margin: `calc((9/1080) * ${windowHeight}px) 0 0 calc((15/1920) * 100vw)`
                                 }} />
                            <a href=""
                               style={{
                                   margin: `calc((6/1080) * ${windowHeight}px) 0 0 calc((23/1920) * 100vw)`
                                }}>
                                My tasks</a>
                        </div>
                        <div className="groups"
                             style={{
                                 height:`calc((55/1080) * ${windowHeight}px)`,
                                 marginBottom:`calc((10/1080) * ${windowHeight}px)`
                             }}>
                            <img src="/groups-icon.png" alt="groups"
                                 style={{
                                     height:`calc((35/1080) * ${windowHeight}px)`,
                                     margin: `calc((9/1080) * ${windowHeight}px) 0 0 calc((15/1920) * 100vw)`
                            }} />
                            <a href=""
                               style={{
                                   margin: `calc((6/1080) * ${windowHeight}px) 0 0 calc((23/1920) * 100vw)`
                            }}>
                                Groups</a>
                        </div>
                        <div className="store"
                             style={{
                                 height:`calc((55/1080) * ${windowHeight}px)`,
                                 marginBottom:`calc((10/1080) * ${windowHeight}px)`
                        }}>
                            <img src="/store-icon.png" alt="store"
                                 style={{
                                     height:`calc((35/1080) * ${windowHeight}px)`,
                                     margin: `calc((9/1080) * ${windowHeight}px) 0 0 calc((15/1920) * 100vw)`
                            }} />
                            <a href=""
                               style={{
                                   margin: `calc((6/1080) * ${windowHeight}px) 0 0 calc((23/1920) * 100vw)`
                            }}>
                                Store</a>
                        </div>
                        <div className="stats"
                             style={{
                                 height:`calc((55/1080) * ${windowHeight}px)`,
                                 marginBottom:`calc((10/1080) * ${windowHeight}px)`
                        }}>
                            <img src="/stats-icon.png" alt="stats"
                                 style={{
                                     height:`calc((35/1080) * ${windowHeight}px)`,
                                     margin: `calc((9/1080) * ${windowHeight}px) 0 0 calc((15/1920) * 100vw)`
                            }} />
                            <a href=""
                               style={{
                                   margin: `calc((6/1080) * ${windowHeight}px) 0 0 calc((23/1920) * 100vw)`
                            }}>
                                Statistics</a>
                        </div>
                        <div className="inventory"
                             style={{
                                 height:`calc((55/1080) * ${windowHeight}px)`,
                                 marginBottom:`calc((10/1080) * ${windowHeight}px)`
                             }}>
                            <img src="/inventory-icon.png" alt="inventory"
                                 style={{
                                     height:`calc((35/1080) * ${windowHeight}px)`,
                                     margin: `calc((9/1080) * ${windowHeight}px) 0 0 calc((15/1920) * 100vw)`
                            }} />
                            <a href=""
                               style={{
                                   margin: `calc((6/1080) * ${windowHeight}px) 0 0 calc((23/1920) * 100vw)`
                            }}>
                                Inventory</a>
                        </div>
                    </div>
                    <div className="log-out"
                         style={{
                             bottom:`calc((66/1080) * ${windowHeight}px)`,
                             height:`calc((55/1080) * ${windowHeight}px)`
                         }}>
                        <img src="/exit-icon.png" alt="log-out"
                             style={{
                                 height:`calc((35/1080) * ${windowHeight}px)`
                             }} />
                        <a href=""
                           style={{
                               fontSize:`calc((35/1080) * ${windowHeight}px)`
                        }}>
                            Log out</a>
                    </div>
                </div>

                <div className="tasks-container"
                     style={{
                         height:`calc((712/1080) * ${windowHeight}px)`,
                         margin:`calc((150/1080) * ${windowHeight}px) 0 0 calc((114/1920) * 100vw)`
                     }}>
                    <p className='your-tasks'
                       style={{
                           fontSize:`calc((50/1080) * ${windowHeight}px)`,
                           marginBottom:`calc((32/1080) * ${windowHeight}px)`
                        }}>
                        Your tasks</p>
                    <div className="task-overflow"
                         style={{
                             height:`calc((712/1080) * ${windowHeight}px)`
                         }}>
                        {tasks.map((task) => (
                            <div key={task.id} className="task"
                                 style={{
                                     height:`calc((64/1080) * ${windowHeight}px)`,
                                     marginBottom:`calc((17/1080) * ${windowHeight}px)`
                                 }}>
                                <div className="title-deadline">
                                    <p className="task-title"
                                       style={{
                                           height:`calc((25/1080) * ${windowHeight}px)`,
                                           fontSize:`calc((22/1080) * ${windowHeight}px)`,
                                           margin:`calc((8/1080) * ${windowHeight}px) 0 0 calc((19/1920) * 100vw)`
                                    }}>
                                        {task.title}</p>
                                    <p className="task-deadline"
                                       style={{
                                           fontSize:`calc((14/1080) * ${windowHeight}px)`,
                                           margin:`calc((7/1080) * ${windowHeight}px) 0 calc((8/1080) * ${windowHeight}px) calc((20/1920) * 100vw)`,
                                           height:`calc((16/1080) * ${windowHeight}px)`
                                    }}>
                                        available till: {task.deadline}</p>
                                </div>
                                <div className="task-content">
                                    <img src="/point.png" alt="point-img"
                                         style={{
                                             height:`calc((27/1080) * ${windowHeight}px)`
                                    }} />
                                    <p className="task-reward"
                                       style={{
                                           fontSize:`calc((25/1080) * ${windowHeight}px)`
                                    }}>
                                        {task.reward}</p>
                                    <input
                                        style={{
                                            height:`calc((33/1080) * ${windowHeight}px)`
                                        }}
                                        id="taskCheckbox"
                                        className='status'
                                        type="checkbox"
                                        checked={task.status === 'done'}
                                        onChange={() => handleTaskStatus(task.id)}
                                    />
                                    <label htmlFor="taskCheckbox"
                                           style={{
                                               height:`calc((25/1080) * ${windowHeight}px)`
                                    }}></label>
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