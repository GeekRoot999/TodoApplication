import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {auth} from '../../config';
import google from '../../Assets/Images/google.svg'
import facebook from '../../Assets/Images/facebook.svg'

export default function Oauth(){
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    
    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        console.log("Google Sign In Clicked");
        signInWithPopup(auth, provider).then((data) => {
            console.log(data);
            setValue(data.user.email);
            navigate('/dashboard');
            // localStorage.setItem('email', data.user.email);
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const handlefacebookSignIn = () => {
        const provider = new FacebookAuthProvider();
        console.log("Facebook Sign In Clicked");
        signInWithPopup(auth, provider).then((data)=> {
            setValue(data.user.email);
            navigate('/dashboard');
        }).catch((err) => {
            console.log(err.message);
        })
    }

    // useEffect(() => {
    //     setValue(localStorage.getItem('email'));
    // })

    return(
        <>
            <div className="oauth-container">
                <div className="google-auth-wrapper" onClick={handleGoogleSignIn}>
                    <img src={google} width='25' alt="Google" />
                    <span>{" "}Sign In with Google</span>
                </div>
                <div className="facebook-auth-wrapper" onClick={handlefacebookSignIn}>
                    <img src={facebook} width='25' alt="facebook" />
                    <span>{" "}Sign In with facebook</span>
                </div>
            </div>
        </>
    );
}