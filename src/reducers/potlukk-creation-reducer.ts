
import {PotlukkDetailsForm, PotlukkStatus} from "../api/types"
import { all, takeEvery } from "@redux-saga/core/effects";

// Creating Actions for PotlukkDetailsForm, PotlukkCreationInput, and Potlukk Status
export type SetPotlukkTitle = {type: "SET_EVENT_NAME", payload: string}; //action for potlukk name
export type SetEventTime = {type: "SET_TIME", payload: number}; //action for time of potlukk event
export type SetEventLocation = {type: "SET_LOCATION", payload: string}; //action for location of potlukk event
export type SetEventTags = {type: "SET_TAGS", payload: string[]}; //action to for tags of potlukk event
export type SetPotlukkPublic = {type: "TOGGLE_PUBLIC"}; //action to check if event is public
export type SetEventDesc = {type: "SET_DESCRIPTION", payload: string}; //action for event description
export type AddEvent =  {type: "ADD_EVENT"}; //action to create event, insert host ID, and change status to SCHEDULED
export type EventTrackerAction = SetPotlukkTitle | SetEventTime | SetEventLocation | SetEventTags | SetPotlukkPublic | SetEventDesc | AddEvent 

//Creating reducer to switch on actions when called upon from user input
export function createPotlukkReducer(state: PotlukkDetailsForm, action: EventTrackerAction): PotlukkDetailsForm {

    const newState: PotlukkDetailsForm = JSON.parse(JSON.stringify(state)); //created clone of PotlukkDetailsForm
    
    switch(action.type){

        case "SET_EVENT_NAME": {
            newState.title = action.payload; 
            return newState;
        }

        case "SET_TIME": {
            let convertTime = new Date(action.payload);
            newState.time = convertTime.getTime();
            return newState;
        }

        case "SET_LOCATION": {
            newState.location = action.payload;
            return newState;
        }

        case "SET_TAGS": {
            newState.tags = action.payload;
            return newState;
        }

        case "SET_DESCRIPTION": {
            newState.description = action.payload;
            return newState;
        }

        case "TOGGLE_PUBLIC": {
            newState.isPublic = !newState.isPublic
            return newState
        }

        default:
            return newState;

    }

    
}

//Sagas for Updating Potlukk
//Sagas Actions

export type UpdatePotlukk = {type: "POTLUKK_UPDATE_REQUEST", payload: PotlukkDetailsForm};
//export type CancelPotlukk = {type: "POTLUKK_CANCEL_REQUEST", payload: number};

//Worker Sagas

//Type pulled in on const potlukks may not be the correct one

/*function* upDatePotlukks(action: UpdatePotlukk){
    const response = yield fetch("http://localhost:8000/graphql");
    const latestPotlukk: Pot
}*/

//Watcher Saga

function* watchUpdate():any {
    yield takeEvery("POTLUKK_UPDATE_REQUEST", upDatePotlukks)
}


//Root Sagas
export function* rootSaga(){
    yield all([
        watchUpdate()
    ])
}
