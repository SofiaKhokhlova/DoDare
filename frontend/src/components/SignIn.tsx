import { useNavigate } from 'react-router-dom';
import { useState, SyntheticEvent, useEffect } from "react";
import '../css/signIn.css';

function SignIn() {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

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

    function validateForm(event: SyntheticEvent) {
        event.preventDefault()

        let isValid = true;

        const errorsCopy = { ...errors };

        if (!email.trim()) {
            errorsCopy.email = "Email is mandatory";
            isValid = false;
        } else if (!email.includes("@")) {
            errorsCopy.email = "Email must contain the @ symbol";
            isValid = false;
        } else {
            errorsCopy.email = "";
        }

        if (!password.trim()) {
            errorsCopy.password = "Password is mandatory";
            isValid = false;
        } else if (password.trim().length < 8 || password.trim().length > 30 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            errorsCopy.password = "Password must be between 8 and 30 characters long and contain letters and numbers";
            isValid = false;
        } else {
            errorsCopy.password = "";
        }

        setErrors(errorsCopy);

        if (isValid) {
            nav('/my-tasks');
        }

    }

    return (
        <>
            <div className="sign-in-page"
                 style={{
                     height: `${windowHeight}px`
                }}>
                <div className="empty-space-sign-in"></div>
                <div className="header-sign-in"
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

                <div className="sign-in-container"
                     style={{
                         height: `calc((476/1080) * ${windowHeight}px)`,
                         margin: `calc((70/1080) * ${windowHeight}px) auto`
                }}>
                    <p
                        style={{
                            fontSize: `calc((60/1080) * ${windowHeight}px)`,
                            paddingTop: `calc((16/1080) * ${windowHeight}px)`
                    }}>
                        Sign In</p>
                    <form
                        style={{
                            marginTop: `calc((32/1080) * ${windowHeight}px)`
                    }}>
                        <div className="email"
                             style={{
                                 marginBottom: `calc((32/1080) * ${windowHeight}px)`
                        }}>
                            <input
                                style={{
                                    fontSize: `calc((20/1080) * ${windowHeight}px)` ,
                                    height: `calc((57/1080) * ${windowHeight}px)`
                                }}
                                type="text"
                                placeholder='Email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="password">
                            <input
                                style={{
                                    fontSize: `calc((20/1080) * ${windowHeight}px)`,
                                    height: `calc((57/1080) * ${windowHeight}px)`
                                }}
                                type="password"
                                placeholder='Password'
                                name='password'
                                value={password}
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="button-sign-in">
                            <button
                                className='submit-sign-in'
                                onClick={(event: SyntheticEvent) => validateForm(event)}
                                style={{
                                    marginTop: `calc((56/1080) * ${windowHeight}px)`,
                                    fontSize: `calc((20/1080) * ${windowHeight}px)`,
                                    height: `calc((57/1080) * ${windowHeight}px)`
                                }}>
                                Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;