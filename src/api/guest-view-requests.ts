import { DishesSwapInput, InvitationUpdateInput } from "./types"

// request for potlukk by ID
export type potlukkDetails ={
    description: string
    isPublic: string
    location: string
    time: number
    title: string
    tags: string[]
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
    potlukker: {fname:string, lname:string}
    status: string
}

export type PotlukkGuestInfo = {
    details: potlukkDetails
    dishes: dishDetails[]
    host: hostInfo
    invitations: inviteInfo[]
}

export async function getPotlukkByID(potlukkId: number): Promise<PotlukkGuestInfo>{

    const query = 
    `query getPotlukkByID($potlukkId:Int) {
        potlukks(potlukkId: $potlukkId) {
          details {
            description
            isPublic
            location
            time
            title
            tags
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
      const potlukkinfo:PotlukkGuestInfo[] = responseBody.data.potlukks;
      return potlukkinfo[0];
    }

//update invite status
export async function updateStatus(input: InvitationUpdateInput){

    const query = 
    `mutation updateInviteStatus($input: InvitationUpdateInput!) {
        updateInvite(input:$input){
          invitations {
            potlukker {
              fname
            }
          }
        }
      }`

      const variables = {input: input}
      // core request code-block
      const body = JSON.stringify({query,variables})

      const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-type": "application/json"}})
    }

//submit dish form 
export async function createDish(input: DishesSwapInput){

    const query = 
    `mutation swapPotlukkDishes($input: DishesSwapInput!){
        swapPotlukkDishes(input:$input){
          dishes{
            name
            allergens
          }
        }
        }`

      const variables = {input: input}
      // core request code-block
      const body = JSON.stringify({query,variables})

      const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-type": "application/json"}})
    }