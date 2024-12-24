import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utilities/utils';

const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;

        setSignupInfo(copySignupInfo);
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError("Some fields are missing");
        }
        try {
            const url = "http://localhost:3000/api/v1/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    // console.log("Signup info: ", signupInfo);


    return (
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign Up</h1>
                    <form onSubmit={handleSignUp}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                id="name"
                                autoFocus
                                placeholder="Enter Your Name"
                                value={signupInfo.name}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                            <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                value={signupInfo.email}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Your Password"
                                value={signupInfo.password}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Sign Up
                        </button>

                        <div className="mt-4 text-center">
                            <span className="text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                            </span>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Signup
