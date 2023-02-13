
// Key Functionality:
//  Two Main Components:
//      1) Username Input, Password and Confirm Password Input
//      2) Allergen selection
// [Register] Button

// This is a simple RegisterForm, i think usereducer is overkill? maybe just useState

import { useState } from "react"
import "../css/register.css"

export type RegistrationForm = {
    username: string
    password: string
    fname: string
    lname: string
    allergies: []
}

export function RegistrationPage(){

    const [form, setForm] = useState<RegistrationForm>({username:"", password:"", fname:"", lname:"", allergies:[]})
    // const variable to compare password entries?
    let confirmPassword = "";
    if(form.password !== confirmPassword){
        alert("Passwords must match to proceeed.")
    }

    return<>
    <h1>Register an Account:</h1>
    <input type="text" placeholder="Firstname" onChange={e=> setForm({...form, fname: e.target.value})}/>
    <input type="text" placeholder="Lastname" onChange={e=> setForm({...form, lname:e.target.value})}/>
    <input type="text" placeholder="Username" onChange={e=> setForm({...form, username: e.target.value})}/>
    <input type="text" placeholder="Password" onChange={e=> setForm({...form, password:e.target.value})}/>
    <input type="text" placeholder="Confirm Password" onChange={e=> confirmPassword = e.target.value}/>

    <table>
        <thead>
            <tr><th>Allergens</th></tr>
        </thead>
        <tbody>
            <tr><td><input type="checkbox" name="Milk" value="MILK"/><label htmlFor="Milk">Milk</label></td></tr>
            <tr><td><input type="checkbox" name="Egg" value="EGG"/><label htmlFor="Egg">Egg</label></td></tr>
            <tr><td><input type="checkbox" name="Fish" value="FISH"/><label htmlFor="Fish">Fish</label></td></tr>
            <tr><td><input type="checkbox" name="Shellfish" value="SHELLFISH"/><label htmlFor="Shellfish">Shellfish</label></td></tr>
            <tr><td><input type="checkbox" name="Soy" value="SOY"/><label htmlFor="Soy">Soy</label></td></tr>
            <tr><td><input type="checkbox" name="Wheat" value="WHEAT"/><label htmlFor="Wheat">Wheat</label></td></tr>
            <tr><td><input type="checkbox" name="Treenut" value="TREENUT"/><label htmlFor="Treenut">Treenut</label></td></tr>
        </tbody>
    </table>

    <button>Register</button>

    </>
}