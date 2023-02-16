import { NumberLiteralType } from "typescript"
import { NavBar } from "../navigation/navbar"
import "../css/guest-view.css"
import { useQuery, useQueryClient } from "react-query";
import { getPotlukkByID, PotlukkGuestInfo } from "../api/guest-view-requests";
import { useParams } from "react-router";
// import { LukkerUserInfo, HomeState } from "./home-page"
// Key Functionality:
//  Three-ish Main Components:
//      1) Potlukk Name, Location, and Time
//          1.5) Selction for Accepted, Declined, Maybe
//      2) Potlukk Dishes table -> if my allergen is present its in red -> [Bring Dish] to add to the list
//      3) Attendees Table with Full Name

//export type PotlukkEvent {
    
//}


export function PotlukkDetailsGuestPage(){
    const queryClient = useQueryClient();
    const params = useParams()
    const { data:PotlukkDetails} = useQuery(["potlukkGuestDetailsCache", params.potlukkId], () => getPotlukkByID(Number(params.potlukkId)));

    function submitDish(){
        // queryClient.invalidateQueries("potlukkGuestDetailsCache")
    //     return <>
    //     <input type="text" placeholder="Dish name"></input>
    //     </>
      }
    function mutateInviteStatus(){
        queryClient.invalidateQueries("potlukkGuestDetailsCache")

    }

    return<>
    <NavBar></NavBar>
    <h1>Potlukk Details: Guest</h1>
    <section className="guestDetails">
    {PotlukkDetails.map(p => <>
        <span id="potlukkdetails" className="potlukkdetails">
                    <h2>Potlukk Name: {p.details.title}</h2>
                    <h3>{p.details.description}</h3>
                    <h2>Location</h2>
                    <h3 id="address-display">{p.details.location}</h3>
                    <h2>Time</h2>
                    <h3 id="date-display">{p.details.time}</h3>
                    <h3 id="time-display">3PM Est</h3>
        </span>
    </>)}
        <span className="display-span">
            <table id="dishes-table" className="display-table">
                <thead className="display-thead">
                    <tr><th>Dishes</th></tr>
                </thead>
                <tbody className="display-tbody">
                {PotlukkDetails.map(p => <> 
                    <tr><td>{p.dishes.name}</td></tr>
                    </>)}
                </tbody>
            </table>
            <div className="divider"/>
            <button id="bring-dish" className="bdButton" onClick={submitDish}>Bring Dish</button>
        </span>
        <span className="display-span">
            <table id="attendees-table" className="display-table">
                <thead className="display-thead">
                    <tr><th>Attendees</th></tr>
                </thead>
                <tbody className="display-tbody">
                { noInvites(PotlukkDetails.invitations) ? PotlukkDetails[0].invitations.map(invite => <tr><td>{invite.potlukker.fname}</td></tr>)};
                </tbody>
            </table>
        </span>
    </section>

    <div id="decision" className="adm-buttons">
        <button id="accepted" className="abutton">Accept</button>
        <div className="divider"/>
        <button id="declined" className="dbutton">Decline</button>
        <div className="divider"/>
        <button id="maybe" className="mbutton">Maybe</button>
    </div>
    </>
}
function isUndefined(x: PotlukkGuestInfo | undefined){
    if(x === undefined){
        return true;
    }else{
    return false;
    }
}
function noInvites(x:[]){
    if(x.length === 0){
        return true;
    }else{
    return false;
    }
}