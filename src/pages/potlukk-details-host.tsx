

// Key Functionality:
//  Three/Four Main Components:
//      1) Time,Location.Description viewer with the buttons to Edit, Update(same thing?), and Cancel(this could mean cancel the potlukk or be sent back to home)
//      2) Dishes View -> a table displaying the dish-name and an edit-button
//          -dishes that contain allergens should be in red text --> something extra could be finding allergen logos to display next to the dish
//          -Edit button should route you to either to an edit dish page or a pop-up window
//              -Name and Description Input, Serving size input, Allergen selection, Save button, and delete button
//      3) Potlukk Attendees View -> a table showing fullname and whether they have said: Accepted, Declined, or Maybe to the invite (also pending if the user hasn't replied)
//  Additional Buttons: 
//      [Bring Dish]-> creates a new dish (same as edit button but no delete button, we could do a [Cancel} instead which directs back to potlukk details) Should be marked as being brought by host
//      [Request Dish] -> creates a dish that can be broughtBy someone -- check out api, this is a property that can be used   
//      [Invite] -> can send more invites, can reuse the invite table from other component for this

import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPotlukkByID } from "../api/guest-view-requests";
import { potlukkCreated } from "../api/potlukk-creation";
import { PotlukkDetailsSwapForm } from "../api/types";
import { NavBar } from "../navigation/navbar";

// State Management: use Redux for this, Saga used for middle ware updates
//                          use it to update the dishes, and attendee info as the state changes

export function PotlukkDetailsHostPage(){

    const params = useParams()
    const usePotlukkDetails = ()=> useQuery(["potlukkHostDetailsCache", params.potlukkId], () => getPotlukkByID(Number(params.potlukkId)));
    const {data: PotlukkDetails} = usePotlukkDetails()
   
    const [form, setForm] = useState<PotlukkDetailsSwapForm>({title})
    
    return<>
    <NavBar></NavBar>
    <h1>Potlukk Details: Host</h1>

    <h4>Update Potlukk</h4>
    <div id="update-potlukk">
        <label htmlFor="potlukk-update-time">Date & Time</label>
        <input type="datetime-local" id="update-meet" placeholder="Date & Time"/>
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
    </div>
    <button>Update Potlukk Event</button>
    </>
} 

