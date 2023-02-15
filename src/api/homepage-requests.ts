
// request for users potlukks
export type Details = {
    title: string
    description: string
    location: string
    status: string
    time: number
}

export type Host = {
    userId: number
}

export type PotlukkHost = {
    host: Host
    details: Details
    potlukkId: number
}

export async function getHostPotlukks():Promise<PotlukkHost[]>{

    const query =
    `query getHPotlukks {
        potlukks {
          details {
            title
            description
            location
            status
            time
          }
          host {
            userId
          }
          potlukkId
        }
      }`

    const requestBody = JSON.stringify({query})

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body: requestBody, headers:{"Content-type": "application/json"}}) 
    const responseBody = await httpResponse.json();
    const potlukks:PotlukkHost[] = responseBody.data.potlukks;
    // filter for matching host ID potlukks
    const myPotlukks = potlukks.filter(p => p.host.userId === Number(localStorage.getItem("userId")));
    return myPotlukks;
}

// request for the potlukks the users attending
export type GuestDetails = {
    title: string
}

export type GPotlukker = {
    userId: number
}

export type GuestInvites = {
    potlukker: GPotlukker
}

export type PotlukkGuest = {
    details: GuestDetails
    invitations: GuestInvites[]
    potlukkId: number
}

export async function getGuestPotlukks():Promise<PotlukkGuest[]>{

    const query =
    `query invites {
        potlukks {
            details {
            title
        }
            invitations {
            potlukker {
              userId
            }
          }
          potlukkId
        }
      }`

    const requestBody = JSON.stringify({query})

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body: requestBody, headers:{"Content-type": "application/json"}}) 
    const responseBody = await httpResponse.json();
    const potlukks:PotlukkGuest[] = responseBody.data.potlukks;
    const myPotlukks = potlukks.filter(p => p.invitations.some((invitation: GuestInvites)=> invitation.potlukker.userId === Number(localStorage.getItem("userId"))));
    console.log(myPotlukks)
    return myPotlukks;
}

// request for users notifications
export type NotifDetails = {
    affectedPotlukkId: number
    description: string
    kind: string
    eventId: string
    createdByUser: number
}
export async function getNotifs():Promise<NotifDetails[]>{

    const query =
    `query getNotifs {
        notifications {
          affectedPotlukkId
          description
          kind
          eventId
          createdByUser
        }
      }`

    const requestBody = JSON.stringify({query})

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body: requestBody, headers:{"Content-type": "application/json"}})
    const responseBody = await httpResponse.json();
    const notifs:NotifDetails[] = responseBody.data
    //filter for notifs pertaining to your potlukks    
   const userPotlukks = await getHostPotlukks();

   const filteredNotifs = notifs.filter(n => userPotlukks.some((p)=> p.potlukkId === n.affectedPotlukkId ) )

    return filteredNotifs;
}

