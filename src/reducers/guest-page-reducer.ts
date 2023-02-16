import { DishFormInput } from "../api/types"


export type GuestPageState = {
    status: string
    dishes: []
}

export type BringDishAction = {type:"BRING_DISH"} // have it render the inputs for a dish?
export type AcceptInviteAction = {type: "ACCEPT_INVITE", payload: string}
export type DeclineInviteAction = {type: "DECLINE_INVITE", payload: string}
export type MaybeInviteAction = {type: "MAYBE_INVITE", payload: string}

//saga action to create dishes
export type CreateDishAction = {type:"CREATE_DISH", payload: DishFormInput}
export type RequestPopulateDishes = {type:"REQUEST_POPULATE_DISHES"}
export type GuestPageActions = BringDishAction | AcceptInviteAction | DeclineInviteAction | MaybeInviteAction | CreateDishAction | RequestPopulateDishes

//Redux initial state here
const initialState: GuestPageState = {status:"", dishes:[]}

export function guestPageReducer(state: GuestPageState =initialState, action: GuestPageActions): GuestPageState{
    const nextState: GuestPageState = JSON.parse(JSON.stringify(state)); 

    switch(action.type){
        case "BRING_DISH":
            return nextState
        case "ACCEPT_INVITE":
            nextState.status = action.payload
            return nextState
        case "DECLINE_INVITE":
            nextState.status = action.payload
            return nextState
        case "MAYBE_INVITE":
            nextState.status = action.payload
            return nextState
        default:
            return nextState
    }

}