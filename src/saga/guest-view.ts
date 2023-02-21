// Sagas are generator functions
// 1. root saga
// 2. watcher saga
// 3. working saga
// Saga's secret super power is the ability to work with asynchronous code and integrate it into our reducer
// unless you are doing asynchronous coding. Saga is likely overkill

import { takeEvery, put, all, select } from "@redux-saga/core/effects";
import { createDish, retrieveDishes, UpdatedInvite, updateStatus } from "../api/guest-view-requests";
import { Dish, DishesSwapInput, DishFormInput, InvitationUpdateInput } from "../api/types";
import { queryClient } from "../App";
import { AcceptInviteAction, DeclineInviteAction, GuestPageActions, MaybeInviteAction, RequestAddDishAction, RequestPopulateDishes, RequestSetStatus } from "../reducers/guest-page-reducer";


//worker sagas will take in an action process it and typically send another action to the actual reducer
export function* populateDishes(action:RequestPopulateDishes){
    const potlukkID:number = yield select(store => store.PotlukkDetails.potlukkId)
    const allDishes:Dish[] = yield retrieveDishes(potlukkID);// we can yield promises and saga waits for it to be resolved
    yield put({type:"SET_DISHES", todos:allDishes})// send action to the reducer
}

export function* updateDishList(action: RequestAddDishAction){
    const dishList:DishesSwapInput = yield createDish(action.payload); // once saving to the backend is succesfful
    queryClient.invalidateQueries()
    yield put({type:"SET_DISHES", dishes: dishList.dishes})
}

export function* updateInvite(action: RequestSetStatus ){
    const newStatus: UpdatedInvite = yield updateStatus(action.payload)
    queryClient.invalidateQueries()
    yield put({type:"SET_STATUS", status: newStatus.status})
}

//Watcher sagas will intercept an action and pass it to a worker sag
export function* watchDishList(){
    yield takeEvery("REQUEST_ADD_DISH", updateDishList)
}

export function* watchStatus(){
    yield takeEvery("REQUEST_SET_STATUS", updateInvite)
}

//Root saga a generator function that contains all the watcher saga your created
export function* rootSaga(){
    yield all([watchDishList(), watchStatus()]) // an array of watcher sagas
}

// dispatch({type:"CREATE_TODO_FROM_FORM", payload:{title:"something", desc:"fsdf"}}) => watchCreateFromFormData =>
// createTodoFromFormData => dispatch({type:"ADD_TODO", payload:todo})