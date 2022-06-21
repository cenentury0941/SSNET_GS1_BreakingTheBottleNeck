import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "./nomargin.css";

import Nav from 'react-bootstrap/Nav';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   
   <div style={{margin:0}}>


<div style={{backgroundColor: "#393939"}}>
<div style={{backgroundColor: "#393939",height:"50%",padding:"20px"}}>
  
<div style={{display:"inline-block",width: "30%"}}><img src={require("./icon.png")} alt="" height={69} width={69}/>
<img src={require("./SSNET.png")} alt="" height={69}/></div>

<div style={{display:"inline-block",width: "70%"}}>


{ true ? (
  <Nav variant="pills" defaultActiveKey="/home" className="justify-content-end" >
  <Nav.Item>
    <Nav.Link href="/" eventKey="link-1" style={{color:"cyan"}}>Sign out</Nav.Link>
  </Nav.Item>

  <Nav.Item >
    <Nav.Link style={{backgroundColor:"#009C8D",color:"#FFFFFF"}}>Welcome {"user_1"}</Nav.Link>
  </Nav.Item>
</Nav>
  )
  :
  (
<Nav variant="pills" defaultActiveKey="/home" className="justify-content-end" >
  <Nav.Item>
    <Nav.Link eventKey="link-1" style={{color:"cyan"}}>Sign up</Nav.Link>
  </Nav.Item>

  <Nav.Item >
    <Nav.Link href="/signin.html" style={{backgroundColor:"#009C8D",color:"#FFFFFF"}}>Sign In</Nav.Link>
  </Nav.Item>
</Nav>
  )
}

</div>

</div>
</div>

   </div>
 );
}