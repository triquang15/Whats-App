import { BASE_API } from "../../config/api";
import { GET_ALL_MESSAGE, NEW_MESSAGE } from "./ActionType";

export const createMessage = (msgData) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/api/messages/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${msgData.token}`
            },
            body: JSON.stringify(msgData.data)
        })
        const data = await res.json();
        console.log("Create Message ", data);
        dispatch({ type: NEW_MESSAGE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getAllMessage = (msgData) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/api/messages/chat/${msgData.chatId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${msgData.token}`
            },
      
        })
        const data = await res.json();
        console.log("Get All Message ", data);
        dispatch({ type: GET_ALL_MESSAGE, payload: data })
    } catch (error) {
        console.log(error);
    }
}