

// Key Functionality:
//  Two Main Components:
//      1) Potlukk Creation Form:
//          // Takes 3 Inputs: Time, Location, Description, a "Make Public" Selection (clarify with Adam what exactly this does?)
//          // "Create" Button that leads to a "Confirm details" pop-up to ensure details are correct
//      2) Search box for people to invite by username
//          // should display username and full name
//          // An input for name to search, table of people to invite with an Invite button, table of atendees with remove button
//  user React Query for fetching and caching the info (caching the potlukk created in "database" and fetching list of usernames i think)
//  you can still use navbar from the screen before finishing creating your potlukk, something extra: a pop-up that says details will be unsaved, continue? [Yes][No]

import { useReducer } from "react"
import { PotlukkDetailsForm } from "../api/types"
import { createPotlukkReducer } from "../reducers/potlukk-creation-reducer"
import { potlukkCreated } from "../api/potlukk-creation"

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
    
    
    const [creationTracker, dispatch] = useReducer(createPotlukkReducer, creationState);

    async function makePotlukk(){
        const createdPotlukk = await potlukkCreated({hostId:Number(localStorage.getItem("userId")), details:creationTracker});
        console.log(createdPotlukk);

    }


    return<>
    <h1>Host a Potlukk: </h1>
    <div id="time">
        <label htmlFor="time">Time:</label>
        <input type="time" id="currentTime" />
    </div>

    <div id="createEvent">
        <input type="text" placeholder="Event Title" onChange={c=>dispatch({type:"SET_EVENT_NAME", payload: c.target.value})}/>
        <br />
        <input type="number" placeholder="Time" onChange={c=>dispatch({type:"SET_TIME", payload: Number(Date.parse(c.target.value))})}/>
        <br />
        <input type="text" placeholder="Location" onChange={c=>dispatch({type: "SET_LOCATION", payload: c.target.value})}/>
        <br />
        <input type="text" placeholder="Description" onChange={c=>dispatch({type: "SET_DESCRIPTION", payload: c.target.value})}/>
        <br />
        <input type="text" placeholder="Create Tag" onChange={c=>dispatch({type: "SET_TAGS", payload: [c.target.value]})}/>
        <br />
        <input type="checkbox" id="status" onChange={c=>dispatch({type: "TOGGLE_PUBLIC"})}/>
        <label htmlFor="public">Make Public</label>
    </div>
    <br />
    <button onClick={makePotlukk}>Create Event</button>
    </>
} 

