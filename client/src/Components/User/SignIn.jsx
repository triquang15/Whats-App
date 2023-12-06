import { Alert, Button, Snackbar } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const SignIn = () => {
    const [inputData, setInputData] = useState({email: "", password: ""});
    const navigate = useNavigate(false);
    const [openSnackBar, setOpenSnackBar] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handleSubmit");
        setOpenSnackBar(true);
    }

    const handleChange = () => {

    }

    const handleSnackBarClose =() => {
        setOpenSnackBar(false);
    }

  return (
    <div className=''>
        <div className='flex justify-center min-h-screen items-center'>
            <div className='w-[30%] p-10 shadow-md bg-white'>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <h1 className='text-xl font-bold'>Log in to your WhatsApp account</h1>
                    <div>
                        <p className='mb-2 font-semibold'>Email Adress</p>
                        <input placeholder='Enter your email' onChange={handleChange} value={inputData.email}
                        type="text" className='py-2 outline outline-orange-900  w-full rounded-md border' />
                    </div>
                    <div>
                        <p className='mb-2 font-semibold'>Password</p>
                        <input placeholder='Enter your password' onChange={handleChange} value={inputData.password}
                        type="password" className='py-2 outline outline-orange-900 w-full rounded-md border' />
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
            <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} security='success' sx={{width: '100%'}}>
                Logged in successfully.
                </Alert>
            </Snackbar>
        </div>
    </div>
  )
}
