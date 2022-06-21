import React from "react";


// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import {ProducerList , ConsumerList, ItemList, SignIn, LocationList} from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

import Nav from 'react-bootstrap/Nav';


const App = () => {
 return (

  
   <div style={{margin:0,backgrounColor:"red"}}>
     <Navbar />

     <div className="content-container">
        <div className="row">            
        
            <div className="left-panel box" style={{display:"inline-block",width: "20%",border:"2px",borderColor:"#393939",borderRightStyle:"solid",padding:10,marginLeft:15,marginTop:10,height:"820px" ,overflowY: 'scroll'}}>
                
            <Nav variant="tabs" defaultActiveKey={window.location.href.includes("/cons")?"/cons":"/prod"}>
            <Nav.Item>
              <Nav.Link href={"/prod"+(window.location.href.includes("uname")?"?uname="+(new URLSearchParams(window.location.search)).get("uname"):"")}>Producer</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={"/cons"+(window.location.href.includes("uname")?"?uname="+(new URLSearchParams(window.location.search)).get("uname"):"")}>Consumer</Nav.Link>
            </Nav.Item>
            </Nav>

              <Routes>
                <Route exact path="/prod" element={<ProducerList />} />
                <Route exact path="/proditems" element={<ProducerList />} />
                <Route exact path="/consitems" element={<ConsumerList />} />
                <Route exact path="/cons" element={<ConsumerList />} />
                
                <Route exact path="/prodconsabout" element={<ProducerList />} />
                <Route exact path="/consprodabout" element={<ConsumerList />} />

                <Route exact path="/proditemscons" element={<ProducerList />} />
                <Route exact path="/consitemsprod" element={<ConsumerList />} />
              </Routes>

            </div>              
            
        
            
            <div className="right-panel box" style={{display:"inline-block",width: "18%",border:"2px",borderColor:"#393939",borderRightStyle:"solid",padding:10,marginLeft:15,marginTop:10,height:"820px" ,overflowY: 'scroll'}}>
                
            <Routes>
            <Route exact path="/proditems" element={<ItemList />} />
            <Route exact path="/consitems" element={<ItemList />} />

            <Route exact path="/prodconsabout" element={<ItemList />} />
            <Route exact path="/consprodabout" element={<ItemList />} />
            

            <Route exact path="/proditemscons" element={<ItemList />} />
            <Route exact path="/consitemsprod" element={<ItemList />} />
            </Routes>
                
            </div>


            <div className="middle-panel box" style={{display:"inline-block",width: "18%",height:"820px" ,overflowY: 'scroll',border:"2px",borderColor:"#393939",borderRightStyle:"solid",padding:10,marginLeft:15,marginRight:25,marginTop:10}}>
           
            <Routes>
            <Route exact path="/consitemsprod" element={<LocationList />} />
            <Route exact path="/proditemscons" element={<LocationList />} />
            <Route exact path="/prodconsabout" element={<LocationList />} />
            <Route exact path="/consprodabout" element={<LocationList />} />
            
              </Routes>

            </div>    
            

            <div className="right-panel box" style={{display:"inline-block",width: "39%"}}>
                
            <Routes>
            <Route exact path="/prodconsabout" element={<Create />} />
            <Route exact path="/consprodabout" element={<Create />} />
            </Routes>
                
            </div>

            <div className="right-panel box" style={{display:"inline-block",width: "39%"}}>
                
            <Routes>
            <Route exact path="/signin" element={<SignIn />} />
              </Routes>
                
            </div>
            

            </div>
    </div>
   </div>
 );
};
 
export default App;