// import { createStore } from './createStore';
import { applyMiddleware, createStore, compose } from 'redux';
import { decrement, increment, asyncIncrement, changeTheme, lockBtn } from './redux/actions';
import { rootReducer } from './redux/rootReducer';
// import { DECREMENT, INCREMENT } from './redux/types';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import './styles.css'

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement());
});

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
    ? 'dark'
    : 'light';
    store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
    const state = store.getState();
    counter.textContent = state.counter;
    document.body.classList = state.theme.value;
    [addBtn, subBtn, themeBtn].forEach((btn) => btn.disabled = state.btn.locked);
});

store.dispatch({ type: 'INIT_APPLICATION' });


