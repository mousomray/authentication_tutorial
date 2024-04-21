import React, { useState } from 'react'
import Layout from './Layout'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../Context/Authcontext'; // Import useAuth 
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth() // Custom Hook
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    const handlelogin = async (e) => {
        e.preventDefault()

        setloading(true)

        try {
            const response = await axios.post("https://ecommerce-2k0v.onrender.com/api/auth/login", { email, password });

           // This step is very import for auth. success === true can be status === 200 or others for another api
            if (response && response?.data.success === true) {
                toast.success(response?.data?.message);

                // Auth start 
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token
                });
                localStorage.setItem("auth", JSON.stringify(response?.data))
                // Auth end 

                navigate('/') // Navigate Home Page
                setloading(false)

            } else {
                toast.error(response?.data?.message);
                setloading(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setloading(false)
        }
    }

    return (
        <>
            <Layout>

                <div className='container-fluid vh-100'>
                    <div className='mx-auto mt-5 p-4 border border-success rounded-3' style={{ width: "400px", boxShadow: "0px 4px 8px green" }}>
                        <form onSubmit={handlelogin}>
                            <h4 className='text-center'>Login Page</h4>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className='mb-3'>
                                <Link to="/forgetpassword">Forget password</Link>
                            </div>
                            <button type="submit" class="btn btn-success">{loading ? <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div> : "Login"}</button>

                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login