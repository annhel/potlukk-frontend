
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
    {/* <h1>Potlukkin'</h1> */}
    <section>
    <h2 className="signIn">Sign-In</h2>
    <form onSubmit={(e:FormEvent<HTMLFormElement>) => handleSignIn(e)}>
        <input type="text" placeholder="Username" onChange={e=> setForm({...form, username:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={e=> setForm({...form, password:e.target.value})}/>
        <button type="submit" >Sign-in</button>
    </form>
    </section>
    <hr />
    <section>
        <Link to="/register">
        <button>Register</button>
        </Link>
    </section>
    </>
}