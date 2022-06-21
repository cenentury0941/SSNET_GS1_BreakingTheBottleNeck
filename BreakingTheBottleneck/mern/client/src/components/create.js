import React, { useState } from "react";
import { useNavigate } from "react-router";
import  { useEffect } from "react";
import { Link } from "react-router-dom";


const Record = (props) => (
  <tr>
    <td>{props.record.id}</td>
    <td>{props.record.item}</td>
    <td>{props.record.qty}</td>
    
  </tr>
 );
  
  

export default function Create() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
  e.preventDefault();

  // When a post request is sent to the create url, we'll add a new record to the database.


}
 

      var company_param = (new URLSearchParams(window.location.search)).get("Company") ;
      var company_json = JSON.parse(company_param) ;

      const [records, setRecords] = useState([]);
  
      // This method fetches the records from the database.
      useEffect(() => {
        async function getRecords() {
          
          var items_json ;

          if( window.location.href.includes("/cons") )
          {
            items_json = company_json.items_produced ;
          }
          else{
            items_json = company_json.items_consumed ;
          }

          var records = [] 

          console.log( "ITEMS JSON" );
          console.log( items_json );
          
          for( var key in items_json )
          {
            records.push( items_json[key]);
          }

          setRecords(records);
        }
      
        getRecords();
      
        return;
      }, [records.length]);
      
      // This method will delete a record
      async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
          method: "DELETE"
        });
      
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
      }
      
      // This method will map out the records on the table
      function recordList() {
        return records.map((record) => {
          return (
            <Record
              record={record}
              deleteRecord={() => deleteRecord(record._id)}
              key={record._id}
            />
          );
        });
      }







 // This following section will display the form that takes the input from the user.
 return (
   <div style={{padding:50,height:"820px" ,overflowY: 'scroll'}}>
    
     <h3>Company Details</h3>
     <br></br>
     <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
     <img src={require("./qr.png")} style={{border:"2px",borderColor:"#393939",borderStyle:"solid",height:250}}/>
     <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3484312.3991541993!2d77.68084380996696!3d16.80927876394722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1655698349831!5m2!1sen!2sin" width="100%" height="250" style={{border:"0"}} allowFullScreen="" loading="lazy"></iframe>
     </div>
     <br></br>
     <form onSubmit={onSubmit}>
       <div className="form-group" style={{margin:10}}>
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={company_json.name}
           contentEditable="false"
         />
       </div>
       <div className="form-group" style={{margin:10}}>
         <label htmlFor="position">GLN</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={company_json.gln}
           contentEditable="false"
         />
       </div>

       <div className="form-group" style={{margin:10}}>
         <label htmlFor="location">Location</label>
         <input
           type="text"
           className="form-control"
           id="location"
           value={company_json.location}
           contentEditable="false"
         />
       </div>

       <div className="form-group" style={{margin:10}}>
         <label htmlFor="Owner">Owner</label>
         <input
           type="text"
           className="form-control"
           id="owner"
           value={company_json.owner}
           contentEditable="false"
         />
       </div>

       

       <div>
     <h3>Items { window.location.href.includes("/cons") ? "Provided" : "Requested"  }</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>GTIN</th>
           <th>ITEM</th>
           <th>QTY</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>


       

     </form>
   </div>
 );
}
