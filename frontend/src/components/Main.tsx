import '../css/main.css';
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MyTask from "./MyTask.tsx";
import GroupsComponent from "./Groups.tsx";
import StoreComponent from "./Store.tsx";
import StatsComponent from "./Stats.tsx";
import InventoryComponent from "./Inventory.tsx";

function Main() {
    const [points, setPoints] = useState(0);
    const nav = useNavigate();
    const [selectedSection, setSelectedSection] = useState('MyTasks');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            nav('/sign-in');
        }
    }, [nav]);

    const handleLogOut = () => {
        localStorage.clear();
        nav('/');
    }

    const handleSection = (event: React.MouseEvent<HTMLAnchorElement>, SectionName: string) => {
        event.preventDefault();
        setSelectedSection(SectionName);
    }

    return (
        <>
            <div className="main-user-page">
                <header>
                    <div className="logo-title-container" >
                        <img src="/logo.png" alt="logo" />
                        <p>DODARE</p>
                    </div>
                    <div className="profile-header">
                        <img src="/point.png" alt="" />
                        <p className='point'>{points}</p>
                        <p className='user'>{userName}</p>
                        <a className='profile-photo' href=""></a>
                    </div>
                </header>
                <div className="sidebar">
                    <div className="menu">
                        <div className="my-tasks"
                             style={{
                                 border: selectedSection === 'MyTasks' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'MyTasks' ? `30px` : "transparent",
                                 height: selectedSection === 'MyTasks' ? '4.722vh': '5.093vh'}}>
                            <img src="/mytask-icon.png" alt="mytask" />
                            <a href="my-task" onClick={(event) => handleSection(event, 'MyTasks')}>My tasks</a>
                        </div>
                        <div className="groups"
                             style={{
                                 border: selectedSection === 'Groups' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'Groups' ? `30px` : "transparent",
                                 height: selectedSection === 'Groups' ? '4.722vh': '5.093vh'}}>
                            <img src="/groups-icon.png" alt="groups" />
                            <a href="groups" onClick={(event) => handleSection(event, 'Groups')}>Groups</a>
                        </div>
                        <div className="store"
                             style={{
                                 border: selectedSection === 'Store' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'Store' ? `30px` : "transparent",
                                 height: selectedSection === 'Store' ? '4.722vh': '5.093vh'}}>
                            <img src="/store-icon.png" alt="store" />
                            <a href="store" onClick={(event) => handleSection(event, 'Store')}>Store</a>
                        </div>
                        <div className="stats"
                             style={{
                                 border: selectedSection === 'Stats' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'Stats' ? `30px` : "transparent",
                                 height: selectedSection === 'Stats' ? '4.722vh': '5.093vh'}}>
                            <img src="/stats-icon.png" alt="stats" />
                            <a href="stats" onClick={(event) => handleSection(event, 'Stats')}>Statistics</a>
                        </div>
                        <div className="inventory"
                             style={{
                                 border: selectedSection === 'Inventory' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'Inventory' ? `30px` : "transparent",
                                 height: selectedSection === 'Inventory' ? '4.722vh': '5.093vh'}}>
                            <img src="/inventory-icon.png" alt="inventory" />
                            <a href="inventory" onClick={(event) => handleSection(event, 'Inventory')}>Inventory</a>
                        </div>
                    </div>
                    <div className="log-out">
                        <img src="/exit-icon.png" alt="log-out"/>
                        <a href="" onClick={handleLogOut}>Log out</a>
                    </div>
                </div>
                <div className="components-area">
                    {selectedSection === 'MyTasks' && <MyTask />}
                    {selectedSection === 'Groups' && <GroupsComponent />}
                    {selectedSection === 'Store' && <StoreComponent />}
                    {selectedSection === 'Stats' && <StatsComponent />}
                    {selectedSection === 'Inventory' && <InventoryComponent />}
                </div>
            </div>
        </>
    );
}

export default Main;