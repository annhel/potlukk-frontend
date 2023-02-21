import { LukkerUserInfo } from "./types";


// requests for list of all users 
export async function getLukkers(): Promise<LukkerUserInfo[]>{
    
    const query = 
    `query getAllLukkers {
        lukkers {
          allergies
          fname
          lname
          userId
          username
        }
      }`

    const requestBody = JSON.stringify({query});

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body: requestBody, headers:{"Content-type": "application/json"}}) 
    const responseBody = await httpResponse.json();
    const lukkers:LukkerUserInfo[] = responseBody.data.lukkers;
    return lukkers;
}



//send invite mutation
export async function createInviteMutation(potlukkId: number, lukkerId: number): Promise<LukkerUserInfo[]>{
    console.log(potlukkId, lukkerId)
    const query = 
    `mutation sendInvite($potlukkId: Int!, $lukkerId: Int!){
        sendInvite(input: {potlukkId: $potlukkId, potlukkerId: $lukkerId}){
          invitations{
            potlukker{
              fname
              userId
            }
          }
        }
      }
      `
    const variables = {potlukkId: potlukkId, lukkerId: lukkerId}

    const requestBody = JSON.stringify({query, variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body: requestBody, headers:{"Content-type": "application/json"}}) 
    const responseBody = await httpResponse.json();
    const lukkers:LukkerUserInfo[] = responseBody.data;
    console.log(lukkers)
    return lukkers;
}

//requests for list of invited lukkers
type Potlukker = {
  fname: string
  lname: string
  username: string
}

type PotlukkGuestInfo = {
    invitations: Potlukker[]
    potlukkId: number
    details:{title:string}
}
export async function getPotlukkGuestsByID(potlukkId: number): Promise<PotlukkGuestInfo>{
    
  const query = 
  `query invites($potlukkId: Int!){
    potlukks(potlukkId: $potlukkId) {
      details {
        title
      }
      invitations {
        potlukker {
          fname
          lname
          username
        }
      }
      potlukkId
    }
  }`

  const variables = {potlukkId: potlukkId}

  const requestBody = JSON.stringify({query, variables});
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body: requestBody, headers:{"Content-type": "application/json"}}) 
  const responseBody = await httpResponse.json();
  const lukkers:PotlukkGuestInfo = responseBody.data;
  return lukkers;
}


