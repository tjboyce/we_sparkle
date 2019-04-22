import { put as dispatch, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchInfo (action) {
    try {
    const infoResponse = yield axios.get ('/admin'); 
    console.log('fetch info saga was hit', infoResponse.data);
    yield dispatch ({type: 'GET_INFO', payload: infoResponse.data})
   
    } catch (error){
        console.log('error wit your fetch info');
        
    }
}
function* addService(action) {
    console.log('action.payload:', action.payload);
    
    try {
        yield axios.post('/admin', action.payload);
        yield dispatch({ type: 'FETCH_INFO' });
    } catch (error) {
        console.log('post Saga error', error);
    }
}

function* adminSaga() {
    yield takeLatest('FETCH_INFO', fetchInfo);
    yield takeLatest ('ADD_SERVICE', addService)
}

export default adminSaga;