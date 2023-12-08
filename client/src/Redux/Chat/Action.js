import { BASE_API } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

export const createChat = (chatData) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/api/chats/single`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${chatData.token}`
            },
            body: JSON.stringify(chatData.data)
        })
        const data = await res.json();
        console.log("Create Chat ", data);
        dispatch({ type: CREATE_CHAT, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const createGroupChat = (chatData) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/api/chats/group`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${chatData.token}`
            },
            body: JSON.stringify(chatData.group)
        })
        const data = await res.json();
        console.log("Create Chat ", data);
        dispatch({ type: CREATE_GROUP, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getUserChat = (chatData) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/api/chats/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${chatData.token}`
            },
        })
        const data = await res.json();
        console.log("Create Chat ", data);
        dispatch({ type: GET_USERS_CHAT, payload: data })
    } catch (error) {
        console.log(error);
    }
}