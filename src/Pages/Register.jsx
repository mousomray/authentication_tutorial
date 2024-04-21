import React, { useState } from 'react'
import Layout from './Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Register = () => {
    // create Hooks for all form field
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Navigate another page 

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Loading will be start

        try {
            const response = await axios.post('https://ecommerce-2k0v.onrender.com/api/auth/register', {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });

            // This step is must for Private routing 
            if (response && response?.data?.success === true) {
                toast.success(response?.data?.message)
                setLoading(false)
                navigate("/login");
            } else {
                toast.error(response?.data?.message)
                setLoading(false);
            }

        } catch (error) {
            // Handle any errors that occurred during the axios request
            console.error('Error occurred:', error);
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    };



    return (
        <>
            <Layout>

                <div className='container-fluid vh-100'>
                    <div className='mx-auto mt-5 p-4 border border-info rounded-3' style={{ width: "400px", boxShadow: "0px 4px 8px blue" }}>
                        <form onSubmit={handleOnSubmit}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Name</label>
                                <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} id="" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email</label>
                                <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">phone</label>
                                <input type="tel" class="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Address</label>
                                <input type="text" class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Answer</label>
                                <input type="text" class="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} id="exampleInputPassword1" />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                {loading ? <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div> : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Register