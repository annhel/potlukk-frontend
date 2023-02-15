import { useState } from "react";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getGuestPotlukks, getHostPotlukks, getNotifs } from "../api/homepage-requests";
import { PotlukkDetails, PotlukkDetailsSwapForm } from "../api/types";
import { NavBar } from "../navigation/navbar";
import "../css/home.css"
 
export function HomePage(){
    // const[hostPotlukks, setHostPotlukks] = useState<PotlukkDetails[]>([])
    const { data: hostData = []} = useQuery("hostCache", getHostPotlukks)
    const { data: guestData = []} = useQuery("guestCache", getGuestPotlukks)
    const { data: notifData = []} = useQuery("notifCache", getNotifs)
    const queryClient = useQueryClient();
    
    const navigate = useNavigate();

    function handleDetailsHost(potlukkId: number){
        localStorage.setItem("hostPotlukkId", potlukkId.toString())
        navigate("/potlukkinfohost/" + potlukkId)
    }

    function handleDetailsGuest(potlukkId: number){
        localStorage.setItem("guestPotlukkId", potlukkId.toString())
        navigate("/potlukkinfoguest/" + potlukkId)
    }

    return<>
    <NavBar></NavBar>
    <h1>HomePage</h1>
    <section className="homeSection">
            <table className="homeTable">
                <thead className="homeThead">
                    <tr><th colSpan={3}>I'm Hosting!</th></tr>
                </thead>
                <tbody className="homeTbody">
                {hostData.map(hd=> 
                    <tr key ={hd.potlukkId}><td>{hd.details.title}</td><td><button onClick={()=>handleDetailsHost(hd.potlukkId)}>Details</button></td></tr>
                    )}
                </tbody>
            </table>
            <table className="homeTable">
                <thead className="homeThead">
                    <tr><th colSpan={2}>I'm Going!</th></tr>
                </thead>
                <tbody className="homeTbody">
                {guestData.map(gd=> 
                    <tr key ={gd.potlukkId}><td>{gd.details.title}</td><td><button onClick={()=>handleDetailsGuest(gd.potlukkId)}>Details</button></td></tr>
                    )}
                </tbody>
            </table>
            <table className="homeTable">
                <thead className="homeThead">
                    <tr><th colSpan={2}>Notifications</th></tr>
                </thead>
                <tbody className="homeTbody">
                {notifData.map(nd=> 
                    <tr key ={nd.eventId}><td>{nd.kind}</td><td>{nd.affectedPotlukkId}</td><td></td></tr>
                    )}
                </tbody>
            </table>
    </section>
    </>
}