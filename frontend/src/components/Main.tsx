import '../css/main.css';
import {useState, useEffect} from 'react';
import {Link, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MyTask from "./MyTask.tsx";
import GroupsComponent from "./Groups.tsx";
import StoreComponent from "./Store.tsx";
import StatsComponent from "./Stats.tsx";
import InventoryComponent from "./Inventory.tsx";

function Main() {
    const [points, setPoints] = useState(0);
    const nav = useNavigate();
    const userName = localStorage.getItem('userName');
    const location = useLocation();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken)
            nav('/sign-in');

        if (location.pathname === "/user")
            nav("/user/my-tasks", {replace: true});
    }, [nav, location.pathname]);

    const handleLogOut = () => {
        localStorage.clear();
        nav('/');
    }

    const selectedSection = location.pathname.split("/").pop() || "my-tasks";

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
                                 border: selectedSection === 'my-tasks' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'my-tasks' ? `30px` : "transparent",
                                 height: selectedSection === 'my-tasks' ? '4.722vh': '5.093vh'}}>
                            <img src="/mytask-icon.png" alt="mytask" />
                            <Link to={"my-tasks"}>My Tasks</Link>
                        </div>
                        <div className="groups"
                             style={{
                                 border: selectedSection === 'groups' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'groups' ? `30px` : "transparent",
                                 height: selectedSection === 'groups' ? '4.722vh': '5.093vh'}}>
                            <img src="/groups-icon.png" alt="groups" />
                            <Link to={"groups"}>Groups</Link>
                        </div>
                        <div className="store"
                             style={{
                                 border: selectedSection === 'store' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'store' ? `30px` : "transparent",
                                 height: selectedSection === 'store' ? '4.722vh': '5.093vh'}}>
                            <img src="/store-icon.png" alt="store" />
                            <Link to={"store"}>Store</Link>
                        </div>
                        <div className="stats"
                             style={{
                                 border: selectedSection === 'stats' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'stats' ? `30px` : "transparent",
                                 height: selectedSection === 'stats' ? '4.722vh': '5.093vh'}}>
                            <img src="/stats-icon.png" alt="stats" />
                            <Link to={"stats"}>Statistics</Link>
                        </div>
                        <div className="inventory"
                             style={{
                                 border: selectedSection === 'inventory' ? `2px solid #FFFF` : "transparent",
                                 borderRadius: selectedSection === 'inventory' ? `30px` : "transparent",
                                 height: selectedSection === 'inventory' ? '4.722vh': '5.093vh'}}>
                            <img src="/inventory-icon.png" alt="inventory" />
                            <Link to={"inventory"}>Inventory</Link>
                        </div>
                    </div>
                    <div className="log-out">
                        <img src="/exit-icon.png" alt="log-out"/>
                        <a href="" onClick={handleLogOut}>Log out</a>
                    </div>
                </div>
                <div className="components-area">
                    <Routes>
                        <Route path="my-tasks" element={<MyTask />} />
                        <Route path="groups" element={<GroupsComponent />} />
                        <Route path="store" element={<StoreComponent />} />
                        <Route path="stats" element={<StatsComponent />} />
                        <Route path="inventory" element={<InventoryComponent />} />
                        <Route path="/" element={<Navigate to="my-task" replace />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Main;