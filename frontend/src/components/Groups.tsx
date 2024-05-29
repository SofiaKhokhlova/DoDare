import "../css/groups.css";
import {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import {
    completeGroupTask,
    createGroup, createNewGroupTask, deleteGroup, deleteTask, generateInviteToken,
    getAllGroupParticipants,
    getAllUserGroups,
    getAllUserGroupTasks, joinGroupWithInviteToken, updateGroup,
    updateTask
} from "../service/GroupsServise.ts";

function GroupsComponent () {
    type Group = {
        id: number;
        name: string;
        adminUserId: number;
        usersCount: number;
    };

    type Participant = {
        points: number;
        userId: number;
        groupId: number;
        username: string;
    };

    type Task = {
        id: number;
        title: string;
        description: string;
        status: number;
        reward: number;
        deadline: string;
    };

    const [groups, setGroups] = useState<Group[]>([]);

    const [updateGroupsList, setUpdateGroupsList] = useState<boolean>(false);
    const [inputInviteToken, setInputInviteToken] = useState("");

    const token = localStorage.getItem("accessToken");
    const userIdStr = localStorage.getItem("userId");
    const userId = parseInt(userIdStr ?? "0");

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
        getAllUserGroups(token)
            .then(response => {
                setGroups(response.data);
                console.log("groups:");
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [updateGroupsList]);
    
    const [newGroup, setNewGroup] = useState<Group>({
        id: 0,
        name: "",
        adminUserId: userId,
        usersCount: 1
    });

    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const [visibility, setVisibility] = useState("NewGroup");
    const [visibilityGroupsOrGroupInfo, setVisibilityGroupsOrGroupInfo] = useState("UserGroups");
    const [visibilityJoinGroup, setVisibilityJoinGroup] = useState(false);
    const [visibilityInviteFriend, setVisibilityInviteFriend] = useState(false);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [inviteToken, setInviteToken] = useState("");
    const [groupParticipants, setGroupParticipants] = useState<Participant[]>([]);
    const [userGroupTasks, setUserGroupTasks] = useState<Task[]>([]);
    const [changedTask, setChangedTask] = useState<Task | null>(null);
    const [changedGroup, setChangedGroup] = useState<Group | null>(null);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        reward: 0,
        deadline: ""
    });

    const [visibilityInfoPart, setVisibilityInfoPart] = useState( "NewTask");

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


    const handleGroupClick = (groupId: number) => {
        if(groups) {
            const group = groups.find((group) => group.id === groupId);
            if (group){
                setSelectedGroup(group);
                console.log(selectedGroup);

                getAllGroupParticipants(groupId, token)
                    .then(response => {
                        const groupUsers = response.data;
                        setGroupParticipants(groupUsers);
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });

                getAllUserGroupTasks(groupId, token)
                    .then(response => {
                        const sortedTasks = sortTasks(response.data);
                        setUserGroupTasks(sortedTasks);
                    })
                    .catch(error => {
                        console.error(error)
                    });
                setVisibility("Group");
            }
        }
    };

    useEffect(() => {
        if(selectedGroup)
            setChangedGroup(selectedGroup);
    }, [selectedGroup]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewGroup((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleInputChangeGroupInfo = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setChangedGroup((prevGroup) => ({
            ...prevGroup,
            [name]: value
        }));
    };

    const handleCreateGroup: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (newGroup.name) {
            createGroup(newGroup, token)
                .then(response => {
                    console.log(response.data);
                    setGroups([...groups, response.data]);

                    setNewGroup({
                        id: 0,
                        name: "",
                        adminUserId: userId,
                        usersCount: 1
                    });

                    setUpdateGroupsList(prev => !prev);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            alert("Please, write title for a new group!");
        }
    };

    const handleJoinGroupVisible = () => {
      setVisibilityJoinGroup(true);
    };

    const handleInviteFriendVisible = () => {
        generateInviteToken(selectedGroup.id, token)
            .then(response => {
                setInviteToken(response.data)
                setVisibilityInviteFriend(true);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleCancelInfo: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setVisibility('NewGroup');
    };

    const handleDetailedGroupInfo = () => {
        setVisibilityGroupsOrGroupInfo("GroupInfo")
    };

    const handleCancelTaskInfo: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setVisibilityInfoPart("NewTask");
    };

    const handleTaskClick = (taskId: number) => {
        const task = userGroupTasks.find((task: any) => task.id === taskId);
        if (task){
            setSelectedTask(task);
            setVisibilityInfoPart("TaskInfo");
        }
    };

    const handleChangeTask = () => {
        setVisibilityInfoPart("TaskChange");
    };

    const handleInputTaskChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setChangedTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handelCancelChangingTask: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setVisibilityInfoPart('NewTask');
    };

    const handleAddTask: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (newTask.title && newTask.description && newTask.deadline && newTask.reward > 0) {
            createNewGroupTask(selectedGroup.id, newTask, token)
                .then(response => {
                    const updatedTasks = sortTasks([...userGroupTasks, response.data]);
                    setUserGroupTasks(updatedTasks);
                    setNewTask({
                        title: '',
                        description: '',
                        reward: 0,
                        deadline: ''
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            alert('Please fill out all fields to add a new task.');
        }
    };

    const handleInputNewTaskChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSaveChangedTask: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (!changedTask) return;

        const updatedTask = {
            ...changedTask,
            reward: parseInt(String(changedTask.reward), 10)
        };

        updateTask(selectedGroup.id, selectedTask.id, updatedTask, token)
            .then(response => {
                const updatedTasks = userGroupTasks.map(task => task.id === updatedTask.id ? response.data : task);
                setUserGroupTasks(sortTasks(updatedTasks));
                setSelectedTask(null);
                setVisibilityInfoPart('NewTask');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteTask = (event: MouseEvent<HTMLButtonElement>, taskId: number) => {
        event.preventDefault();

        deleteTask(selectedGroup.id, taskId, token)
            .then(() => {
                const updatedTasks = userGroupTasks.filter(task => task.id !== taskId);
                setUserGroupTasks(updatedTasks);

                if(selectedTask && selectedTask.id === taskId)
                    setSelectedTask(null);

                setVisibilityInfoPart("NewTask");
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSaveChangedGroup: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if(!changedGroup) return;

        updateGroup(changedGroup.id, changedGroup, token)
            .then(response => {
                const updatedGroup = response.data;

                setGroups(prevGroups =>
                    prevGroups.map(group =>
                        group.id === updatedGroup.id ? updatedGroup : group
                    )
                );

                if (selectedGroup?.id === updatedGroup.id) {
                    setSelectedGroup(updatedGroup);
                }
                setVisibilityInfoPart("NewTask");
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteGroup = (event: MouseEvent<HTMLButtonElement>, groupId: number) => {
        event.preventDefault();

        deleteGroup(groupId, token)
            .then(() => {
                const updatedGroups = groups.filter(group => group.id !== groupId);
                setGroups(updatedGroups);

                setVisibilityGroupsOrGroupInfo("UserGroups");
                setUpdateGroupsList(prev => !prev);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleInputInviteToken = (event: ChangeEvent<HTMLInputElement>) => {
        setInputInviteToken(event.target.value);
    };

    const handleChangeGroupInfo = () => {
        setVisibilityInfoPart("ChangeGroupInfo");
    };

    const handleCancelChangingGroup: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setVisibilityInfoPart('NewTask');
    };

    const handleSubmitJoinGroup = () => {
        joinGroupWithInviteToken(inputInviteToken, token)
            .then(() => {
                setVisibilityJoinGroup(false);
                setUpdateGroupsList(prev => !prev);
            })
            .catch(error => {
                console.error(error);
                alert("Entered invitation token is incorrect");
                setVisibilityJoinGroup(false);
            })
    };

    const handleTaskStatus = (groupTaskId: any) => {
        const compareDateTask = userGroupTasks.find((task) => task.id === groupTaskId);
        if(compareDateTask) {
            if(compareDateTask.status === 1){
                alert("You have already completed this task.");
                return;
            }
            if(new Date()>new Date(compareDateTask.deadline.replace(" ", "T"))){
                alert("You missed the deadline, so you can't mark this task as completed.");
                return;
            }
        }

        completeGroupTask(groupTaskId, token)
            .then(response => {
                const { id, userId, taskId, status } = response.data;

                setUserGroupTasks(prevTasks => {
                    let pointReward = 0;
                    const updatedTasks = prevTasks.map(task => {
                        if (task.id === taskId) {
                            pointReward = task.reward;
                            return { ...task, status: status };
                        }
                        return task;
                    });

                    setGroupParticipants(prevParticipants => {
                        const updatedParticipants = prevParticipants.map(participant => {
                            if (participant.userId === userId) {
                                return { ...participant, points: participant.points + pointReward };
                            }
                            return participant;
                        });

                        return [...updatedParticipants];
                    });

                    return sortTasks(updatedTasks);
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSubmitCopyInviteToken = () => {
        navigator.clipboard.writeText(inviteToken)
            .then(() => {
                alert('Token copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy token: ', error);
            });
        setVisibilityInviteFriend(false);
    };

    useEffect(() => {
        if(selectedGroup){
            console.log("something changes");
            console.log(groupParticipants);
        }
    }, [groupParticipants, userGroupTasks]);

    useEffect(() => {
        if(selectedGroup){
            console.log("selected group:");
            console.log(selectedGroup);
        }
    }, [selectedGroup]);

    useEffect(() => {
        if(selectedGroup){
            if(userId !== selectedGroup.adminUserId)
                setVisibilityInfoPart("BasicUserCapabilities");
        }
    }, [selectedGroup]);

    return(
        <>
            {visibilityGroupsOrGroupInfo === "UserGroups" && <div className="groups-component">
                <div className="groups-part">
                    <p className="your-groups">Your groups</p>
                    <div className="groups-overflow">
                        {groups.length === 0 ? (
                            <p className="no-groups">
                                You don't have groups yet.
                                <br />Create your group in the form on the right.
                            </p>
                        ) : (
                            groups.map((group: any) => (
                                <div key={group.id}
                                     className="group"
                                     onClick={() => handleGroupClick(group.id)}
                                     style={{backgroundColor: selectedGroup && selectedGroup.id === group.id ? '#C588EA' : '#CAA1E4'}}>
                                    <p className="group-title">{group.name}</p>
                                    <div className="participants-container">
                                        <img src="/group-participants%204.svg" alt="participants img"/>
                                        <p className="group-participants">{group.usersCount}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {visibility === "NewGroup"  && <div className="new-group-part">
                    <p className="new-group">New group</p>
                    <div className="new-group-form">
                        <form>
                            <input
                                type="text"
                                placeholder="Title"
                                name="name"
                                value={newGroup.name}
                                onChange={handleInputChange}
                            />
                            <button className="create-group" onClick={handleCreateGroup}>Create group</button>
                        </form>
                    </div>

                    <button className="join-group-button" onClick={handleJoinGroupVisible}>Join the group</button>
                </div>}

                {visibility === "Group" &&
                    <div className="group-info-part">
                        <p className="group-info-title">
                            {selectedGroup.name}
                        </p>
                        <div className="group-info-participants">
                            {groupParticipants.length > 0 ? (
                                groupParticipants.map((participant) => (
                                    <div key={participant.userId} className="participant-info" style={{
                                        marginBottom: participant.userId === groupParticipants[groupParticipants.length - 1].userId ? "0" : "1.574vh"
                                    }}>
                                        <p className="participant-name-info" >{participant.username}</p>
                                        <img src="/point.png" alt="points" className="point-img-info"/>
                                        <p className="participant-points">{participant.points}</p>
                                        <img src={participant.userId === selectedGroup.adminUserId ? "/group-admin.svg" : "/regular-participant.png"} alt="" className="user-icon-info"/>
                                    </div>
                                ))
                            ) : (
                                <p>No participants found.</p>
                            )}
                        </div>
                        <p className="group-info-tasks">Tasks</p>
                        <div className="group-info-task">
                            {userGroupTasks.length > 0 ? (
                                userGroupTasks.map(task => (
                                    <div key={task.id} className="task-container" style={{
                                        marginBottom: task.id === userGroupTasks[userGroupTasks.length - 1].id ? "0" : "1.574vh"
                                    }}>
                                        <div className="task-info-title-deadline">
                                            <p className="title-info">{task.title}</p>
                                            <p className="deadline-info">available till: {task.deadline}</p>
                                        </div>
                                        <img src="/point.png" alt="points" className="point-img"/>
                                        <p className="task-info-point">{task.reward}</p>
                                        <input
                                            id="group-task"
                                            className='status-task-info'
                                            type="checkbox"
                                            checked={task.status === 1}
                                            disabled={true}
                                        />
                                        <label htmlFor="group-task">
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <p className="no-group-tasks">No task found</p>
                            )}
                        </div>
                        <button className="detailed-info" onClick={handleDetailedGroupInfo}>Detailed information</button>
                        <a href="" className="cancel-info" onClick={handleCancelInfo}>Cancel</a>
                    </div>}

                {visibilityJoinGroup && <div className="join-group-dialog">
                    <div className="join-group-block">
                        <p>Enter the invite token</p>
                        <div className="input-invite-token-wrap">
                            <input type="text" value={inputInviteToken} name="invite-token" placeholder="token" onChange={handleInputInviteToken}/>
                            <button className="submit-join-group" onClick={handleSubmitJoinGroup}>Join</button>
                        </div>

                    </div>
                </div>}

            </div>}

            {visibilityGroupsOrGroupInfo === "GroupInfo" && <div className="group-detailed-info">
                <p className="group-name">{selectedGroup.name}</p>
                <div className="info-part">
                    <div className="buttons-group-info" style={{
                        display: userId === selectedGroup.adminUserId ? "flex" : "none"
                    }}>
                        <button className="group-info-button" onClick={handleInviteFriendVisible}>Invite friend</button>
                        <button className="group-info-button" onClick={handleChangeGroupInfo}>Change info</button>
                        <button className="group-info-button">Statistics</button>
                    </div>

                    <div className="group-participants-container">
                        <p className="info-title">Participants</p>
                        <div className="participants-overflow">
                            {groupParticipants.length > 0 ? (
                                groupParticipants.map(participant => (
                                    <div key={participant.userId} className="participant" style={{
                                        marginBottom: participant.userId === groupParticipants[groupParticipants.length - 1].userId ? "0" : "1.574vh"
                                    }}>
                                        <p className="participant-name">{participant.username}</p>
                                        <img src="/point.png" alt="points" className="task-point-img"/>
                                        <p className="total-points">{participant.points}</p>
                                        <img src={participant.userId === selectedGroup.adminUserId ? "/group-admin.svg" : "/regular-participant.png"} alt="" className="user-icon"/>
                                    </div>
                                ))
                            ) : (
                                <p>No participants found.</p>
                            )}
                        </div>
                    </div>

                    <div className="group-task-container">
                        <p className="info-title">Tasks</p>
                        <div className="tasks-overflow">
                            {userGroupTasks.length > 0 ? (
                                userGroupTasks.map(task => (
                                    <div key={task.id} className="group-task" style={{
                                        marginBottom: task.id === userGroupTasks[userGroupTasks.length - 1].id ? "0" : "1.574vh",
                                        backgroundColor: selectedTask && selectedTask.id === task.id ? '#C588EA' : '#CAA1E4'
                                    }} onClick={() => handleTaskClick(task.id)}>
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
                                ))
                            ) : (
                                <p className="no-group-tasks">No task found</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="dynamic-part">

                    {visibilityInfoPart === "BasicUserCapabilities" && <div className="basic-buttons">
                        <button className="group-info-button-basic" onClick={handleInviteFriendVisible}>Invite friend</button>
                        <button className="group-info-button-basic">Statistics</button>
                    </div>}

                    {visibilityInfoPart === "NewTask" && <div className="new-group-task" style={{
                        display: userId === selectedGroup.adminUserId ? "flexbox" : "none"
                    }}>
                        <p className="new-task-form-name">New task</p>
                        <form className="new-task-form" style={{
                            marginLeft: "7.9vw"
                        }}>
                            <div className="new-task-title">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    value={newTask.title}
                                    onChange={handleInputNewTaskChange}
                                />
                            </div>
                            <div className="new-task-description">
                        <textarea
                            placeholder="Description"
                            name="description"
                            value={newTask.description}
                            onChange={handleInputNewTaskChange}
                        />
                            </div>
                            <div className="new-task-reward">
                                <input
                                    type="text"
                                    placeholder="Reward"
                                    name="reward"
                                    value={newTask.reward === 0 ? "" : newTask.reward}
                                    onChange={handleInputNewTaskChange}
                                />
                            </div>
                            <div className="new-task-deadline">
                                <input
                                    type="datetime-local"
                                    placeholder="Deadline"
                                    name="deadline"
                                    value={newTask.deadline}
                                    onChange={handleInputNewTaskChange}
                                />
                            </div>
                            <button className="add-task" onClick={handleAddTask}>Add Task</button>
                        </form>
                    </div>}

                    { visibilityInfoPart === 'TaskInfo' && <div className="task-info" style={{
                        marginTop: "0",
                        marginLeft: "8.073vw",
                        display: userId === selectedGroup.adminUserId ? "flexbox" : "none"
                    }}>
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
                        <button className="change-info" onClick={handleChangeTask}>Change</button>
                        <a href="" className="cancel-task-info" onClick={handleCancelTaskInfo}>Cancel</a>
                    </div> }

                    { visibilityInfoPart === 'TaskChange' && <div className="task-change" style={{
                        marginTop: "0",
                        marginLeft: "8.073vw",
                        display: userId === selectedGroup.adminUserId ? "flexbox" : "none"
                    }}>
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

                    {visibilityInfoPart === "ChangeGroupInfo" && <div className="change-group-info" style={{
                        display: userId === selectedGroup.adminUserId ? "-ms-flexbox" : "none"
                    }}>
                        <p className="change-group-name">Change group info</p>
                        <p className="change-title">Change title</p>
                        <div className="change-group-title">
                            <input
                                type="text"
                                placeholder="Title"
                                name="name"
                                value={changedGroup.name}
                                onChange={handleInputChangeGroupInfo}
                            />
                        </div>
                        <div className="change-group-buttons">
                            <button className="save-change-group" onClick={handleSaveChangedGroup}>Save</button>
                            <button className="delete-group" onClick={(event) => handleDeleteGroup(event, changedGroup.id)}>Delete</button>
                            <a href="" onClick={handleCancelChangingGroup}>Cancel</a>
                        </div>
                    </div>}
                </div>

                {visibilityInviteFriend && <div className="invite-friend-dialog">
                    <div className="invite-friend-block">
                        <p style={{ width: "100%", textAlign: "center" }}>
                            Your invitation token has been generated
                            <br/>copy and share with a friends
                        </p>
                        <div className="token-and-button">
                            <input type="text" value={inviteToken} className="invite-token"/>
                            <button className="submit-copy-token" onClick={handleSubmitCopyInviteToken}>
                                <img src="/copy-lcon.svg" alt="" className="copy-icon" />
                            </button>
                        </div>
                    </div>
                </div>}

            </div>}
        </>
    );
}

export default GroupsComponent;
