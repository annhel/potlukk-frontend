
import {PotlukkDetailsForm, PotlukkStatus} from "../api/types"

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
            newState.time = action.payload;
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