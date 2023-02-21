
import { useReducer } from "react"
import { PotlukkDetailsForm } from "../api/types"
import { createPotlukkReducer } from "../reducers/potlukk-creation-reducer"
import { potlukkCreated } from "../api/potlukk-creation"
import { useNavigate } from "react-router"
import "../css/host-a-potlukk.css"
import { NavBar } from "../navigation/navbar"

//Creating a state variable holding "empty" initial data using PotlukkDetailsForm type
const creationState: PotlukkDetailsForm = {
    title: "",
    location: "",
    description: "",
    isPublic: false,
    time: 0,
    tags: [],
    status: ""
}

//Creating function to grab values from input fields of potlukk creation
export function HostPotlukk(){
    const navigate = useNavigate();
    
    const [creationTracker, dispatch] = useReducer(createPotlukkReducer, creationState);

    async function makePotlukk(){
        const createdPotlukk = await potlukkCreated({hostId:Number(localStorage.getItem("userId")), details:creationTracker});
        let id = Number(createdPotlukk.potlukkId)
        navigate(`/potlukkinfohost/ ${id} /invites`)
    }


    return<>
    <NavBar></NavBar>
    <h1 className="hostPotlukkTitle">Host a Potlukk: </h1>
    <div className="hostPotlukkDiv">
    <div className="hostingForm">
        <input type="datetime-local" id="potlukk-meet" onChange={c=>dispatch({type:"SET_TIME", payload: c.target.value})}/>
        <input type="text" placeholder="Event Title" onChange={c=>dispatch({type:"SET_EVENT_NAME", payload: c.target.value})}/>
        <br />
        <input type="text" placeholder="Location" onChange={c=>dispatch({type: "SET_LOCATION", payload: c.target.value})}/>
        <br />
        <input type="text" placeholder="Description" onChange={c=>dispatch({type: "SET_DESCRIPTION", payload: c.target.value})}/>
        <br />
        <input type="text" placeholder="Create Tag" onChange={c=>dispatch({type: "SET_TAGS", payload: [c.target.value]})}/>
        <br />
        <input type="checkbox" id="status" onChange={c=>dispatch({type: "TOGGLE_PUBLIC"})}/>
        <label htmlFor="public">Make Public</label>
        <br />
    <button onClick={makePotlukk}>Create Event</button> 
    </div>
    </div> 
    
    </>
} 

