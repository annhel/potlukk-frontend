import { PotlukkCreationInput, PotlukkDetails, PotlukkStatus } from "./types";


//Creating an async function to pass through user inputs of potlukk creation through PotlukkCreationInput type
//PotlukkCreationIpnut holds hostId("userId")
//If mutation is successful, PotlukkDetails should be returned as the Promise
export async function potlukkCreated(potlukkScheduled: PotlukkCreationInput): Promise<PotlukkDetails>{

    const query = `mutation AddPotlukk($titleToMerge: String!, $locationToMerge: String!, 
        $statusToMerge: PotlukkStatus!, $descriptionToMerge: String!, $isPublicToMerge: Boolean!,
        $timeToMerge: Int!, $tagsToMerge: [String!]!, ){
          createPotlukk(input: {
            details: {
              title:$titleToMerge
              location:$locationToMerge
              status:$statusToMerge
              description:$descriptionToMerge
              isPublic:$isPublicToMerge
              time:$timeToMerge
              tags:$tagsToMerge
            }
            hostId: ${potlukkScheduled.hostId}
          }){
            ...on Potlukk{
              details{
                  title
                  location
                    status
                  description
                  isPublic
                  time
                  tags
                }
            }
          
          }
        }`
        const variables ={titleToMerge: potlukkScheduled.details.title, locationToMerge: potlukkScheduled.details.location,
        statusToMerge: PotlukkStatus[0], descriptionToMerge: potlukkScheduled.details.description, isPublicToMerge: potlukkScheduled.details.isPublic,
        timeToMerge: potlukkScheduled.details.time, tagsToMerge: potlukkScheduled.details.tags}

        const requestBody: string = JSON.stringify({query: query, variables: variables});
        const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method: "POST", body: requestBody, 
        headers: {"Content-Type": "application/json"}});
        const responseBody = await httpResponse.json();
        const createPotlukk: PotlukkDetails = responseBody.data;
        return createPotlukk;
}