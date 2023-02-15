
// request for potlukk by ID
export type potlukkDetails ={
    description: string
    isPublic: string
    location: string
    time: number
    title: string
}

export type dishDetails = {
    allergens: string[]
    name: string
}

export type hostInfo = {
    username: string
}

export type potlukkerNames = {
    fname: string
    lname: string
}

export type guests = {
    potlukker: potlukkerNames
}

export type inviteInfo = {
    potlukker: guests[]
    status: string
}

export type PotlukkGuestInfo = {
    details: potlukkDetails
    dishes: dishDetails
    host: hostInfo
    invitations: inviteInfo[]
}

export async function getPotlukkByID(potlukkId: number): Promise<PotlukkGuestInfo[]>{

    const query = 
    `query getPotlukkByID($potlukkId:Int) {
        potlukks(potlukkId: $potlukkId) {
          details {
            description
            isPublic
            location
            time
            title
          }
          dishes {
            allergens
            name
          }
          host {
            username
          }
          invitations {
            potlukker {
              fname
              lname
            }
            status
          }
        }
      }`

      const variables = {potlukkId: potlukkId}
      // core request code-block
      const body = JSON.stringify({query,variables})

      const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-type": "application/json"}})
      const responseBody = await httpResponse.json();
      const potlukkinfo:PotlukkGuestInfo[] = responseBody.data;
      return potlukkinfo;
    }