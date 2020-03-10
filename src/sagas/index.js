import {put, takeLatest, all} from 'redux-saga/effects';
import SearchBoxActions from '../actions';

const API_URL = 'https://swapi.co/api';

function* fetchPlanets(action) {
    if (action.type === SearchBoxActions.CLOSE_POPUP_LIST) {
        return;
    }

    //prevent search empty string
    if (!action.payload) {
        yield put({type: SearchBoxActions.PLANETS_RECEIVED, planets: []});
        return;
    }

    try {
        const json = yield fetch(`${API_URL}/planets/?search=${action.payload}`)
            .then(response => response.json());
        yield put({type: SearchBoxActions.PLANETS_RECEIVED, planets: json.results, searchedText: action.payload});
    } catch (error) {
        yield put({type: 'REQUEST_FAILED', error})
    }
}

function* actionWatcher() {
    yield takeLatest([SearchBoxActions.GET_PLANETS, SearchBoxActions.CLOSE_POPUP_LIST], fetchPlanets)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}