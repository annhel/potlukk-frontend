

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

export function HostPotlukk(){

    return<>
    <h1>Host a Potlukk: </h1>
    </>
}