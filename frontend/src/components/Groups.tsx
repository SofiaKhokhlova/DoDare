import "../css/groups.css";
import {ChangeEvent, MouseEventHandler, useState} from "react";

function GroupsComponent () {
    type Group = {
        id: number;
        title: string;
        numberOfParticipants: number;
    };

    const [groups, setGroups] = useState<Group[] | null>(null);
    const [newGroup, setNewGroup] = useState<Group>({
        id: 0,
        title: "",
        numberOfParticipants: 0
    });
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [visibility, setVisibility] = useState("NewGroup");
    const [visibilityGroupsOrGroupInfo, setVisibilityGroupsOrGroupInfo] = useState("UserGroups");
    const [visibilityInfoPart, setVisibilityInfoPart] = useState("NewTask");
    const [selectedTask, setSelectedTask] = useState(null);

    const handleGroupClick = (groupId: number) => {
        if(groups) {
            const group = groups.find((group) => group.id === groupId);
            if (group){
                setSelectedGroup(group);
                console.log(group.title);
                setVisibility("Group");
            }
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewGroup((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleCreateGroup: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if (newGroup.title) {
            const updatedGroup: Group = {
                id: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
                title: newGroup.title,
                numberOfParticipants: 1
            };

            setGroups((prevGroups) => (prevGroups ? [...prevGroups, updatedGroup] : [updatedGroup]));

            setNewGroup({
                id: 0,
                title: "",
                numberOfParticipants: 0
            })
        } else {
            alert("Please, write title for a new group!");
        }
    };

    const handleCancelInfo: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setVisibility('NewGroup');
    }

    const handleDetailedGroupInfo = () => {
        setVisibilityGroupsOrGroupInfo("GroupInfo")
    }

    const handleTaskClick = (taskId) => {
        setVisibilityInfoPart("TaskInfo");
    }

    return(
        <>
            {visibilityGroupsOrGroupInfo === "UserGroups" && <div className="groups-component">
                <div className="groups-part">
                    <p className="your-groups">Your groups</p>
                    <div className="groups-overflow">
                        {!groups ? (
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
                                    <p className="group-title">{group.title}</p>
                                    <div className="participants-container">
                                        <img src="/group-participants%204.svg" alt="participants img"/>
                                        <p className="group-participants">{group.numberOfParticipants}</p>
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
                                name="title"
                                value={newGroup.title}
                                onChange={handleInputChange}
                            />
                            <button className="create-group" onClick={handleCreateGroup}>Create group</button>
                        </form>
                    </div>
                </div>}

                {visibility === "Group" &&
                    <div className="group-info-part">
                        <p className="group-info-title">
                            {selectedGroup.title}
                        </p>
                        <div className="group-info-participants">
                            <div className="admin">
                                <p className="admin-name">{localStorage.getItem("userName")}</p>
                                <img src="/point.png" alt="points" className="point-img"/>
                                <p className="admin-points">25</p>
                                <img src="/group-admin.svg" alt="admin" className="admin-img"/>
                            </div>
                        </div>
                        <p className="group-info-tasks">Tasks</p>
                        <div className="group-info-task">
                            <div className="task-container">
                                <div className="task-info-title-deadline">
                                    <p className="title-info">Wash the dog</p>
                                    <p className="deadline-info">available till: 31.05.2025</p>
                                </div>
                                <img src="/point.png" alt="points" className="point-img"/>
                                <p className="task-info-point">15</p>
                                <input
                                    id="group-task"
                                    className='status-task-info'
                                    type="checkbox"
                                />
                                <label htmlFor="group-task">
                                </label>
                            </div>
                            <div className="task-container">
                                <div className="task-info-title-deadline">
                                    <p className="title-info">Wash the dog</p>
                                    <p className="deadline-info">available till: 31.05.2025</p>
                                </div>
                                <img src="/point.png" alt="points" className="point-img"/>
                                <p className="task-info-point">15</p>
                                <input
                                    id="group-task"
                                    className='status-task-info'
                                    type="checkbox"
                                />
                                <label htmlFor="group-task">
                                </label>
                            </div>
                            <div className="task-container">
                                <div className="task-info-title-deadline">
                                    <p className="title-info">Wash the dog</p>
                                    <p className="deadline-info">available till: 31.05.2025</p>
                                </div>
                                <img src="/point.png" alt="points" className="point-img"/>
                                <p className="task-info-point">15</p>
                                <input
                                    id="group-task"
                                    className='status-task-info'
                                    type="checkbox"
                                />
                                <label htmlFor="group-task">
                                </label>
                            </div>
                            <div className="task-container">
                                <div className="task-info-title-deadline">
                                    <p className="title-info">Wash the dog</p>
                                    <p className="deadline-info">available till: 31.05.2025</p>
                                </div>
                                <img src="/point.png" alt="points" className="point-img"/>
                                <p className="task-info-point">15</p>
                                <input
                                    id="group-task"
                                    className='status-task-info'
                                    type="checkbox"
                                />
                                <label htmlFor="group-task">
                                </label>
                            </div>
                        </div>
                        <button className="detailed-info" onClick={handleDetailedGroupInfo}>Detailed information</button>
                        <a href="" className="cancel-info" onClick={handleCancelInfo}>Cancel</a>
                    </div>}
            </div>}

            {visibilityGroupsOrGroupInfo === "GroupInfo" && <div className="group-detailed-info">
                <p className="group-name">{selectedGroup.title}</p>
                <div className="info-part">
                    <div className="buttons-group-info">
                        <button className="group-info-button">Invite friend</button>
                        <button className="group-info-button">Change info</button>
                        <button className="group-info-button">Statistics</button>
                    </div>

                    <div className="group-participants-container">
                        <p className="info-title">Participants</p>
                        <div className="participants-overflow">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="participant">
                                    <p className="participant-name">user_name</p>
                                    <img src="/point.png" alt="" className="participant-points"/>
                                    <p className="total-points">15</p>
                                    <img src={index === 0 ? "/group-admin.svg" : "/regular-participant.png"} alt="" className="user-icon"/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="group-task-container">
                        <p className="info-title">Tasks</p>
                        <div className="tasks-overflow">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="group-task" onClick={() => handleTaskClick(index)}>
                                    <div className="title-deadline">
                                        <p className="task-title">Wash the dog</p>
                                        <p className="task-deadline">available till: 2024-07-09 18:00</p>
                                    </div>
                                    <div className="task-content">
                                        <img src="/point.png" alt="point-img" />
                                        <p className="task-reward">5</p>
                                        <input
                                            id={`taskCheckbox_${index}`}
                                            className='status'
                                            type="checkbox"
                                        />
                                        <label htmlFor={`taskCheckbox_${index}`}>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="dynamic-part">
                    {visibilityInfoPart === "NewTask" && <div className="new-group-task">
                        <p className="new-task-form-name">New task</p>
                        <form className="new-task-form" style={{
                            marginLeft: "7.9vw"
                        }}>
                            <div className="new-task-title">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    value=""
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="new-task-description">
                        <textarea
                            placeholder="Description"
                            name="description"
                            value=""
                            onChange={handleInputChange}
                        />
                            </div>
                            <div className="new-task-reward">
                                <input
                                    type="text"
                                    placeholder="Reward"
                                    name="reward"
                                    value=""
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="new-task-deadline">
                                <input
                                    type="datetime-local"
                                    placeholder="Deadline"
                                    name="deadline"
                                    value=""
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className="add-task">Add Task</button>
                        </form>
                    </div>}
                </div>
            </div>}
        </>
    );
}

export default GroupsComponent;
