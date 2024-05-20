import '../css/aboutPage.css';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

function AboutPage() {

    const nav = useNavigate();

    function signIn() {
        nav('/sign-in');
    }

    function signUp() {
        nav('/sign-up');
    }

    function about() {
        nav('/');
    }

	const [message, setMessage] = useState('');
	useEffect(() => {
        fetch('http://localhost:8080/hello')
            .then(response => response.text())
            .then(message => setMessage(message))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    return (
        <div id="main-page">
            <div className="header-main">
                <a href='' id="about" onClick={about}>About</a>
                <div className="logo-title">
                    <img src="/logo.png" alt="logo"/>
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
                    <img src="/character1.png" className="character1" alt="char1"/>
                    <img src="/character2.png" className="character2" alt="char2"/>
                    <img src="/character3.png" className="character3" alt="char3"/>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
