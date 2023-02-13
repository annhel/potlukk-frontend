import { Invitation, PotlukkDetails } from "../api/types"

// page state
export type HomeState = {
    invites: []
    potlukks: []
    notifs: []
}

// actions for state -- would this include rendering upon sign-in? or is that useEffect in the component file
export type PotlukkDetailsAction = {type:"VIEW_POTLUKK_DETAILS", payload: PotlukkDetails}
export type InviteDetailsAction = {type:"VIEW_INVITE_DETAILS", payload: Invitation}


// Use redux
export function homepageReducer(){

}