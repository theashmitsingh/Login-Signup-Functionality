import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utilities/utils';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;

        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError("Some fields are missing");
        }
        try {
            const url = "http://localhost:3000/api/v1/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, token, name, error } = result;
            console.log(result);
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', token);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                            <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                value={loginInfo.email}
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
                                value={loginInfo.password}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>

                        <div className="mt-4 text-center">
                            <span className="text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                            </span>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Login
