import axios from 'axios';
import {
    put,
    takeLatest
} from 'redux-saga/effects';

// This saga will hit the webhook route in order to intialize the FB handshake.
function* fetchWebhook() {
    try {
        console.log('Webhook saga hit.')
        const response = yield axios.get('/');

        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({
            type: 'SET_USER',
            payload: response.data
        });
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* webhookSaga() {
    yield takeLatest('WEBHOOK', fetchWebhook);
}

export default webhookSaga;