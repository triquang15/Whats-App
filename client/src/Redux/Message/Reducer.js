import { GET_ALL_MESSAGE, NEW_MESSAGE } from "./ActionType";

const initialValue = {
    messages: [],
    newMessage: null,
};

export const messageReducer = (store = initialValue, { type, payload }) => {
    if (type === NEW_MESSAGE) {
        return { ...store, newMessage: payload };
    } else if (type === GET_ALL_MESSAGE) {
        return { ...store, messages: payload };
    }

    return store;
};
