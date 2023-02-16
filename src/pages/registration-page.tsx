
// Key Functionality:
//  Two Main Components:
//      1) Username Input, Password and Confirm Password Input
//      2) Allergen selection
// [Register] Button

// This is a simple RegisterForm, i think usereducer is overkill? maybe just useState

import { useState } from "react"
import { LukkerUserInfo } from "../api/types"
import { CreateLukker, GetAllLukkers } from "../api/sign-in-register-requests"
import "../css/register.css"
import { Route, useNavigate } from "react-router-dom"

export type RegistrationForm = {
    username: string
    password: string
    fname: string
    lname: string
    allergies: string[]
}

export function RegistrationPage(){

    const navigate = useNavigate();

    const [form, setForm] = useState<RegistrationForm>({username:"", password:"", fname:"", lname:"", allergies:[]})
    const [allergy, setAllergy] = useState<string[]>([]);

    // const variable to compare password entries?
    let confirmPassword = ""
    // if(confirmPassword !== form.password){
    //     return<p style={{color:"red"}}> Passwords must match </p>
    // }

    // if(form.password.length < 10){
    //     return <p>Passwords must be 10 characters or</p>
    // }

    // if(form.password){
    //     return <p>Passwords must be 10 characters or</p>
    // }

    // const atLeastOneNumOrSymb = /[0-9] | [#?!@$%^&*-]/g; // a number or symbol
    // const tenCharsOrMore = /.{10,}/g; // tem characters or more
  
    // const passwordTracker = {
    //   numOrSymb: form.password.match(atLeastOneNumOrSymb),
    //   tenCharsOrGreater: form.password.match(tenCharsOrMore),
    // };

    // const passwordStrength = Object.values(passwordTracker).filter(
    //     (value) => value
    //   ).length;
    

    function handleAllergy(event: React.ChangeEvent<HTMLInputElement>){
        form.allergies = [...allergy];
        form.allergies.push(event.target.value);
    }

    async function registerLukker(){
        const lukker = await CreateLukker({
            fname: form.fname,
            lname: form.lname,
            username: form.username,
            password: form.password,
            allergies: form.allergies
        })
 
        alert(`User created - Happy Potlukkin'`)
        let allLukkers = await GetAllLukkers()
        let currentLukker = allLukkers.find(l=> form.username === l.username);

        if(!currentLukker){
            return alert("No Lukk Finding User :(")
        }

        localStorage.setItem("username", currentLukker.username);
        localStorage.setItem("userId", currentLukker.userId.toString());

        navigate("/home");

    }

    return<>
    <div className="registrationContainer">
        <h1 className="regTitle">Discover the joy of potlucks with Potlukkin'!</h1>
        <h2 className="regSubtitle">Register an Account:</h2>
        <input className="regInput" type="text" placeholder="First name" onChange={e=> setForm({...form, fname: e.target.value})}/>
        <input className="regInput" type="text" placeholder="Last name" onChange={e=> setForm({...form, lname:e.target.value})}/>
        <input className="regInput" type="text" placeholder="Username" onChange={e=> setForm({...form, username: e.target.value})}/>
        <input className="regInput" type="text" placeholder="Password" onChange={e=> setForm({...form, password:e.target.value})}/>
        <input className="regInput" type="text" placeholder="Confirm Password" onChange={e=> confirmPassword = e.target.value}/>
    <table className="regTable">
            <thead className="regThead">
                <tr><th className="regTh">Allergens</th></tr>
            </thead>
            <tbody className="regTbody">
                <tr><td className="regTd"><input type="checkbox" name="Milk" value="MILK" onChange={e => handleAllergy(e)}/><label htmlFor="Milk">Milk</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Egg" value="EGG"/><label htmlFor="Egg">Egg</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Fish" value="FISH"/><label htmlFor="Fish">Fish</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Shellfish" value="SHELLFISH"/><label htmlFor="Shellfish">Shellfish</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Soy" value="SOY"/><label htmlFor="Soy">Soy</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Wheat" value="WHEAT"/><label htmlFor="Wheat">Wheat</label></td></tr>
                <tr><td className="regTd"><input type="checkbox" name="Treenut" value="TREENUT"/><label htmlFor="Treenut">Treenut</label></td></tr>
            </tbody>
    </table>
    <button className="regButton" onClick={registerLukker}>Register</button>
    </div>
    </>
}