import {all, fork, takeEvery, put, call} from "redux-saga/effects";
import {loginFailure, loginSuccess} from "./userAction";
import * as apiInstance from "../../components/api";


function login(param) {
    console.log('login api 실행');
    return apiInstance.postData('/api/auth/authentication', param);
}

function* loginSaga(action) {
    try {
        console.log('login request');
        const res = yield call(login, action.data);
        console.log('login response : ', res.data);
        yield put(loginSuccess(res.data))
    } catch(e) {
        console.error(e);
        yield put(loginFailure(e.message));
    }
}

function* watchLogin() {
    yield takeEvery('LOGIN_REQUEST', loginSaga);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin)
    ]);
}