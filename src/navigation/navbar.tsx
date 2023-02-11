import { Link } from "react-router-dom";
import "../css/navbar.css"

export function NavBar(){
    return<>
    <h2>Potlukkin'</h2>
    <button>Home<Link to="/home"></Link></button>
    <button>Host a Potlukk<Link to="/potlukkinfohost/:potlukkID"></Link></button>
    <button>My Potlukks<Link to="/potlukkinfoguest/:potlukkID"></Link></button>
    <button><img src="https://icons.veryicon.com/png/o/object/material_design_icons/logout-14.png" alt="Logout" /></button>
    </>
}