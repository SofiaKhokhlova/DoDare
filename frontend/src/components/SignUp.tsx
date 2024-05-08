import { useNavigate } from 'react-router-dom';
import { useState, SyntheticEvent, useEffect } from "react";
import '../css/signUp.css';

function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [errors, setErrors] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (!userName.trim()) {
            errorsCopy.userName = "User name is mandatory";
            isValid = false;
        } else if (userName.trim().length < 5 || userName.trim().length > 50) {
            errorsCopy.userName = "User name must be between 5 and 50 symbols long";
            isValid = false;
        } else
            errorsCopy.userName = "";

        if (!email.trim()) {
            errorsCopy.email = "Email is mandatory";
            isValid = false;
        } else if (!email.includes("@")) {
            errorsCopy.email = "Email must contain the @ symbol";
            isValid = false;
        } else
            errorsCopy.email = "";


        if (!password.trim()) {
            errorsCopy.password = "Password is mandatory";
            isValid = false;
        } else if (password.trim().length < 8 || password.trim().length > 30 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            errorsCopy.password = "Password must be between 8 and 30 characters long and contain letters and numbers";
            isValid = false;
        } else
            errorsCopy.password = "";

        if (!confirmPassword.trim()) {
            errorsCopy.confirmPassword = "You must confirm the password";
            isValid = false;
        } else if (password !== confirmPassword) {
            errorsCopy.confirmPassword = "Passwords don't match!"
            isValid = false;
        } else
            errorsCopy.confirmPassword = "";


        setErrors(errorsCopy);

        if (isValid)
            nav('/sign-in');

    }

    return (
        <>
            <div className="sign-up-page"
                 style={{
                     height: `${windowHeight}px`
            }}>
                <div className="empty-space-sign-up"
                     style={{
                         height: `calc((32/1080) * ${windowHeight}px)`
                }}></div>
                <div className="header"
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

                <div className="sign-up-container"
                     style={{
                         height: `calc((648/1080) * ${windowHeight}px)`,
                         margin: `calc((70/1080) * ${windowHeight}px) auto`
                     }}>
                    <p
                        style={{
                            fontSize: `calc((60/1080) * ${windowHeight}px)`,
                            paddingTop: `calc((16/1080) * ${windowHeight}px`
                    }}>
                        Sign Up</p>
                    <form
                        style={{
                            marginTop: `calc((32/1080) * ${windowHeight}px)`
                        }}>
                        <div className="user-name"
                             style={{
                                 marginBottom: `calc((32/1080) * ${windowHeight}px)`
                             }}>
                            <input
                                style={{
                                    fontSize: `calc((20/1080) * ${windowHeight}px)`,
                                    height: `calc((57/1080) * ${windowHeight}px)`
                                }}
                                type="text"
                                placeholder='User Name'
                                name='userName'
                                value={userName}
                                className={`form-control ${errors.userName ? "is-invalid" : ""}`}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                            {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
                        </div>
                        <div className="email"
                             style={{
                                 marginBottom: `calc((32/1080) * ${windowHeight}px)`
                             }}>
                            <input
                                style={{
                                    fontSize: `calc((20/1080) * ${windowHeight}px)`,
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
                        <div className="password-up"
                             style={{
                                 marginBottom: `calc((32/1080) * ${windowHeight}px)`
                             }}>
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
                        <div className="confirm-password"
                             style={{
                                 marginBottom: `calc((56/1080) * ${windowHeight}px)`
                             }}>
                            <input
                                style={{
                                    fontSize: `calc((20/1080) * ${windowHeight}px)`,
                                    height: `calc((57/1080) * ${windowHeight}px)`
                                }}
                                type="password"
                                placeholder='Confirm password'
                                name='ConfirmPassword'
                                value={confirmPassword}
                                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                        <div className="button-sign-up">
                            <button
                                style={{
                                    fontSize: `calc((20/1080) * ${windowHeight}px)`,
                                    height: `calc((57/1080) * ${windowHeight}px)`
                                }}
                                className='submit-sign-up'
                                onClick={(event: SyntheticEvent) => validateForm(event)}>
                                    Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;