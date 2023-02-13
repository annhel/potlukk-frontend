

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


import { PotlukkDetailsForm, PotlukkCreationInput, PotlukkStatus} from "../api/types"

// Creating Actions for PotlukkDetailsForm, PotlukkCreationInput, and Potlukk Status
export type SetPotlukkTitle = {type: "SET_EVENT_NAME", payload: string}; //action for potlukk name
export type SetEventTime = {type: "SET_TIME", payload: number}; //action for time of potlukk event
export type SetEventLocation = {type: "SET_LOCATION", payload: string}; //action for location of potlukk event
export type SetEventTags = {type: "SET_TAGS", payload: string[]}; //action to for tags of potlukk event
export type SetPotlukkPublic = {type: "SET_PUBLIC", payload: false}; //action to check if event is public
export type SetEventDesc = {type: "SET_DESCRIPTION", payload: string}; //action for event description
export type AddEvent =  {type: "ADD_EVENT"}; //action to create event, insert host ID, and change status to SCHEDULED
export type EventTrackerAction = SetPotlukkTitle | SetEventTime | SetEventLocation | SetEventTags | SetPotlukkPublic | SetEventDesc | AddEvent;


export function createPotlukkReducer(state: PotlukkDetailsForm, action: EventTrackerAction): PotlukkDetailsForm {

    const newState: PotlukkDetailsForm = JSON.parse(JSON.stringify(state)); //created clone of PotlukkDetailsForm
    
    switch(action.type){

        case "SET_EVENT_NAME": {
            newState.title = action.payload; 
            return newState;
        }

        case "SET_TIME": {
            newState.time = action.payload;
            return newState;
        }

        case "SET_LOCATION": {
            newState.location = action.payload;
            return newState;
        }

        case "SET_TAGS": {
            newState.tags = action.payload;
            return newState;
        }

        case "SET_DESCRIPTION": {
            newState.description = action.payload;
            return newState;
        }

        case "SET_PUBLIC": {
            const clickHandler = () => {newState.isPublic = true};

            if(newState.isPublic = false) {
                return newState;
            } 
            clickHandler();
            return newState
        }
    }

    
}
/*export function HostPotlukk(){

    const [form, setForm] = useState<PotlukkDetailsForm>({title: "", location: "", status: "", description: "", isPublic: false, time: 0, tags: []});

    async function submitPotlukk() {
        const potlukk = await CreatePotlukk({
            title: form.title, 
            location: form.location,
            status: form.status,
            description: form.description,
            isPublic: form.isPublic,
            time: form.time, 
            tags: form.tags
        });

        const potlukks = 
    }

    return<>
    <h1>Host a Potlukk: </h1>
    <div id="time">
        <label htmlFor="time">Time:</label>
        <input type="time" id="currentTime" />
    </div>

    <div id="createEvent">
        <input type="text" placeholder="Event Title"/>
        <br />
        <input type="text" placeholder="Time"/>
        <br />
        <input type="text" placeholder="Date"/>
        <br />
        <input type="text" placeholder="Location"/>
        <br />
        <input type="text" placeholder="Description"/>
        <br />
        <input type="text" placeholder="Create Tag"/>
        <br />
        <input type="checkbox" id="status"/>
        <label htmlFor="public">Make Public</label>
    </div>
    <br />
    <button>Create Event</button>
    </>
} */

