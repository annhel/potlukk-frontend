import { NumberLiteralType } from "typescript"
import { NavBar } from "../navigation/navbar"
// import { LukkerUserInfo, HomeState } from "./home-page"
// Key Functionality:
//  Three-ish Main Components:
//      1) Potlukk Name, Location, and Time
//          1.5) Selction for Accepted, Declined, Maybe
//      2) Potlukk Dishes table -> if my allergen is present its in red -> [Bring Dish] to add to the list
//      3) Attendees Table with Full Name

//export type PotlukkEvent {
    
//}


export function PotlukkDetailsGuest(){

    return<>
    <NavBar></NavBar>
    <h1>Potlukk Details: Guest</h1>

    <div id="potlukk-name">
        <h2>Potlukk Name: Revature Bash</h2>
        <h6>Awesome part to celebrate unity</h6>
    </div>

    <div id="potlukk-location">
        <h2>Location</h2>
        <h6 id="address-display">Address</h6>
    </div>

    <div id="potlukk-time">
        <h2>Time</h2>
        <h6 id="time-display">Time Display</h6>
        <h6 id="date-display">Date Display</h6>
    </div>

    <div id="decision" className="adm-buttons">
        <button id="accepted">Accepted</button>
        <button id="declined">Declined</button>
        <button id="maybe">Maybe</button>
    </div>

    <table id="dishes-table" className="display-table">
        <thead>
            <tr>
                <th>Dishes</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Pupusas</td>
            </tr>
            <tr>
                <td>Água de Jamaica</td>
            </tr>
        </tbody>
    </table>

    <table id="attendees-table" className="display-table">
        <thead>
            <tr>
                <th>Attendees</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John Smith</td>
            </tr>
            <tr>
                <td>Jane Smith</td>
            </tr>
        </tbody>
    </table>

    <div>
        <button id="bring-dish">Bring Dish</button>
    </div>
    </>
}