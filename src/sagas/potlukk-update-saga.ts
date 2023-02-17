
import { all, takeEvery, put, select} from "@redux-saga/core/effects";
import { PotlukkDetailsSwapForm, PotlukkDetails, PotlukkDetailsForm } from "../api/types";
import { potlukkCreated } from "../api/potlukk-creation";
import { UpdatePotlukkAction } from "../reducers/potlukk-creation-reducer";


//Sagas for Updating Potlukk

//Worker Sagas

//Type pulled in on const potlukks may not be the correct one

function* upDatePotlukks(action: UpdatePotlukkAction):any{
   const updatePotlukk: PotlukkDetailsSwapForm = {
    potlukkId:  ,
    title: action.payload.title,
    location: action.payload.location,
    status: action.payload.status,
    description: action.payload.description,
    isPublic: action.payload.isPublic,
    time: action.payload.time,
    tags: action.payload.tags
   }
}

//Watcher Saga

function* watchUpdate():any {
    yield takeEvery("POTLUKK_UPDATE_REQUEST", upDatePotlukks)
}


//Root Sagas
export function* rootSaga(){
    yield all([watchUpdate()])
}