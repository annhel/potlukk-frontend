import { useState } from "react"
import { DishFormInput } from "../../api/types"

const initialDish: DishFormInput = {
    name:"",
    description:"",
    serves:0,
    broughtBy:0,
    allergens: []
}

export function CreateDish(){

    const [dishForm, setDishForm] = useState<DishFormInput>(initialDish)

    function handleAllergy(event: React.ChangeEvent<HTMLInputElement>){
        let allergens = {...dishForm.allergens} 
        if(event.target.checked){
            allergens.push(event.target.value);
        }else{
            allergens = allergens.filter(a => a !== event.target.value)
        }
    }

    return<>
    <input type="text" placeholder="Dish name" onChange={e=> setDishForm({...dishForm, name: e.target.value})}/>
    <input type="text" placeholder="Description" onChange={e=> setDishForm({...dishForm, description: e.target.value})}/>
    <input type="number"/>
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
    <button id="bring-dish" className="bdButton">Bring Dish</button>
    </>
}