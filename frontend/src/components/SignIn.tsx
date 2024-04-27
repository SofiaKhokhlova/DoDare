import { useNavigate } from 'react-router-dom';
import { useState, SyntheticEvent } from "react";
import '../css/signIn.css';

function SignIn() {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

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
            <div className="sign-in-page">
                <div className="empty-space-sign-in"></div>
                <div className="header-sign-in">
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

                <div className="sign-in-container">
                    <p>Sign In</p>
                    <form>
                        <div className="email">
                            <input
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
                            <button className='submit-sign-in' onClick={(event: SyntheticEvent) => validateForm(event)}>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;