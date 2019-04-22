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

function* adminSaga() {
    yield takeLatest('FETCH_INFO', fetchInfo);
}

export default adminSaga;