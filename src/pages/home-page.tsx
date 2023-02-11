import { NavBar } from "../navigation/navbar";

// Key Functionality:
    // Three Main Components (using a table will help organize the info):
        //  1) My Potlukks -> what im hosting
        //  2) Invited to -> potlukks I was invited to, and i'm attending
        //  3) Notifications -> list of events created by them or events that affect a potlukk they host or attend(Date change, cancellation, invites, new dishes added)
    // Use Redux (Thunks too, but i think he means Sagas)
    // a navbar that uses react-router -> to all other pages
    // a Logout button -> clears local storage and redirects to Signin Page

export function HomePage(){
    return<>
    {/* <NavBar></NavBar> */}
    <h1>HomePage</h1>
    </>
}