//!!!!!!!!
//async functions should be placed here but not in rootReducer.js 
//!!!!!!!!

import { DECREMENT, INCREMENT, ASYNC_INCREMENT, CHANGE_THEME, LOCK_BTN, UNLOCK_BTN } from "./types";

export function increment() {
    return {
        type: INCREMENT
    }
}
export function decrement() {
    return {
        type: DECREMENT
    }
}
export function asyncIncrement() {
    return function (dispatch) {
        dispatch(lockBtn());
        setTimeout(() => {
            dispatch(increment());
            dispatch(unlockBtn());
        }, 2000);
    }
}

export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}

export function lockBtn() {
    return {
        type: LOCK_BTN
    }
}
export function unlockBtn() {
    return {
        type: UNLOCK_BTN
    }
}