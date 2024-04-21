import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import {Navigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import Forgetpassword from './Pages/Forgetpassword'

const App = () => {

    // Create Function for private routing
    function PrivateRoute({ children }) {
        const token =localStorage.getItem("auth") || sessionStorage.getItem("auth");
        return token !== null && token !== undefined ? (
          children
        ) : (
          <Navigate to="/login" />
        );
      }


   // Public Route For Public Page 
    const public_route = [
        {
            path:"/login",
            component:<Login/>
        },
        {
            path:"/register",
            component:<Register/>
        },
        {
            path:"/forgetpassword",
            component:<Forgetpassword/>
        }
    ]

    // Private Route For Private Page
    const private_route = [
        {
            path:"/",
            component:<Home/>
        }
        
    ]

    

    return (
        <>
        <ToastContainer/>
            <Router>
                <Routes>
                    {
                        public_route?.map((value) =>{
                            return(
                                <>
                               <Route path={value.path} element={value.component}/>
                                </>
                            )
                        })
                    }

                    {
                        private_route?.map((value) =>{
                            return(
                                <>
                                {/*Apply Private Routing in Route*/}
                                <Route path={value.path} element={<PrivateRoute>{value?.component}</PrivateRoute>}/>
                                </>
                            )
                        })
                    }
                </Routes>
            </Router>


        </>
    )
}

export default App
