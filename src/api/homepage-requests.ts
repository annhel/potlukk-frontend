import { Invitation, Potlukk } from "./types";

// request for all user invites
export async function getAllInvites():Promise<Potlukk[]>{
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-type": "application/json"}}) //when testing local host, you might need the actual ip adress
    const potlukks:Invitation[] = await httpResponse.json();
    return potlukks;
}
// request for users potlukks


// request for users notifications