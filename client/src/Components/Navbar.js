// src/Components/Navbar.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation(); // Track the current route

  return (
    <nav className="bg-green-100 p-4 shadow-lg h-full w-64"> {/* Adjust width for vertical layout */}
      <ul className="flex flex-col space-y-4"> {/* Use flex-col for vertical stacking */}
        <li><a href="/" className="hover:text-green-600">Home</a></li>
        <li><a href="/profile" className="hover:text-green-600">Profile</a></li>
        <li><a href="/login" className="hover:text-green-600">Login</a></li>
        <li><a href="/resource" className="hover:text-green-600">Resource</a></li>
        <li><a href="/review" className="hover:text-green-600">Review</a></li>
        <li><a href="/appointment" className="hover:text-green-600">Appointment</a></li>
      </ul>
    </nav>
  );
};


// export default Navbar;
