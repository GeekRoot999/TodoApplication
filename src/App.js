import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/AuthenticationComponents/Signup';
import SignIn from './Pages/AuthenticationComponents/Signin';
import {auth} from './config';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        // console.log(user,"user");
        setIsAuthenticated(true);  
        setUsername(user.displayName);
      }else{
        setUsername('');
      }
    })
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
        {/* {isAuthenticated && <Route path="/dashboard" element={<Dashboard username={username} />} />} */}
      </Routes>
    </div>
  );
}

export default App;
