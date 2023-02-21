import { NavBar } from "../navigation/navbar"
import "../css/guest-view.css"
import { useQuery } from "react-query";
import { getPotlukkByID } from "../api/guest-view-requests";
import { useParams } from "react-router";
import { GuestPageActions } from "../reducers/guest-page-reducer";
import { useDispatch } from "react-redux/es/exports";
import { CreateDish } from "../components/guest-page-comp/create-dish";
import { Dish } from "../api/types";

export function PotlukkDetailsGuestPage(){
    const params = useParams()
    const usePotlukkDetails = ()=> useQuery(["potlukkGuestDetailsCache", params.potlukkId], () => getPotlukkByID(Number(params.potlukkId)));
    const {data: PotlukkDetails} = usePotlukkDetails()

    const dispatch = useDispatch()<GuestPageActions>

    let formattedDate = ""
    if((PotlukkDetails?.details.time) !== undefined){
        const date = new Date(PotlukkDetails.details.time * 1000);
        const monthAbbrev = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
        formattedDate = `${monthAbbrev} ${day}, ${time}`;
    }

    function setStatus(status: string){
        dispatch({type:"REQUEST_SET_STATUS", payload: {
            potlukkerId: Number(localStorage.getItem("userId")),
            potlukkId: Number(params.potlukkId),
            status: status
        }})
    }

    return<>
    <NavBar></NavBar>
    <h1 className="guestTitle">Potlukk Details: Guest</h1>
    <section className="guestDetails">
        <div id="potlukkdetails" className="potlukkdetails">
            <h2>Potlukk Name: {PotlukkDetails?.details.title}</h2>
            <h3>{PotlukkDetails?.details.description}</h3>
            <h2>Location</h2>
            <h3 id="address-display">{PotlukkDetails?.details.location}</h3>
            <h2>Date & Time</h2>
            <h3 id="date-display">{formattedDate}</h3>
            <button id="accepted" className="abutton" onClick={()=> setStatus("ACCEPTED")}>Accept</button>
            <button id="declined" className="dbutton" onClick={()=> setStatus("DECLINED")}>Decline</button>
            <button id="maybe" className="mbutton" onClick={()=> setStatus("MAYBE")}>Maybe</button>
        </div>
        <div className="guestTable">
            <table id="attendees-table" className="guests">
                <thead className="display-thead">
                    <tr><th colSpan={2}>Attendees</th></tr>
                </thead>
                <tbody className="display-tbody">
                { PotlukkDetails?.invitations.map(invite => <tr><td>{invite.potlukker.fname} {invite.potlukker.lname}</td><td>{invite.status}</td></tr>)}
                </tbody>
            </table>
        </div>
    </section>

    <section className="dishSection">
        <div className="dishForm">
            <CreateDish dispatch={dispatch} potlukk={PotlukkDetails!} params={Number(params.potlukkId)}></CreateDish>
        </div>
        <div className="dishView">
        <table id="dishes-table" className="dishList">
                <thead className="display-thead">
                    <tr><th>Dishes</th></tr>
                </thead>
                <tbody className="display-tbody">
                {PotlukkDetails?.dishes.map(d => <> 
                    <tr><td>{d.name}</td></tr>
                    </>)}
                </tbody>
            </table>
        </div>
    </section>
    </>
}