import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utilities/utils';

const Home = () => {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:3000/api/v1/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div className='flex justify-center items-center mt-10 h-24'>
                <h1>{loggedInUser}</h1>
                <button onClick={handleLogout} className='ml-10 bg-red-600 px-5 py-2 text-white rounded'>Logout</button>
                <div className='ml-10'>
                    {products && products.map((item, index) => (
                        <ul key={index}>
                            <li>{item.name} : {item.price}</li>
                        </ul>
                    ))}
                </div>

                <ToastContainer />
            </div>
        </>
    )
}

export default Home
