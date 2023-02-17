import { useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import {  PotlukkGuestInfo } from "../../api/guest-view-requests"
import { PotlukkDetails } from "../../api/types"
import { GuestPageActions, GuestPageState } from "../../reducers/guest-page-reducer"

export type GuestViewProps = {
    dispatch: React.Dispatch<GuestPageActions>
    potlukk: PotlukkGuestInfo
    params: number
}

export function CreateDish(props: GuestViewProps){

    const dishForm = useSelector((state:GuestPageState) => state.dish)

    const queryClient = useQueryClient();

    function addDish(){
        props.dispatch({type:"REQUEST_ADD_DISH", payload:{potlukkId: props.params, dishes: [...props.potlukk.dishes, {
            description:dishForm.description,
            name: dishForm.name,
            allergens: dishForm.allergens,
            serves:dishForm.serves,
            broughtBy: dishForm.broughtBy
        }]}})
        setTimeout(()=>{
            queryClient.invalidateQueries(["potlukkGuestDetailsCache", props.params])
        },1000)
    }


    return<>
    <input type="text" placeholder="Dish name" onChange={e=> props.dispatch({type:"SET_DISH_NAME", payload:{name:e.target.value, potlukkerId:Number(localStorage.getItem("userId"))}})}/>
    <input type="text" placeholder="Description" onChange={e=> props.dispatch({type:"SET_DISH_DESC", payload: e.target.value})}/>
    <input type="number" placeholder="Serving size"  onChange={e=> props.dispatch({type:"SET_DISH_SERVES", payload: Number(e.target.value)})}/>
    <table className="regTable">
            <thead className="regThead">
                <tr><th className="regTh">Allergens</th></tr>
            </thead>
            <tbody className="regTbody">
            <tr><td className="regTd"><input type="checkbox" name="Milk" value="MILK" onChange={e=> props.dispatch({type:"SET_ALLERGENS", payload: {checked: e.target.checked, value: e.target.value}})}/><label htmlFor="Milk">Milk</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Egg" value="EGG" onChange={e=> props.dispatch({type:"SET_ALLERGENS", payload: {checked: e.target.checked, value: e.target.value}})}/><label htmlFor="Egg">Egg</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Fish" value="FISH" onChange={e=> props.dispatch({type:"SET_ALLERGENS", payload: {checked: e.target.checked, value: e.target.value}})}/><label htmlFor="Fish">Fish</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Shellfish" value="SHELLFISH" onChange={e=> props.dispatch({type:"SET_ALLERGENS", payload: {checked: e.target.checked, value: e.target.value}})}/><label htmlFor="Shellfish">Shellfish</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Soy" value="SOY" onChange={e=> props.dispatch({type:"SET_ALLERGENS", payload: {checked: e.target.checked, value: e.target.value}})}/><label htmlFor="Soy">Soy</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Wheat" value="WHEAT"onChange={e=> props.dispatch({type:"SET_ALLERGENS", payload: {checked: e.target.checked, value: e.target.value}})}/><label htmlFor="Wheat">Wheat</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Treenut" value="TREENUT" onChange={e=> props.dispatch({type:"SET_ALLERGENS", payload: {checked: e.target.checked, value: e.target.value}})}/><label htmlFor="Treenut">Treenut</label></td></tr>
            </tbody>
    </table>
    <button id="bring-dish" className="bdButton" onClick={addDish}>Bring Dish</button>
    </>
}