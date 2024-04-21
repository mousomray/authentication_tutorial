import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/Authcontext' // Import useAuth
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {

    const [auth, setAuth] = useAuth() // Create custom hook

    // Make handle for Logout 
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
        toast.success('Successfully logout')
    }

    return (
        <>
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link class="navbar-brand" to='/'>Home</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        
                        {/*Add condition between Login and Logout*/}
                        
                        {
                            !auth.user ? (
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/register">Register </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link"><b>User : </b>{auth.user.name}</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link onClick={handleLogout} class="nav-link" to="/login">Logout </Link>
                                    </li>
                                </>
                            )
                        }

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav
