import React, { Component, useEffect } from "react";
import {connect} from 'react-redux';
import {fetchDashboradRecord} from '../../store/action/userAction';
import {  Row, Col,Card, CardGroup,CardDeck } from "react-bootstrap";
// import {MDBIcon} from 'react/jsx'
import { SiApachesolr,SiAtAndT,SiAdobecreativecloud,SiCoffeescript } from "react-icons/si";

const Dashboard = (props) => {

  // render: function() {
    return (
      <>
      <div >
      <CardDeck style={{    display: "flex"}}>
    <Card border="Primary" style={{ width: '18rem',backgroundColor:"#1e9ee8",color:"White",padding:"20px",
    marginLeft: "20px" }} >
      <Card.Header>Total State</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text style={{fontSize: "24px",marginTop: "6px"}}></Card.Text>
        <SiCoffeescript style={{fontSize: "65px",marginLeft: "131px", marginTop: "-54px"}}/>
      </Card.Body>
    </Card>
    <Card border="Success" style={{ width: '18rem',backgroundColor:"#b9ad16",color:"White",marginLeft: "20px",padding:"20px" }} >
      <Card.Header>Total City</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text style={{fontSize: "24px",marginTop: "6px"}}></Card.Text>
        <SiAtAndT style={{fontSize: "65px",marginLeft: "131px", marginTop: "-54px"}}/>  
      </Card.Body>
    </Card>
    <Card border="Success" style={{ width: '18rem',backgroundColor:"#25b125",color:"White",marginLeft: "20px",padding:"20px" }} >
      <Card.Header>Total Movies</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text style={{fontSize: "24px",marginTop: "6px"}}></Card.Text>
        <SiApachesolr style={{fontSize: "65px",marginLeft: "131px", marginTop: "-54px"}}/>        
      </Card.Body>
    </Card>
    <Card bg="danger" style={{ width: '18rem',backgroundColor:"#f52e2e",color:"White",marginLeft: "20px",padding:"20px" }} >
      <Card.Header>Total Theater</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text style={{fontSize: "24px",marginTop: "6px"}}></Card.Text>
        <SiAdobecreativecloud style={{fontSize: "65px",marginLeft: "131px", marginTop: "-54px"}}/>  
      </Card.Body>
    </Card>
    </CardDeck>
    </div>
     </>
    );
}


const mapDispatchToProps = dispatch =>{
  return{
    fetchDashboradRecord:()=>dispatch(fetchDashboradRecord())
  }
}
export default connect(null,mapDispatchToProps)(Dashboard);