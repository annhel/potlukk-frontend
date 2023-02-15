import { Invitation, PotlukkDetails, PotlukkDetailsSwapForm } from "../api/types"

// // page state
// export type HomeState = {
//     hostPotlukks: PotlukkDetails[]
//     guestPotlukks: PotlukkDetails[]
//     notifs: Notification[]
//     selectedHostPotlukk: PotlukkDetails
//     selectedGuestPotlukk: PotlukkDetails
// }

// // actions for state -- would this include rendering upon sign-in? or is that useEffect in the component file
// export type HostViewDetailsAction = {type: "HOST_VIEW_POTLUKK", potlukkId: number}
// export type GuestViewDetailsAction = {type: "GUEST_VIEW_POTLUKK", potlukkTitle: string}

// export type HostPotlukkDetailsAction = {type:"HOST_POTLUKK_DETAILS"}
// export type GuestPotlukkkDetailsAction = {type:"GUEST_POTLUKK_DETAILS"}
// export type NotificationsAction = {type:"MY_NOTIFS"}

// export type HomeActions = HostViewDetailsAction | GuestViewDetailsAction | HostPotlukkDetailsAction | GuestPotlukkkDetailsAction | NotificationsAction

// const initialState: HomeState = {hostPotlukks:[], guestPotlukks:[], notifs:[]}

// // Use redux
// export function homeReducer(state: HomeState = initialState, action:HomeActions): HomeState{
//     const nextState: HomeState = JSON.parse(JSON.stringify(state));

//     switch(action.type){
//         case "HOST_VIEW_POTLUKK":
//             const hPotlukk = nextState.hostPotlukks.find(p => p.potlukkId === action.potlukkId)
//             if(!hPotlukk){
//                 return nextState;
//             }
//             nextState.selectedHostPotlukk = hPotlukk;
//             return nextState;
//         case "GUEST_VIEW_POTLUKK":
//             const gPotlukk = nextState.guestPotlukks.find(p => p.title === action.potlukkTitle)
//             if(!gPotlukk){
//                 return nextState;
//             }
//             nextState.selectedGuestPotlukk = gPotlukk;
//             return nextState;
//         default:
//             return nextState;
//     }
// }