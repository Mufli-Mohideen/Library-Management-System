import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import 'sweetalert2/dist/sweetalert2.min.css';
import '../styles/Auth.css';
//Through out the project Sweet Alerts is used to alert the users

const Auth: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        UserName: '',
        Email: '',
        Password: ''
    });

    const [loginData, setLoginData] = useState({
        Email: '',
        Password: ''
    });

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    //Check whether the input fields are Empty for the Signup Section
    const validateSignupData = () => {
        const { UserName, Email, Password } = signupData;
        if (!UserName || !Email || !Password) {
            Swal.fire({
                title: 'Oops!',
                text: 'Please fill in all required fields before proceeding with your Sign-Up.',
                icon: 'warning',
                confirmButtonText: 'Ok',
            });
            return false;
        }
        return true;
    };

    //Check whether the input fields are Empty for the Login Section
    const validateLoginData = () => {
        const { Email, Password } = loginData;
        if (!Email || !Password) {
            Swal.fire({
                title: 'Oops!',
                text: 'Please fill in all required fields before proceeding with your Login-In.',
                icon: 'warning',
                confirmButtonText: 'Ok',
            });
            return false;
        }
        return true;
    };

    //Validation check is done before Signing Up
    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateSignupData()) return;

        try {
            const response = await fetch('http://localhost:5289/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            });

            const textResult = await response.text();
            console.log('Signup Response:', textResult);

            if (response.ok) {
                Swal.fire({
                    title: 'Success',
                    text: 'User Registered Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
                setSignupData({
                    UserName: '',
                    Email: '',
                    Password: ''
                });
            } else {
                Swal.fire({
                    title: 'Registration Failed',
                    text: textResult,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            }
        } catch (error) {
            console.error('Signup Error:', error);
        }
    };

    //Validation check is done before Login In
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateLoginData()) return;

        try {
            const response = await fetch('http://localhost:5289/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const textResult = await response.text();
            console.log('Login Response:', textResult);

            if (response.ok) {
                Swal.fire({
                    title: 'Success',
                    text: 'Logged in Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Dashboard');
                    }
                });
            } else {
                Swal.fire({
                    title: 'Login Failed',
                    text: textResult,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            }
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleSignupSubmit}>
                    <h1 style={{ color: 'gray', textAlign: 'center' }}>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </div>
                    <span style={{ color: 'gray' }}>or use your email to register</span>
                    <input type="text" name='UserName' value={signupData.UserName} placeholder="Full Name" onChange={handleSignupInputChange} />
                    <input type="email" name='Email' value={signupData.Email} placeholder="Email" onChange={handleSignupInputChange} />
                    <input type="password" name='Password' value={signupData.Password} placeholder="Password" onChange={handleSignupInputChange} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form onSubmit={handleLoginSubmit}>
                    <h1 style={{ color: 'gray' }}>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </div>
                    <span style={{ color: 'gray' }}>or use your email and password</span>
                    <input type="email" name="Email" value={loginData.Email} placeholder="Email" onChange={handleLoginInputChange} />
                    <input type="password" name="Password" value={loginData.Password} placeholder="Password" onChange={handleLoginInputChange} />
                    <a href="#">Forgot Password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features.</p>
                        <button className="hidden" id="login" onClick={toggleForm}>Sign In</button>
                    </div>

                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Book Worm!</h1>
                        <p>Register with your personal details to use all of site features.</p>
                        <button className="hidden" id="register" onClick={toggleForm}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
