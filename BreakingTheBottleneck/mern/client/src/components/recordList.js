import React, { useEffect, useState } from "react";

import {Button} from 'react-bootstrap'
import Card from "react-bootstrap/Card";

import "./styles.css";
 
const Record = (props) => (

  <Card style={{marginTop:10}}>  
  
  <Card.Body>
    <Card.Title>{props.record.name}</Card.Title>
    <Card.Text>
    GLN : {props.record.gln}
    <br/>
    Coords : {props.record.location}
    </Card.Text>
    <Button variant="primary" href={
      
      (window.location.href.includes("/cons")?"/consitems":"/proditems")+ "?json=" + (new URLSearchParams(window.location.search)).get("json")  + ("&ProdBtn="+props.record.name)
      
      } action="get">Details</Button>
  </Card.Body>

  </Card>



);

const RecordMap = (props) => (

<Card style={{marginTop:10}}>  
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3484312.3991541993!2d77.68084380996696!3d16.80927876394722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1655698349831!5m2!1sen!2sin" width="100%" height="250" style={{border:"0"}} allowFullScreen="" loading="lazy"></iframe>
            
  <Card.Body>
  <Card.Title>{props.record.name}</Card.Title>
    <Card.Text>
    GLN : {props.record.gln}
    </Card.Text>
    <Button variant="primary" href={(window.location.href.includes("/cons")?"/consprodabout":"/prodconsabout") + "?json=" + (new URLSearchParams(window.location.search)).get("json")  + ("&ProdBtn="+(new URLSearchParams(window.location.search)).get("ProdBtn")) + ("&AboutBtn="+props.record.name) + ("&Maps=" + (new URLSearchParams(window.location.search)).get("Maps")) + ("&Company=" + (JSON.stringify(props.record)) ) } action="post">Details</Button>
  </Card.Body>
</Card>


);


const RecordItem = (props) => (

  <Card style={{marginTop:10}}>   
    <Card.Body>
    <Card.Title>{props.record.item}</Card.Title>
      <Card.Text>
      GTIN : {props.record.id}
      </Card.Text>
      <Button variant="primary" href={(window.location.href.includes("/cons")?"/consitemsprod":"/proditemscons") + "?json=" + (new URLSearchParams(window.location.search)).get("json")  + (window.location.href.includes("/cons")?("&Maps="+JSON.stringify(props.record.prod)):("&Maps="+JSON.stringify(props.record.clients))) + ("&ProdBtn="+(new URLSearchParams(window.location.search)).get("ProdBtn"))} action="post">Details</Button>
    </Card.Body>
  </Card>
  
  
  );
 
export function ProducerList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/ProdRecord`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     if ( !window.location.href.includes("/prod") || window.location.href.length < 100 )
     {
      window.location.href = ("http://localhost:3000/prod?json="+JSON.stringify(records) );
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
 
 return (
   <div>
     <h3><br/>YOUR PRODUCERS</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>LOCATIONS</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}




export function ConsumerList() {
  const [records, setRecords] = useState([]);
  
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/ConsRecord`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
     
      const records = await response.json();

      if ( !window.location.href.includes("/cons") || window.location.href.length < 100 )
      {
       window.location.href = ("http://localhost:3000/cons?json="+JSON.stringify(records) );
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
  
  return (
    <div>
      <h3><br/>YOUR CONSUMERS</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>LOCATIONS</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
 }




 
export function ItemList() {
  const [records, setRecords] = useState([]);
  
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const response = urlParams.get('json');
  
      const records = await JSON.parse(response);
      var filtered_records = [];

      for ( var rec in records )
      {
          if( records[rec].name === (urlParams.get('ProdBtn')) )
          {
            console.log(urlParams.get('ProdBtn'))

            if (window.location.href.includes("/cons"))
            {
              for ( var key in records[rec].items_consumed )
              {
                filtered_records.push( records[rec].items_consumed[key] ) ;
              }
              break ;
            }
            else
            {

              for ( var key in records[rec].items_produced )
              {
                filtered_records.push( records[rec].items_produced[key] ) ;
              }
              break ;

            }

            
          }
      }

      setRecords(filtered_records);
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
  
  function recordList() {
    return records.map((record) => {
      return (
        <RecordItem
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  
  return (
    <div>
      <h3><br/>ITEMS</h3>
      <br/>
      <Button
      value="Add Item"
      text="Add Item"
      height="100"
      >Add Items</Button>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
 }


 
export function LocationList() {
  const [records, setRecords] = useState([]);
  
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      var url = ""
      if( window.location.href.includes("/cons") )
      {
        url = `http://localhost:5000/ProdRecordAll/` ;
      }
      else{
        url = `http://localhost:5000/ConsRecordAll/` ;
      }


      const response = await fetch(url);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      console.log( records )

      var filtered_records = []

      var required_records = []

      var map_param = JSON.parse((new URLSearchParams(window.location.search)).get("Maps"))

      for( var location in map_param )
      {
        required_records.push( "Company_" + parseInt( map_param[location] , 10 ) )
      }

      console.log( required_records )


      for( var rec in records )
      {
        if( required_records.includes( records[rec].name ) )
        {
            filtered_records.push( records[rec] )
        }
      }

      console.log(filtered_records )

      setRecords(filtered_records);
    
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
  
  function recordList() {
    return records.map((record) => {
      return (
        <RecordMap
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  
  return (
    <div>
      <h3><br/>{window.location.href.includes("/cons")?"SUPPLIERS":"CLIENTS"}</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
 }



 
 
export function SignIn() {
  
  
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        window.location.href = "http://localhost:3000/?uname="+uname.value;
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
    </div>
  );

  return (
    <div className="app">
      <div class="flex" style={{backgroundColor:"#393939",height:100,width:"100%",margin:0,position: "absolute",top:"0",padding:10}}>
      <div style={{display:"inline-block",width: "30%"}}><img src={require("./icon.png")} alt="" height={69} width={69}/>
      <img src={require("./SSNET.png")} alt="" height={69}/></div>
      </div>
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );



 }