import { combineReducers } from "redux";
import { ASYNC_INCREMENT, DECREMENT, INCREMENT, CHANGE_THEME, LOCK_BTN, UNLOCK_BTN } from "./types";

function counterReducer(state = 0, action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default: return state;
    }
}

const initialThemeState = {
    value: 'light'
}
function themeReducer(state = initialThemeState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return { ...state, value: action.payload }
        default: return state
    }
}

const initialBtnState = {
    locked: false
}
function btnReducer(state = initialBtnState, action) {
    switch (action.type) {
        case LOCK_BTN:
            return { ...state, locked: true };
        case UNLOCK_BTN:
            return { ...state, locked: false };
        default: return state;
    }
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
    btn: btnReducer
})