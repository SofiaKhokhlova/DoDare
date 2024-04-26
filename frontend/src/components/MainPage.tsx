import '../css/mainPage.css';
import { useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function MainPage() {
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
        fetch('http://localhost:8080/api/test')
            .then(response => response.text())
            .then(message => setMessage(message))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    return (
        <div id="main-page">
            <div className="header">
                <a href='' id="about" onClick={about}>About</a>
                <div className="logo-title">
                    <img src="/logo.png" alt="logo" />
                    <p>DODARE</p>
                </div>
                <div className="buttons">
                    <button className='sign-in' onClick={signIn}>Sign In</button>
                    <button className='sign-up' onClick={signUp}>Sign Up</button>
                </div>
            </div>
            <div className="main-info">
                <div className="description">
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
                <div className="characters">
                    <img src="/character1.png" alt="" />
                    <img src="/character2.png" alt="" />
                    <img src="/character3.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
