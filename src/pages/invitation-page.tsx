import { useState } from "react"
import "../css/invitation.css"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router"
import { createInviteMutation, getLukkers, getPotlukkGuestsByID } from "../api/invitation-requests"


export function InviteGuests(){
    const { data: lukkersData = []} = useQuery("userListCache", getLukkers)
    const params = Number(useParams())
    const { data: potlukkGuests } = useQuery("invitedGuestCache", ()=>getPotlukkGuestsByID(params))

    const [searchedUser, setSearchedUser] = useState<string>("");

    async function handleInvite(userId: number){
        await createInviteMutation(params, userId)
    }

    const navigate = useNavigate();
    function handleHome(){
        navigate("/home")
    }

    return<>
    <div className="inviteDiv">
    <h1>It's Potlukkin' time at _____{potlukkGuests?.details.title}</h1>
    <h2>Invite some friends:</h2>
    <input type="text" placeholder="Search Lukker..." onChange={e => setSearchedUser(e.target.value)}></input>

    <table>
        <thead>
            <tr><th>@handle</th><th colSpan={2}>Lukkers</th></tr>
        </thead>
        <tbody>
            {lukkersData.filter(ld => ld.username.includes(searchedUser)).map(l=> 
            <tr key={l.userId}><td>{l.username}</td><td>{l.fname} {l.lname}</td><td> <button onClick={()=> handleInvite(l.userId)}>Invite</button> </td></tr>
            )}
        </tbody>
    </table>

    <table>
        <thead>
            <tr><th colSpan={3}>Invited Lukkers</th></tr>
        </thead>
        <tbody>
            {potlukkGuests?.invitations.map(g => 
            <tr><td>{g.username}</td><td>{g.fname} {g.lname}</td></tr>
            )}
        </tbody>
    </table>

    <button onClick={handleHome}>Continue</button>
    <button onClick={handleHome}>Skip for now</button>
    </div>
    </>
}