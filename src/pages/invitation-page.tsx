import { useQuery } from "react-query"
import { useParams } from "react-router"
import { createInviteMutation, getLukkers } from "../api/invitation-requests"


export function InviteGuests(){
    const { data: lukkersData = []} = useQuery("hostCache", getLukkers)
    // const { data: filteredLukkersData = []} = useQuery("hostCache", getLukkersByUsername)
    const params = Number(useParams())

    async function handleInvite(userId: number){
        await createInviteMutation(params, userId)
    }
    //useState here?
    function handleFilter(){

    }


    return<>
    <h1>Potlukk Title Here</h1>
    <h2>Invite some friends!</h2>
    <input type="text" placeholder="Search Lukker..." onChange={handleFilter}></input>

    <table>
        <thead>
            <tr><th colSpan={3}>Lukkers</th></tr>
        </thead>
        <tbody>
            {lukkersData.map(l=> 
            <tr><td>{l.username}</td><td>{l.fname} {l.lname}</td><td> <button onClick={()=> handleInvite(l.userId)}>Invite</button> </td></tr>
            )};
        </tbody>
    </table>

    <table>
        <thead>
            <tr><th colSpan={3}>Invited Lukkers</th></tr>
        </thead>
        <tbody>
            <tr><td>username</td><td>Fname + Lname</td><td> <button>Remove</button> </td></tr>
        </tbody>
    </table>

    <button>Send Invitations</button>
    <button>Skip for now</button>
    </>
}