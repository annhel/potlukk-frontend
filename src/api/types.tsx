export const Allergen = [ "MILK", "EGG", "FISH", "SHELLFISH", "SOY", "WHEAT", "TREENUT",]
  
export type Dish = {
    name: String 
    description: String
    broughtBy: number //userId
    serves: number
    allergens: []
  }
  
export type DishFormInput = {
    name: String
    description: String
    broughtBy: number
    serves: number
    allergens: []
  }
  
export type DishesSwapInput = {
    potlukkId: number
    dishes: Dish[]
  }
  
export type Invitation = {
    status: string //invite status
    potlukker: LukkerUserInfo
  }
  
export type InvitationSendInput = {
    potlukkId: number
    potlukkerId: number
  }
  
export const InvitationStatus = ["ACCEPTED","MAYBE","DECLINED","PENDING"]

  
export type InvitationUpdateInput = {
    potlukkId: number
    potlukkerId: number
    status: string // invite status
  }
  
export type LukkerUserInfo = {
    userId: number
    username: string
    fname: string
    lname: string
    allergies: []
  }

//   type Mutation {
//     addNotification(input: PotlukkNotificationInput!): PotlukkNotification!
//     createPotlukk(input: PotlukkCreationInput!): Potlukk
//     swapPotlukkDetails(input: PotlukkDetailsSwapInput!): Potlukk
//     swapPotlukkDishes(input: DishesSwapInput!): Potlukk
//     sendInvite(input: InvitationSendInput!): Potlukk
//     updateInvite(input: InvitationUpdateInput!): Potlukk
//   }
  
export const  NotificationKind = ["DISH_ADDED","DISH_REMOVED","POTLUKK_ALTERED","POTLUKK_CANCELED","INVITE_ACCEPTED","INVITE_DECLINE","INVITE_SENT"]
  
export type Potlukk = {
    potlukkId: number
    details: PotlukkDetails
    host: LukkerUserInfo
    invitations: Invitation[]
    dishes: Dish[]
  }
  
export type PotlukkCreationInput = {
    details: PotlukkDetailsForm
    hostId: number
  }
  
export type PotlukkDetails = {
    title: string
    location: string
    status: string //potlukk status
    description: string
    isPublic: boolean
    time: number
    tags: String[]
  }
  
export type PotlukkDetailsForm = {
    title: string
    location: string
    status: string // potlukk status
    description: string
    isPublic: boolean
    time: number
    tags: String[]
  }
  
export type PotlukkDetailsSwapForm = {
    potlukkId: number
    title: string
    location: string
    status: string //potlukk status
    description: string
    isPublic: boolean
    time: number
    tags: string[]
  }
  
export type PotlukkNotification = {
    eventId: number
    timestamp: number
    kind: string // notif type
    description: string
    affectedPotlukkId: number
    createdByUser: number
  }
  
export type PotlukkNotificationInput = {
    kind: string // notif type
    description: string
    affectedPotlukkId: number
    createdByUser: number
  }
  
export const PotlukkStatus = ["SCHEDULED","CANCELLED"]
  
// export type Query {
//     potlukks: [Potlukk!]!
//     notifications: [PotlukkNotification!]!
//     lukkers: [LukkerUserInfo!]!
//   }
  
export type Subscription = {
    notifcationSubscription: PotlukkNotification[]
  }