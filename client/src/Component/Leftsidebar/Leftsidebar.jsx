import React from 'react'
import "./Leftsidebar.css"
import  { useEffect, useState } from "react";
import axios from "axios";
import shorts from "./shorts.png"
import {AiOutlineHome} from "react-icons/ai"
import {MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary} from "react-icons/md"
import { NavLink } from 'react-router-dom'
const Leftsidebar = ({ userId }) => {
    const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/updatePoints", { userId });
        setPoints(response.data.points);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, [userId]);

  return (
    <div className="container_leftSidebar">
        <NavLink to={'/'} className="icon_sidebar_div">
            <AiOutlineHome size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">Home</div>
        </NavLink>
        <div className="icon_sidebar_div">
            <MdOutlineExplore size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">Explore</div>
        </div>
        <div className="icon_sidebar_div">
            <img src={shorts} width={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">Shorts</div>
        </div>
        <div className="icon_sidebar_div">
            <MdOutlineSubscriptions size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon" style={{fontSize:"12px"}}>Subscription</div>
        </div>
        <NavLink to={'/Library'} className="icon_sidebar_div">
            <MdOutlineVideoLibrary size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">Library</div>
        </NavLink>
        <div className="icon_sidebar_div">
        
            <MdOutlineVideoLibrary size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">  Points: {points}</div>
        

        </div>
    </div>
  )
}

export default Leftsidebar