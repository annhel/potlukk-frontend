import { useState } from "react";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getGuestPotlukks, getHostPotlukks, getNotifs } from "../api/homepage-requests";
import { PotlukkDetails, PotlukkDetailsSwapForm } from "../api/types";
import { NavBar } from "../navigation/navbar";
import "../css/home.css"
 
export function HomePage(){
    const { data: hostData = []} = useQuery("hostCache", getHostPotlukks)
    const { data: guestData = []} = useQuery("guestCache", getGuestPotlukks)
    const { data: notifData = []} = useQuery("notifCache", getNotifs)
    const queryClient = useQueryClient();
    
    const navigate = useNavigate();

    function handleDetailsHost(potlukkId: number){
        navigate("/potlukkinfohost/" + potlukkId)
    }

    function handleDetailsGuest(potlukkId: number){
        navigate("/potlukkinfoguest/" + potlukkId)
    }

    return<>
    <NavBar></NavBar>
    <h1 className="homeTitle">Home Page</h1>
    <section className="homeContainer">
            <table className="homeTable">
                <thead >
                    <tr><th className="homeTh"colSpan={3}>I'm Hosting!</th></tr>
                </thead>
                <tbody>
                {hostData.map(hd=> 
                    <tr key ={hd.potlukkId} className="homeTr"><td className="homeTd">{hd.details.title}</td><td className="homeTd"><button onClick={()=>handleDetailsHost(hd.potlukkId)}>Details</button></td></tr>
                    )}
                </tbody>
            </table>
            <table className="homeTable">
                <thead >
                    <tr><th className="homeTh" colSpan={2}>I'm Going!</th></tr>
                </thead>
                <tbody className="homeTbody">
                {guestData.map(gd=> 
                    <tr key ={gd.potlukkId} className="homeTr"><td className="homeTd">{gd.details.title}</td><td className="homeTd"><button onClick={()=>handleDetailsGuest(gd.potlukkId)}>Details</button></td></tr>
                    )}
                </tbody>
            </table>
            <table >
                <thead className="homeThead">
                    <tr className="homeTr"><th className="homeTh" colSpan={2}>Notifications</th></tr>
                </thead>
                <tbody className="homeTbody">
                {notifData.map(nd=> 
                    <tr key ={nd.eventId} className="homeTr"><td className="homeTd">{nd.kind}</td><td className="homeTd">{nd.affectedPotlukkId}</td><td></td></tr>
                    )}
                </tbody>
            </table>
    </section>
    </>
}