
//Key Functionality:
//  successful sign-in routes to homepage
//  unsuccessful sign-in leads to Pop-up window: "Try Again"
//  store user info (username and password) in local storage (will be shown on monday but is easy enough to google)
//  this requires an http request --> to api for sign-in i believe
//  route to registration page

import { FormEvent, useState } from "react"
import { Link, Route, useNavigate } from "react-router-dom"
import { ErrorMsg, loginRequest, VerifyLogin } from "../api/sign-in-register-requests"
import { HomePage } from "./home-page"
import "../css/signin-register.css"

type existingUserForm = {
    username: string
    password: string
    userId: number
}

export function SignInPage(){
    const navigate = useNavigate();

    // useState to get user log-in details
    const [form,setForm] = useState<existingUserForm>({username:"",password:"", userId:0})

    //set the login info in local storage
    localStorage.setItem("username", form.username);

    async function handleSignIn(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const loginForm: loginRequest={
            username: form.username,
            password: form.password
        }
        let response = await VerifyLogin(loginForm);

        localStorage.setItem("userId", response.userId.toString());

        navigate("/home");
    }

    return<>
    <div className="container">
    <div className="image-container"></div>
    <div className="form-container">
    <h1 className="title">Potlukkin'</h1>
    <h2 className="subtitle">'Bring your dish, bring your heart - Potlukkin brings us closer!'</h2>
    <section>
    <h2 className="signin">Sign-In</h2>
    <form onSubmit={(e:FormEvent<HTMLFormElement>) => handleSignIn(e)}>
        <input className="signinInput" type="text" placeholder="Username" onChange={e=> setForm({...form, username:e.target.value})}/>
        <input className="signinInput" type="password" placeholder="Password" onChange={e=> setForm({...form, password:e.target.value})}/>
        <button className="signinButton" type="submit" >Sign-in</button>
    </form>
    </section>
    <hr />
    <section>
        <Link to="/register">
        <button className="signinButton">Register</button>
        </Link>
    </section>
    </div>
    </div>
    </>
}