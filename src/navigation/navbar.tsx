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
        let lukkId = localStorage.userId;
        navigate(`/potlukkinfohost/${lukkId}`);
    }
    function handleViewPotlukks(){
        let lukkId = localStorage.userId;
        navigate(`/potlukkinfoguest/${lukkId}`);
    }

    return<>
    <h2 className="appName">Potlukkin'</h2>
    <section>
        <button onClick={handleHome}>Home</button>
        <button onClick={handleHost}>Host a Potlukk</button>
        <button onClick={handleViewPotlukks}>My Potlukks</button>
        <button onClick={handleLogout}><img src="https://icons.veryicon.com/png/o/object/material_design_icons/logout-14.png" alt="Logout" /></button>
    </section>
    </>
}