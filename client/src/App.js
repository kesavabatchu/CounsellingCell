import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './Components/LoginButton';
import LogoutButton from './Components/LogoutButton';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import Login from './Pages/Login';
import { Resource } from './Pages/Resource';
import { Review } from './Pages/Review';
import { Appointment } from './Pages/Appointment';
import { Navbar } from './Components/Navbar';
import Profile from "./Pages/Profile";  // Fix the import for Profile (default export)
import StudentManagement from './Pages/StudentManagement';  // New student management component
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  const [username, setUsername] = useState("Sahil");
  const { isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops... {error.message}</div>;

  return (
    <div className="App">

      {/* <Profile /> */}

      <Router>
        {/* Navbar is always present */}
        <Navbar />

        {/* Routes for different components */}
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home username={username} />} />

          {/* Profile page with props for username management */}
          <Route path="/Profile" element={<Profile username={username} setUsername={setUsername} />} />

          {/* Login page */}
          <Route path="/Login" element={<Login />} />

          {/* Resource page */}
          <Route path="/Resource" element={<Resource />} />

          {/* Review page */}
          <Route path="/Review" element={<Review />} />

          {/* Appointment page */}
          <Route path="/Appointment" element={<Appointment />} />

          {/* Student management page */}
          <Route path="/students" element={<StudentManagement />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
