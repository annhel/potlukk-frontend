
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPotlukkByID } from "../api/guest-view-requests";
import "../css/host-view.css"
import { PotlukkDetailsSwapForm } from "../api/types";
import { NavBar } from "../navigation/navbar";

export function PotlukkDetailsHostPage(){

    const params = useParams()
    const usePotlukkDetails = ()=> useQuery(["potlukkHostDetailsCache", params.potlukkId], () => getPotlukkByID(Number(params.potlukkId)));
    const {data: PotlukkDetails} = usePotlukkDetails()
   
    const [form, setForm] = useState<PotlukkDetailsSwapForm>({title:"",   potlukkId: 0, location: "", status: "", description: "", isPublic: false, time: 0, tags: []})

    let dateString = ""
    if((PotlukkDetails?.details.time) !== undefined){ 
        const date = new Date(PotlukkDetails.details.time * 1000);
        dateString = date.toISOString().replace('T', ' ').slice(0, 19);
    }

    let formattedDate = ""
    if((PotlukkDetails?.details.time) !== undefined){
        const date = new Date(PotlukkDetails.details.time * 1000);
        const monthAbbrev = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
        formattedDate = `${monthAbbrev} ${day}, ${time}`;
    }
    
    
    return<>
    <NavBar></NavBar>
    <h1 className="hostViewTitle">Potlukk Details: Host</h1>
    <div className="hostViewDiv">
        <div className="infoSection">
            <div className="left-half">
    <h2><b>{PotlukkDetails?.details.title}</b></h2>
    <h3>Set for: {formattedDate}</h3>
        <label htmlFor="potlukk-update-time"></label>
        <input type="datetime-local" id="update-meet" placeholder="Date & Time" value={dateString}/>
        <br />
        <input type="text" placeholder="Location" value={PotlukkDetails?.details.location}/>
        <br />
        <input type="text" placeholder="Description" value={PotlukkDetails?.details.description}/>
        <br />
        <input type="text" placeholder="Tags" value={PotlukkDetails?.details.tags}/>
        <br />
        <input type="checkbox" id="update-mo"  />
        <label htmlFor="canceled">Check Box To Cancel Potlukk</label>
        <br />
        <input type="checkbox" id="update-status"/>
        <label htmlFor="public">Make Public</label>
        <button>Update Potlukk Event</button>
    </div>
    <div className="right-half">
            <table id="attendees-table" className="">
        <thead className="display-thead">
            <tr><th colSpan={2}>Attendees</th></tr>
        </thead>
            <tbody className="display-tbody">
                { PotlukkDetails?.invitations.map(invite => <tr><td>{invite.potlukker.fname} {invite.potlukker.lname}</td><td>{invite.status}</td></tr>)}
            </tbody>
    </table>
    </div>
    </div>
    </div>
    </>
} 

