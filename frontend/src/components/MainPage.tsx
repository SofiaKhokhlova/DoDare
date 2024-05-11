import '../css/mainPage.css';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

function MainPage() {

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


    const nav = useNavigate();

    function signIn() {
        nav('/sign-in');
    }

    function signUp() {
        nav('/sign-up');
    }

    function about() {
        nav('/main');
    }

	const [message, setMessage] = useState('');
	useEffect(() => {
        fetch('http://localhost:8080/hello')
            .then(response => response.text())
            .then(message => setMessage(message))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    return (
        <div id="main-page"
             style={{
                 height: `${windowHeight}px`, width: `100vw`
            }}>
            <div className="empty-space"
                 style={{
                     height: `calc((32/1080) * ${windowHeight}px)`
            }}></div>
            <div className="header-main"
                 style={{
                    height: `calc((139/1080) * ${windowHeight}px)`,
                    width: `calc((1778/1920) * 100vw)`,
                    fontSize: `calc((30/1080) * ${windowHeight}px)`
                }}>

                <a href='' id="about" onClick={about}>About</a>
                <div className="logo-title"
                     style={{
                         height: `calc((139/1080) * ${windowHeight}px)`
                    }}>
                    <img src="/logo.png" alt="logo"
                         style={{
                             height: `calc((139/1080) * ${windowHeight}px)`
                        }}/>
                    <p
                        style={{
                            fontSize: `calc((50/1080) * 47.44vw)`,
                            marginTop: `calc((36/1080) * ${windowHeight}px)`
                    }}>
                        DODARE</p>
                </div>
                <div className="buttons">
                    <button className='sign-in' onClick={signIn}
                            style={{
                                height: `calc((74/1080) * ${windowHeight}px)`,
                                fontSize: `calc((30/1080) * ${windowHeight}px)`
                    }}>
                        Sign In</button>
                    <button className='sign-up' onClick={signUp}
                            style={{
                                height: `calc((74/1080) * ${windowHeight}px)`,
                                fontSize: `calc((30/1080) * ${windowHeight}px)`
                    }}>
                        Sign Up</button>
                </div>
            </div>
            <div className="main-info"
                 style={{
                     height: `calc((638/1080) * ${windowHeight}px)`,
                     margin: `calc((54/1080) * ${windowHeight}px) auto 0 auto`
            }}>
                <div className="description"
                     style={{
                         fontSize: `calc((35/1080) * ${windowHeight}px)`,
                         marginTop: `calc((134/1080) * ${windowHeight}px)`
                }}>
                    <p>DoDare is a unique app that turns everyday
                        tasks into an exciting adventure. With DoDare,
                        users can create tasks based on their personal
                        goals and interests, with rewards for completing
                        tasks while penalties for not completing them.
                        This boosts motivation and helps the user stay
                        on track to achieve their goals. To use the app,
                        you need a desire to improve your life by setting
                        and achieving new goals every day.</p>
						<p>{message}</p>
                </div>
                <div className="characters"
                     style={{
                         height: `calc((261/1080) * ${windowHeight}px)`,
                         marginTop: `calc((160/1080) * ${windowHeight}px)`
                }}>
                    <img src="/character1.png" alt=""
                         style={{
                             height: `calc((229/1080) * ${windowHeight}px)`,
                             width: `calc((169/1920) * 100vw)`
                    }}/>
                    <img src="/character2.png" alt=""
                         style={{
                             height: `calc((261/1080) * ${windowHeight}px)`,
                             width: `calc((200/1920) * 100vw)`
                        }}/>
                    <img src="/character3.png" alt=""
                         style={{
                             height: `calc((247/1080) * ${windowHeight}px)`,
                             width: `calc((133/1920) * 100vw)`
                        }}/>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
