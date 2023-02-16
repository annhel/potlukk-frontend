import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/navbar.css"

export function NavBar(){
    const navigate = useNavigate();

    function handleLogout(){
        localStorage.clear();
        navigate("/")
    }
    function handleHome(){
        navigate(`/home`);
    }
    function handleHost(){
        navigate(`/potlukkregistration`);
    }
    function handleViewPotlukks(){ 
        let potlukkId = localStorage.userId;
        navigate(`/potlukkinfoguest/${potlukkId}`);
    }

    return<>
    <div className="navbar">
        <div id="background-text">Potlukkin'</div>
        
        <button className="navButton" onClick={handleHome}>Home</button>
        <button className="navButton" onClick={handleHost}>Host a Potlukk</button>
        <button className="navButton" onClick={handleViewPotlukks}>My Potlukks</button>
        <button className="navButton" onClick={handleLogout}><img src="https://icons.veryicon.com/png/o/object/material_design_icons/logout-14.png" alt="Logout" /></button>
    </div>
    </>

}