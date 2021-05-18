import { CREATE_POST, FETCH_POSTS, HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER, REQUEST_POSTS } from "./types";

export function createPost(post) {
    return {
        type: CREATE_POST,
        payload: post
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}
export function showAlert(message) {
    return dispatch => { 
        dispatch({
            type: SHOW_ALERT, 
            payload: message 
        })
        setTimeout(() => {
            dispatch(hideAlert())
        }, 3000)
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function fetchPosts() {
    // return async dispatch => {
    //     try {
    //         dispatch(showLoader());
    //         const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    //         const json = await response.json();
    //         setTimeout(() => {
    //             dispatch({ type: FETCH_POSTS, payload: json });
    //             dispatch(hideLoader());
    //         }, 500);
    //     } catch {
    //         dispatch(showAlert('Ошибка!! Данные не были найдены'));
    //         dispatch(hideLoader());
    //     }
    // }
    return {
        type: REQUEST_POSTS
    }
}