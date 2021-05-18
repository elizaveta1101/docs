export function createStore(rootReducer, initialState) {
    let state = rootReducer(initialState, {type: '__INIT__'});
    const subscibers = [];

    return {
        //все объекты следят за изменениями
        //action === {type: "EXAMPLE"}
        dispatch(action) {
            state = rootReducer(state, action);
            subscibers.forEach(sub => sub());
        },
        //все объекты отреагируют на изменения
        //что надо сделать, если произошло нужное событие 
        subscribe(callback) {
            subscibers.push(callback)
        },
        getState() {
            return state;
        }
    }
}