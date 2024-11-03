import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Login = () => {
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } = useAuth0();

  const determineUserRole = (userRole) => {
    localStorage.setItem("userRole", userRole); // Store user role in local storage
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // Send user data to backend after successful login
      const sendUserData = async () => {
        try {
          await axios.post("http://localhost:3001/users", {
            username: user.name,
            useremail: user.email,
            userimage: user.picture,
          });
          console.log("User data sent to backend");
        } catch (error) {
          console.error("Error sending user data to backend:", error);
        }
      };

      sendUserData();
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="flex flex-col lg:h-screen">
      {!isAuthenticated && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start mt-8 md:mt-16 mx-4 md:mx-32">
            <div className="text-left flex-1 mb-8 md:mb-0">
              <h1 className="text-indigo-600 text-2xl font-bold mb-4">
                Welcome to Our Counseling Cell
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
                Your mental well-being is our priority.
              </h2>
              <p className="text-xl font-bold text-black">
                Connect with experts to guide your journey.
              </p>
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg mx-auto md:mx-0"
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
              }}
            >
              <h2 className="text-2xl font-bold mb-4">Student Login</h2>
              <p className="mb-4">Need guidance? Connect with us!</p>
              <button
                className="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                onClick={() => {
                  loginWithRedirect();
                  determineUserRole("student");
                }}
              >
                Login as Student
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start mt-8 mb-8 md:mt-16 mx-4 md:mx-32">
            <div className="text-left flex-1 mb-8 mt-12 md:mb-0">
              <h1 className="text-indigo-600 text-2xl font-bold mb-4">
                Welcome Counselors
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
                Support students on their journey.
              </h2>
              <p className="text-xl font-bold text-black">
                Join us to provide meaningful guidance.
              </p>
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg mx-auto md:mx-0 md:ml-16"
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
              }}
            >
              <h2 className="text-2xl font-bold mb-4">Counselor Login</h2>
              <p className="mb-4">Ready to help students?</p>
              <button
                className="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                onClick={() => {
                  loginWithRedirect();
                  determineUserRole("counselor");
                }}
              >
                Login as Counselor
              </button>
            </div>
          </div>
        </>
      )}

      {isAuthenticated && (
        <div className="flex justify-center mt-16 mx-4 md:mx-0 h-screen">
          <div
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
            }}
          >
            <h2 className="text-xl font-bold mb-4">Are you sure? 🤨</h2>
            <button
              className="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
