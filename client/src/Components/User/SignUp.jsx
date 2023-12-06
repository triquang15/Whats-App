import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Alert, Button, Snackbar } from '@mui/material';

export const SignUp = (e) => {
    const [inputData, setInputData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate(false);
    const [openSnackBar, setOpenSnackBar] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit");
        setOpenSnackBar(true);
    };

    const handleChange = () => { };

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    };

    return (
        <div>
            <div>
            <div className="flex justify-center min-h-screen items-center">
                <div className="w-[30%] p-10 shadow-md bg-white">
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <h1 className="text-xl font-bold">
                            Register to your WhatsApp account
                        </h1>
                        <div>
                            <p className="mb-2 font-semibold">Username</p>
                            <input
                                className="py-2 px-3 outline outline-orange-900 w-full rounded-md border-1"
                                type="text"
                                placeholder="Enter username"
                                name="fullName"
                                onChange={(e) => handleChange(e)}
                                value={inputData.fullName}
                            />
                        </div>
                        <div>
                            <p className="mb-2 font-semibold">Email Address</p>
                            <input
                                className="py-2 px-3 outline outline-orange-900 w-full rounded-md border-1"
                                type="text"
                                placeholder="Enter your email"
                                name="email"
                                onChange={(e) => handleChange(e)}
                                value={inputData.email}
                            />
                        </div>
                        <div>
                            <p className="mb-2 font-semibold">Password</p>
                            <input
                                className="py-2 px-3 outline outline-orange-900 w-full rounded-md border-1"
                                type="password"
                                placeholder="Enter your pasword"
                                name="password"
                                onChange={(e) => handleChange(e)}
                                value={inputData.password}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                sx={{ bgcolor: "#5a2257", padding: ".5rem 0rem" }}
                                className="w-full bg-orange-800"
                                variant="contained"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </form>
                    <div className="flex space-x-3 items-center mt-5">
                        <p className="m-0">Already have an account?</p>
                        <p
                            onClick={() => navigate("/signin")}
                            className="text-blue-500 hover:text-blue-800 cursor-pointer font-bold"
                        > Log in
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleSnackBarClose}>
                    <Alert onClose={handleSnackBarClose} security='success' sx={{ width: '100%' }}>
                        Account registration successful
                    </Alert>
                </Snackbar>
            </div>
            </div>
        </div>
    );
};
