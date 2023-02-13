
//Key Functionality:
//  successful sign-in routes to homepage
//  unsuccessful sign-in leads to Pop-up window: "Try Again"
//  store user info (username and password) in local storage (will be shown on monday but is easy enough to google)
//  this requires an http request --> to api for sign-in i believe
//  route to registration page

import { useState } from "react"
import { Link } from "react-router-dom"

type existingUserForm = {
    username: string
    password: string
    userId: number
}


export function SignInPage(){

    // useState to get user log-in details
    const [form,setForm] = useState<existingUserForm>({username:"",password:"", userId:0})

    //set the login info in local storage
    localStorage.setItem("username", form.username);
    localStorage.setItem("password", form.password);
    //if statement to set userId in local storage if found amongst lukkers
    // async function handleSignIn(){
    //     for(let lukker of allLukkers){
    //         // maybe use .find
    //         if(lukker.username === form.username){
    //             form.userId === lukker.userId
    //         }
    //     }
    // }

    return<>
    <h1>Potlukkin'</h1>
    <h2>Sign-In</h2>
    <form onSubmit={handleSignIn}>
        <input type="text" placeholder="Username" onChange={e=> setForm({...form, username:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={e=> setForm({...form, password:e.target.value})}/>
        <button type="submit" onClick={verify}>Sign-in</button>
    </form>
    <p>--------------------------</p> 
    <button>Register <Link to="/register"></Link></button>
    </>
}