import { DishesSwapInput, InvitationUpdateInput } from "../api/types"

export type Dish = {
    name: String
    description: String
    broughtBy: number
    serves: number
    allergens: string[]
}

export type GuestPageState = {
    status: string
    dishes: Dish[]
    dish: Dish
    
}

export type AllergenInput = {
    checked: boolean
    value: string
}
export type NameId = {
    name: string
    potlukkerId: number
}

export type SetNameAction = {type: "SET_DISH_NAME", payload: NameId}
export type SetDescAction = {type: "SET_DISH_DESC", payload: string}
export type SetServingAction = {type: "SET_DISH_SERVES", payload: number}
export type SetAllergenAction = {type: "SET_ALLERGENS", payload: AllergenInput}
export type CreateDishAction = {type:"ADD_DISH", payload: DishesSwapInput}
export type SetDishesAction = {type:"SET_DISHES", payload: Dish[]}
export type SetStatus = {type:"SET_STATUS", payload: string}

export type AcceptInviteAction = {type: "ACCEPT_INVITE", payload: string}
export type DeclineInviteAction = {type: "DECLINE_INVITE", payload: string}
export type MaybeInviteAction = {type: "MAYBE_INVITE", payload: string}

//saga action to create dishes
export type RequestAddDishAction = {type:"REQUEST_ADD_DISH", payload: DishesSwapInput}
export type RequestSetStatus = {type:"REQUEST_SET_STATUS", payload: InvitationUpdateInput};
export type RequestPopulateDishes = {type:"REQUEST_POPULATE_DISHES"}

export type GuestPageActions = SetNameAction| SetDescAction| SetServingAction | SetAllergenAction | AcceptInviteAction | DeclineInviteAction | 
                            MaybeInviteAction | CreateDishAction | RequestPopulateDishes | SetDishesAction | RequestAddDishAction | SetStatus | RequestSetStatus

//Redux initial state here
const initialState: GuestPageState = {status:"", dishes:[], dish:{name:"", description:"", serves:0, broughtBy:0, allergens:[]}}

export function guestPageReducer(state: GuestPageState = initialState, action: GuestPageActions): GuestPageState{
    const nextState: GuestPageState = JSON.parse(JSON.stringify(state)); 

    switch(action.type){
        case "SET_DISH_NAME":
            nextState.dish.name = action.payload.name
            nextState.dish.broughtBy = action.payload.potlukkerId
            return nextState;
        case "SET_DISH_SERVES":
            nextState.dish.serves = action.payload
            return nextState;
        case "SET_DISH_DESC":
            nextState.dish.description = action.payload
            return nextState;
        case "SET_ALLERGENS":
            if(action.payload.checked === true){
                nextState.dish.allergens.push(action.payload.value)
            } else{
                nextState.dish.allergens = nextState.dish.allergens.filter(a => a !== action.payload.value)
            }
            return nextState;
        case "ADD_DISH":
            const dishInput:Dish = {name: nextState.dish.name, description: nextState.dish.description, serves: nextState.dish.serves, allergens: nextState.dish.allergens, broughtBy: nextState.dish.broughtBy}
            nextState.dishes.push(dishInput)
            return nextState;
        case "SET_DISHES":
            nextState.dishes = action.payload
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
        case "SET_STATUS":
            nextState.status = action.payload
            return nextState;
        default:
            return nextState
    }

}