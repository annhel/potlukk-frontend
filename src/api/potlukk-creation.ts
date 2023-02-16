import { PotlukkCreationInput, PotlukkStatus } from "./types";

type Detalles ={
  title: string
}

type PotlukkReturn = {
  potlukkId: number
  details: Detalles
}

//Creating an async function to pass through user inputs of potlukk creation through PotlukkCreationInput type
//PotlukkCreationIpnut holds hostId("userId")
//If mutation is successful, PotlukkDetails should be returned as the Promise
export async function potlukkCreated(potlukkScheduled: PotlukkCreationInput): Promise<PotlukkReturn>{

    const query = `mutation PotlukkForm($hostId: Int!, $title: String!, $location: String!, 
      $desc: String!, $isPub: Boolean!, $tags: [String!]!, $time: Int!) {
      createPotlukk(
        input: {details: {title: $title, location: $location, 
          description: $desc, isPublic: $isPub, status: SCHEDULED, tags: $tags, time: $time}, 
          hostId: $hostId}) {
        details {
          title
        }
        potlukkId
      }
    }`

    const variables ={title: potlukkScheduled.details.title, location: potlukkScheduled.details.location,
        status: PotlukkStatus[0], desc: potlukkScheduled.details.description, isPub: potlukkScheduled.details.isPublic,
        time: potlukkScheduled.details.time/1000, tags: potlukkScheduled.details.tags, hostId: potlukkScheduled.hostId}

    const requestBody: string = JSON.stringify({query: query, variables: variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method: "POST", body: requestBody, 
        headers: {"Content-Type": "application/json"}});
    const responseBody = await httpResponse.json();
    const createPotlukk: PotlukkReturn = responseBody.data;
    return createPotlukk;
    console.log(createPotlukk);
}