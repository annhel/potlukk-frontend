import { NavBar } from "../navigation/navbar"
import "../css/guest-view.css"
import { useQuery } from "react-query";
import { getPotlukkByID } from "../api/guest-view-requests";
import { useParams } from "react-router";
import { GuestPageActions } from "../reducers/guest-page-reducer";
import { useDispatch } from "react-redux/es/exports";
import { CreateDish } from "../components/guest-page-comp/create-dish";

export function PotlukkDetailsGuestPage(){
    const params = useParams()
    const usePotlukkDetails = ()=> useQuery(["potlukkGuestDetailsCache", params.potlukkId], () => getPotlukkByID(Number(params.potlukkId)));
    const {data: PotlukkDetails} = usePotlukkDetails()

    const dispatch = useDispatch()<GuestPageActions>

    let dateTime = 0
    let humanDate = ""
    if(!(PotlukkDetails === undefined)){
        dateTime = new Date(Number(PotlukkDetails.details.time)).getTime() * 10000;
        humanDate = dateTime.toLocaleString("en-US")
    } else{
        dateTime = 0
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
            <h3 id="date-display">{humanDate}</h3>
            <button id="accepted" className="abutton" onClick={e => dispatch({type:"ACCEPT_INVITE",payload: "ACCEPTED"})}>Accept</button>
            <button id="declined" className="dbutton" onClick={e => dispatch({type:"DECLINE_INVITE",payload: "DECLINED"})}>Decline</button>
            <button id="maybe" className="mbutton" onClick={e => dispatch({type:"MAYBE_INVITE",payload: "MAYBE"})}>Maybe</button>
        </div>
        <div className="guestTable">
            <table id="attendees-table" className="guests">
                <thead className="display-thead">
                    <tr><th>Attendees</th></tr>
                </thead>
                <tbody className="display-tbody">
                { PotlukkDetails?.invitations.map(invite => <tr><td>{invite.potlukker.fname}</td></tr>)}
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