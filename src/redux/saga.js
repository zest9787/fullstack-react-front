import {all,fork} from "redux-saga/effects";
import userSaga from "./user/userSaga";

function* rootSaga() {
    yield all([
        fork(userSaga)
    ])
}

export default rootSaga;