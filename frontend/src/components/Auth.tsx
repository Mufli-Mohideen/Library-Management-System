import React, { useState } from 'react';
import '../styles/Auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';


const Auth: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
            <div className="form-container sign-up">
                <form action="#">
                    <h1 style={{color:'gray', textAlign:'center'}}>Create Account</h1>
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
                    <span style={{color:'gray'}}>or use your email to register</span>
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="button" onClick={toggleForm}>Sign Up</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form action="#">
                    <h1 style={{color:'gray'}}>Sign In</h1>
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
                    <span style={{color:'gray'}}>or use your email and password</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#">Forgot Password?</a>
                    <button type="button" onClick={toggleForm}>Sign In</button>
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