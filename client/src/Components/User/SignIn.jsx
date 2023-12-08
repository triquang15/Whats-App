import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { currentUser, signIn } from '../../Redux/Auth/Action';

export const SignIn = () => {
    const [inputData, setInputData] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarWarning, setOpenSnackBarWarning] = useState(false);
    const dispatch = useDispatch();
    const {auth} = useSelector(store => store);
    const token = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signIn(inputData));
        setOpenSnackBar(true);
        if(token === null ) {
            setOpenSnackBarWarning(true);
            setOpenSnackBar(false);
        } 
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputData((values) => ({...values,[name]: value}))
    }

    const handleSnackBarClose =() => {
        setOpenSnackBar(false);
    }

    const handleSnackBarWarningClose =() => {
        setOpenSnackBarWarning(false);
    }

    useEffect(() => {
        if(token) dispatch(currentUser(token));
    }, [token])

    useEffect(() => {
        if(auth.reqUser?.fullName) {
            navigate("/")
        }
    }, [auth.reqUser])

  return (
    <div className=''>
        <div className='flex justify-center min-h-screen items-center'>
            <div className='w-[30%] p-10 shadow-md bg-white'>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <h1 className='text-xl font-bold'>Log in to your WhatsApp account</h1>
                    <div>
                        <p className='mb-2 font-semibold'>Email Adress</p>
                        <input required placeholder='Enter your email' onChange={handleChange} value={inputData.email}
                        type="email" name='email' pattern="[^ @]*@[^ @]*" className='py-2 outline outline-orange-900  w-full rounded-md border' />
                    </div>
                    <div>
                        <p className='mb-2 font-semibold'>Password</p>
                        <input required placeholder='Enter your password' onChange={handleChange} value={inputData.password}
                        type="password" name='password' className='py-2 outline outline-orange-900 w-full rounded-md border' />
                    </div>
                    <div>
                        <Button type='submit' sx={{bgcolor:"#5a2257", padding:".5rem 0rem"}} className='w-full bg-orange-800' variant='contained'>Sign In</Button>
                    </div>
                </form>
                <div className='flex space-x-3 items-center mt-5'>
                    <p className='m-0'>Don't have an Account?</p>
                    <p
                            onClick={() => navigate("/signup")}
                            className="text-blue-500 hover:text-blue-800 cursor-pointer font-bold"
                        > Sign up
                        </p>
                </div>
            </div>
        </div>
        <div>
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} security='success' sx={{width: '100%'}}>
                Logged in successfully.
                </Alert>
            </Snackbar>
        </div>

     <div>
            <Snackbar open={openSnackBarWarning} autoHideDuration={2000} onClose={handleSnackBarWarningClose}>
                 <Alert onClose={handleSnackBarWarningClose} severity="error">Incorrect email or password</Alert>
            </Snackbar>
        </div>
    </div>
  )
}
