import { BASE_API } from "../../config/api"
import { LOG_OUT, REQ_USER, SEARCH_USER, SIGN_IN, SIGN_UP, UPDATE_USER } from "./ActionType";

export const signUp = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        const user = await res.json();
        if(user.jwt) localStorage.setItem("token",user.jwt)
        console.log("SIGN_UP ", user);
        dispatch({type: SIGN_UP, payload:user});
    } catch (error) {
        console.log(error);
    }
}

export const signIn = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })
        const user = await res.json();
        if(user.jwt) localStorage.setItem("token",user.jwt)
        console.log("SIGN_IN ", user);
        dispatch({type: SIGN_IN, payload:user});
    } catch (error) {
        console.log(error);
    }
}

export const currentUser = (token) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/api/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        const user = await res.json();
        console.log("Current User ", user);
        dispatch({type: REQ_USER, payload:user});
    } catch (error) {
        console.log(error);
    }
}

export const searchUser = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/api/users/search?keyword=${data.keyword}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`
            },
        })
        const user = await res.json();
        console.log("Search User ", user);
        dispatch({type: SEARCH_USER, payload:user});
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/api/users/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`
            },
            body:JSON.stringify(data.data)
        })
        const user = await res.json();
        console.log("Update User ", user);
        dispatch({type: UPDATE_USER, payload:user});
    } catch (error) {
        console.log(error);
    }
}

export const logoutAction = ()=> async(dispatch) => {
    localStorage.removeItem("token");
    dispatch({type: LOG_OUT, payload:null})
    dispatch({type: REQ_USER, payload:null})
}

