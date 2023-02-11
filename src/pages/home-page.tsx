import { NavBar } from "../navigation/navbar";

// Key Functionality:
    // Three Main Components (using a table will help organize the info):
        //  1) My Potlukks -> what im hosting
        //  2) Invited to -> potlukks I was invited to, and i'm attending
        //  3) Notifications -> list of events created by them or events that affect a potlukk they host or attend(Date change, cancellation, invites, new dishes added)
    // Use Redux (Thunks too, but i think he means Sagas)
    // a navbar that uses react-router -> to all other pages
    // a Logout button -> clears local storage and redirects to Signin Page
    export type LukkerUserInfo={
        userId: number
        username:string 
        fname: string
        lname: string
        allergens: []
    }

    export type HomeState={
        invites: Invitation[]
    }
    

export function HomePage(){
    return<>
    <h1>HomePage</h1>
    <section>
        <div>
            <table>
                <thead>
                    <tr><th colSpan={2}>Pending Potlukk Invitations</th></tr>
                </thead>
                <tbody>
                    <tr><td>Angel's Potlukk</td><td><button>View Invite</button></td></tr>
                    <tr><td>Sammy's Potlukk</td><td><button>View Invite</button></td></tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr><th colSpan={2}>I'm Going!</th></tr>
                </thead>
                <tbody>
                    <tr><td>Andy's Potlukk</td><td><button>Details</button></td></tr>
                    <tr><td>Trevor's Potlukk</td><td><button>Details</button></td></tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr><th colSpan={2}>Notifications</th></tr>
                </thead>
                <tbody>
                    <tr><td>New dish added</td><td>Trevor's Potlukk</td></tr>
                    <tr><td>Rescheduled</td><td>Andy's Potklukk</td></tr>
                    <tr><td>You're Invited!</td><td>Revature Potlukk</td></tr>
                </tbody>
            </table>
        </div>
    </section>
    </>
}