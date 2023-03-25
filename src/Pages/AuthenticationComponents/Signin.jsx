import {useState} from 'react';
import { LabelInput } from '../../Components/Inputs';
import { Buttons } from '../../Components/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Oauth from './Oauth';
import {auth} from '../../config.js';
import '../../Styles/common.scss';

export default function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email:'',
    password:''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSignIn = (e) =>{
    e.preventDefault();
    if(!values.email || !values.password){
      setErrorMsg("All fields must be filled");
    }
    setErrorMsg('');  
    setIsDisabled(true); 
    signInWithEmailAndPassword (auth, values.email, values.password).then(async(res) =>
    {
      setIsDisabled(false); 
      navigate("/dashboard"); 
    }).catch((err) => {
      setIsDisabled(false);  
      setErrorMsg(err.message);
    });
  }

    return (
      <div className="sign-in-container">
        <div className="sign-in-wrapper">
          <h1 className="auth-header">Login</h1>
          <form onSubmit={handleSignIn}>
            <LabelInput type="text" 
              value={values.email} 
              className="Email" 
              placeholder="Enter you Email Address" 
              onChange={(e) => setValues((prev) => ({...prev, email: e.target.value}))} 
              labelfor="email" 
              id="email"
              // autocomplete={true}
              labelvalue="Enter your Email" />

            <LabelInput type="password" 
              value={values.password} 
              className="Password" 
              placeholder="Enter you Password" 
              onChange={(e) => setValues((prev) => ({...prev, password: e.target.value}))} 
              id="password"
              // autocomplete={true}
              labelfor="password" 
              labelvalue="Enter your Password" />
            <div className='text-center'>
              <p>{errorMsg}</p>
              <Buttons type="submit" value="Sign in" className="button sign-in" disabled={isDisabled} />
              <Oauth />
              <p className="text-info">New here... Want Sign Up?{" "}
                <span>
                  <Link to="/signup">Sign up</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }