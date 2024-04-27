import '../css/myTasks.css';

function MyTasks() {
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
                        <p className='point'>35</p>
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
            </div>
        </>
    );
}

export default MyTasks;