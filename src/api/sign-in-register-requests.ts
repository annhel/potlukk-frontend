import { RegistrationForm } from "../pages/registration-page";
import { LukkerUserInfo } from "./types";

// request for creating Lukker
export async function CreateLukker(LukkerForm: RegistrationForm):Promise<LukkerUserInfo>{
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers", 
    {method:"POST", 
    body: JSON.stringify(LukkerForm),
    headers:{
        "Content-Type":"application/json"
    }
    });

    const lukker:LukkerUserInfo = await httpResponse.json();
    return lukker;
}

// request to verify login credentials
export type loginRequest = {
    username: string
    password: string
}

export type ErrorMsg = {
    detail: string
}

export async function VerifyLogin(loginForm: loginRequest): Promise<LukkerUserInfo>{
    const httpResponse = await fetch("http://127.0.0.1:8000/verify", 
    {method:"POST", 
    body: JSON.stringify(loginForm),
    headers:{
        "Content-Type":"application/json"
    }
    });

    const lukker = await httpResponse.json();
    return lukker;
}

//retrieves all lukkers
export async function GetAllLukkers():Promise<LukkerUserInfo[]>{
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers");
    const lukkers:LukkerUserInfo[] = await httpResponse.json();
    return lukkers;
}