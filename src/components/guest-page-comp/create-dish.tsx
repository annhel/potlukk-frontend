import { Action } from "@remix-run/router"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import {  PotlukkGuestInfo } from "../../api/guest-view-requests"
import { Dish, PotlukkDetails } from "../../api/types"
import { GuestPageActions, GuestPageState } from "../../reducers/guest-page-reducer"

export type GuestViewProps = {
    dispatch: React.Dispatch<GuestPageActions>
    potlukk: PotlukkGuestInfo
    params: number
}

export function CreateDish(props: GuestViewProps){

    // const dishForm = useSelector((state:GuestPageState) => state.dish)

    const [form, setForm] = useState<Dish>( { name: "", description: "", broughtBy: 0, serves: 0, allergens: []})

    const queryClient = useQueryClient();

    function handleAllergy(event: React.ChangeEvent<HTMLInputElement>){
        let allergens = [...form.allergens] 
        if(event.target.checked === true){
            allergens.push(event.target.value);
        }else{
            allergens = allergens.filter(a => a !== event.target.value)
        }
        form.allergens = allergens
    }

    function addDish(){
        props.dispatch({type:"REQUEST_ADD_DISH", payload:{potlukkId: props.params, dishes: [...props.potlukk.dishes, {
            name: form.name,
            description:form.description,
            allergens: [],
            serves:form.serves,
            broughtBy: Number(localStorage.getItem("userId"))
        }]}})
        setTimeout(()=>{
            queryClient.invalidateQueries(["potlukkGuestDetailsCache", props.params])
        },1000)
    }

    return<>
        <input type="text" placeholder="Dish name" onChange={e=> setForm({...form, name: e.target.value})}/>
    <input type="text" placeholder="Description" onChange={e=> setForm({...form, description: e.target.value})}/>
    <input type="number" placeholder="Serving size"  onChange={e=> setForm({...form, serves: Number(e.target.value)})}/>
    <table className="regTable">
            <thead className="regThead">
                <tr><th className="regTh">Allergens</th></tr>
            </thead>
            <tbody className="regTbody">
            <tr><td className="regTd"><input type="checkbox" name="Milk" value="MILK" onChange={e => handleAllergy(e)}/><label htmlFor="Milk">Milk</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Egg" value="EGG" onChange={e => handleAllergy(e)}/><label htmlFor="Egg">Egg</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Fish" value="FISH" onChange={e => handleAllergy(e)}/><label htmlFor="Fish">Fish</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Shellfish" value="SHELLFISH" onChange={e => handleAllergy(e)}/><label htmlFor="Shellfish">Shellfish</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Soy" value="SOY" onChange={e => handleAllergy(e)}/><label htmlFor="Soy">Soy</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Wheat" value="WHEAT" onChange={e => handleAllergy(e)}/><label htmlFor="Wheat">Wheat</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Treenut" value="TREENUT" onChange={e => handleAllergy(e)}/><label htmlFor="Treenut">Treenut</label></td></tr>
            </tbody>
    </table>
    <button id="bring-dish" className="bdButton" onClick={addDish}>Bring Dish</button>
    </>
}