const adminReducer = (state = [], action) => {
    console.log('adminReducer was hit', action);

    switch (action.type) {
        case 'GET_INFO':
            return action.payload
        default:
            return state;
    }

};
export default adminReducer;