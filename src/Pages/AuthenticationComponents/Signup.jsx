import {useState} from 'react';
import { LabelInput } from '../../Components/Inputs';
import { Buttons } from '../../Components/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/common.scss';
import Oauth from './Oauth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {auth} from '../../config.js';

export default function SignUp() {
  const [values, setValues] = useState({
    uname:'',
    email: '',
    password:'',
    cpassword:''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  
  const handleSignUp = (e) =>{
    e.preventDefault();
    if(values.password === values.cpassword){
      setErrorMsg("Passwords are matching.");
    }else{
      setErrorMsg("Passwords do not match");
    }
    setErrorMsg("");
    setIsDisabled(true); 
    createUserWithEmailAndPassword(auth, values.email, values.password).then(async(res) =>
    {
      setIsDisabled(false); 
      const user = res.user;
      await updateProfile(user,{
        displayName: values.uname,
      });
      navigate("/")
    }).catch((err) => {
      setIsDisabled(false);  
      setErrorMsg(err.message);
    });
  } 


  return (
    <div className="sign-in-container">
      <div className="sign-in-wrapper">
        <h1 className="auth-header">Sign Up</h1>
        <form onSubmit = {handleSignUp}>
          <LabelInput type="text" 
            value={values.uname} 
            className="username" 
            placeholder="Enter you Username" 
            onChange={(e) => setValues((prev) => ({...prev, uname: e.target.value}))} 
            labelfor="uname" 
            id="uname"
            labelvalue="Enter your username" />
          <LabelInput type="text" 
            value={values.email} 
            className="Email" 
            placeholder="Enter you Email Address" 
            onChange={(e) => setValues((prev) => ({...prev, email: e.target.value}))} 
            labelfor="email" 
            id="email"
            labelvalue="Enter your Email" />

          <LabelInput type="password" 
            value={values.password} 
            className="Password" 
            placeholder="Enter you Password" 
            onChange={(e) => setValues((prev) => ({...prev, password: e.target.value}))} 
            id="password"
            labelfor="password" 
            labelvalue="Enter your Password" />

          <LabelInput type="password" 
            value={values.cpassword} 
            className="confirmPassword" 
            placeholder="Confirm Password" 
            onChange={(e) => setValues((prev)=>({...prev, cpassword: e.target.value}))} 
            id="confirmPassword"
            labelfor="confirmPassword" 
            labelvalue="Confirm Password" /> 
          <div className='text-center'>
            <p>{errorMsg}</p>
            <Buttons type="submit" value="Sign up" className="button sign-up" disabled={isDisabled} />
            <Oauth />
            <p className="text-info">Already have an accound? {" "}
              <span>
                <Link to="/">Sign in</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}