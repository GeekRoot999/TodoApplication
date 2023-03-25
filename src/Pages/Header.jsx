import { Buttons } from "../Components/Buttons";
import {auth} from '../config.js';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";

export default function Header(){

    const navigate = useNavigate();

    const handleSignOut = () =>{
        signOut(auth);
        navigate("/"); 
    }

    return (
        <>
            <div className="sign-out">
                <Buttons type="submit" onClick={handleSignOut} value="Sign out" className="button sign-up" disabled="" />
            </div>
        </>
    )
}