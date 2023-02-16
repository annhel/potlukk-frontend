import { NavBar } from "../navigation/navbar"
import "../css/guest-view.css"
import { useQuery, useQueryClient } from "react-query";
import { getPotlukkByID, PotlukkGuestInfo } from "../api/guest-view-requests";
import { useParams } from "react-router";
import { useState } from "react";
import { GuestPageActions } from "../reducers/guest-page-reducer";
import { useDispatch } from "react-redux/es/exports";
import { CreateDish } from "../components/guest-page-comp/create-dish";

export function PotlukkDetailsGuestPage(){
    const queryClient = useQueryClient();
    const params = useParams()
    const { data:PotlukkDetails} = useQuery(["potlukkGuestDetailsCache", params.potlukkId], () => getPotlukkByID(Number(params.potlukkId)));

    const dispatch = useDispatch()<GuestPageActions>

    return<>
    <NavBar></NavBar>
    <h1>Potlukk Details: Guest</h1>
    <section className="guestDetails">
        <span id="potlukkdetails" className="potlukkdetails">
                    <h2>Potlukk Name: {PotlukkDetails?.details.title}</h2>
                    <h3>{PotlukkDetails?.details.description}</h3>
                    <h2>Location</h2>
                    <h3 id="address-display">{PotlukkDetails?.details.location}</h3>
                    <h2>Time</h2>
                    <h3 id="date-display">{PotlukkDetails?.details.time}</h3>
                    <h3 id="time-display">3PM Est</h3>
        </span>
        <span className="display-span">
            <table id="dishes-table" className="display-table">
                <thead className="display-thead">
                    <tr><th>Dishes</th></tr>
                </thead>
                <tbody className="display-tbody">
                {PotlukkDetails?.dishes.map(d => <> 
                    <tr><td>{d.name}</td></tr>
                    </>)}
                </tbody>
            </table>
            <div className="divider"/>
            <button id="bring-dish" className="bdButton">Bring Dish</button>
        </span>
        <span className="display-span">
            <table id="attendees-table" className="display-table">
                <thead className="display-thead">
                    <tr><th>Attendees</th></tr>
                </thead>
                <tbody className="display-tbody">
                { PotlukkDetails?.invitations.map(invite => <tr><td>{invite.potlukker.fname}</td></tr>)}
                </tbody>
            </table>
        </span>
    </section>

    <div id="decision" className="adm-buttons">
        <button id="accepted" className="abutton" onClick={e => dispatch({type:"ACCEPT_INVITE",payload: "ACCEPTED"})}>Accept</button>
        <div className="divider"/>
        <button id="declined" className="dbutton" onClick={e => dispatch({type:"DECLINE_INVITE",payload: "DECLINED"})}>Decline</button>
        <div className="divider"/>
        <button id="maybe" className="mbutton" onClick={e => dispatch({type:"MAYBE_INVITE",payload: "MAYBE"})}>Maybe</button>
    </div>
    <CreateDish></CreateDish>
    </>
}