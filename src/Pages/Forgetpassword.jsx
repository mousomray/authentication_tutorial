import React, { useState } from 'react';
import Layout from './Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Forgetpassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForget = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("https://ecommerce-2k0v.onrender.com/api/auth/forgot-password", { email, newPassword, answer });

            // This step is necessary for private routing
            if (response.data.success === true) {
                toast.success(response.data.message);
                navigate('/login');
                setLoading(false)
            } else {
                toast.error(response?.data?.message);
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
            setLoading(false)
        }
    };

    return (
        <Layout>
            <div className='container-fluid vh-100'>
                <div className='mx-auto mt-5 p-4 border border-success rounded-3' style={{ width: "400px", boxShadow: "0px 4px 8px green" }}>
                    <form onSubmit={handleForget}>
                        <h4 className='text-center'>Forget Password</h4>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputAnswer1" className="form-label">Answer</label>
                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer1" />
                        </div>
                        <button type="submit" className="btn btn-success">{loading ? <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div> : "Submit"}</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Forgetpassword;
