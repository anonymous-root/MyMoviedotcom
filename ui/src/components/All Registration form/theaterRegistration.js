import React, { useState,useEffect } from "react";
import {Form,Col,Button} from "react-bootstrap";
import {connect} from 'react-redux';
import {adduserdata} from '../../store/action/userAction';
import {fetchstatedata} from '../../store/action/stateAction';
import {fetchAllStatesBystate_id} from '../../store/action/cityAction';
import '../register.css';

const FormPage = (props) => {
  useEffect(()=>{
    props.fetchstatedata();
  },[props.fetchstatedata])

  const [obj,setMyObj] = useState({
    user_name:"",
    cinema_name:"",
    password:"",
    email:"",
    gender:"Male",
    photo1:"",
    state_id:"",
    city_id:"",
    group_id:"",
    is_active:""
  });
  
  const [error,setError]=useState({
    user_name_nameError:"",
    cinema_nameError:"",
    password_nameError:"",
    gender_nameError:"",
    email_nameError:"",
    state_nameError:"",
    city_nameError:"",
    isValid:false
  });

  const handleSubmit =async () =>{
    let errors = { ...error,isValid: true };
    obj.group_id="5fcc4230e862ea35384c7c8f";
    obj.is_active="1";
    // obj.photo1="sds";
    errors.state_nameError="";
    errors.city_nameError="";
    errors.user_name_nameError="";
    errors.cinema_nameError="";
    errors.password_nameError="";
    errors.email_nameError="";
    errors.isValid=false;
    if(obj.state_id == "" || obj.city_id == "" || obj.user_name == "" || obj.password == "" || obj.email == "" || obj.email != "" || obj.cinema_name!=""){
      if(obj.state_id == ""){
        errors.state_nameError="Please atleast one select state !!"
        errors.isValid=true;
      }
      if(obj.city_id == ""){
        errors.city_nameError="Please atleast one select city !!"
        errors.isValid=true;
      }
      if(obj.user_name == ""){
        errors.user_name_nameError="Please reuired username !!"
        errors.isValid=true;
      }
      if(obj.password == ""){
        errors.password_nameError="Please required password !!"
        errors.isValid=true;
      }
      if(obj.email == ""){
        errors.email_nameError="Please required email !!"
        errors.isValid=true;
      }
      if(obj.cinema_name == ""){
        errors.cinema_nameError="Please required cinema name !!"
        errors.isValid=true;
      }
      if(obj.email != ""){
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(obj.email)) {
          errors.isValid = true;
          errors.email_nameError = "Please enter valid email address.";
        }
      }
    }else{
      errors.state_nameError="";
      errors.city_nameError="";
      errors.user_name_nameError="";
      errors.cinema_nameError="";
      errors.password_nameError="";
      errors.email_nameError="";
      errors.isValid=false;
    }
    if(errors.isValid==false){
      const formdata = new FormData();
      console.log(obj);
      formdata.append("user_name",obj.user_name);
      formdata.append("cinema_name",obj.cinema_name);
      formdata.append("password",obj.password);
      formdata.append("email",obj.email);
      formdata.append("gender",obj.gender);
      formdata.append("photo1",obj.photo1);
      formdata.append("state_id",obj.state_id);
      formdata.append("city_id",obj.city_id);
      formdata.append("group_id",obj.group_id);
      formdata.append("is_active",obj.is_active);
      console.log(obj.photo1);
      await props.adduserdata(formdata);
      props.history.replace("/");
    }
    setError(errors);
  }
  const HandleChange = (e,name) =>{
    let olddata = {...obj};
    if (name == "photo1") {
      const { target: { files } } = e
      olddata[name] = files.length === 1 ? files[0] : files
      olddata[name] = e.target.files[0];
    }
    else
    {
      olddata[name] = e.target.value;
    }
    setMyObj(olddata)
    cityCall(olddata.state_id);
  }

  const cityCall =async (id) =>{
    await props.fetchAllStatesBystate_id(id);
  }

  const optionStates = () => {
    return props.states.map((stateslist) => {
    const { _id, state_name } = stateslist;
      return (
          <option value={_id} key={_id}>{state_name}</option>
      )
    })
  }

  const optioncities = () => {
    return props.cities.map((stateslist) => {
    const { _id, city_name } = stateslist;
      return (
          <option value={_id} key={_id}>{city_name}</option>
      )
    })
  }

  const backHandler = () => {
    props.history.replace("/userreg")
  }

  const loginHandler = () =>{
    props.history.replace("/")
  }

    return (
              <div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
        <div className="container register" style={{marginTop: "2px" }}>
          <div className="row">
            <div className="col-md-3 register-left">
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
              <h3>Welcome</h3>
              <p>You are 30 seconds away farom earning your own money!</p>
              <input type="submit" name defaultValue="Login" disabled/><br />
            </div>
            <div className="col-md-9 register-right">
              <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link " variant="secondary" onClick={() => backHandler()} id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="false">User</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="true">Theater</a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <h3 className="register-heading">Apply as a Theater</h3>
                  <div className="row register-form">
                  <Form style={{marginLeft: "100px"}}>
                  <Form.Row>
                      <Form.Group  as={Col} controlId="formGridEmail">
                        <Form.Label>Enter Username:-</Form.Label>
                        <Form.Control type="text" isInvalid={error.user_name_nameError}  placeholder="Enter Username ..." name="user_name" onChange={(e) => {HandleChange(e,"user_name")}} style={{width:"290px"}}/>
                        <Form.Control.Feedback type="invalid">
                            {error.user_name_nameError}
                          </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridEmail2">
                      <Form.Label style={{marginLeft: "28px"}}>Enter Cinema name:-</Form.Label>
                      <Form.Control type="text" isInvalid={error.cinema_nameError} placeholder="Enter cinema name ..." name="cinema_name" onChange={(e) => {HandleChange(e,"cinema_name")}}  style={{marginLeft: "28px",width:"250px"}}/>
                      <Form.Control.Feedback type="invalid" style={{marginLeft: "28px"}}>
                            {error.cinema_nameError}
                        </Form.Control.Feedback>
                        </Form.Group>
                  </Form.Row>
                  <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail2">
                      <Form.Label style={{marginLeft: "28px"}}>Enter Password:-</Form.Label>
                      <Form.Control type="password" isInvalid={error.password_nameError} placeholder="Enter Password ..." name="password" onChange={(e) => {HandleChange(e,"password")}}  style={{marginLeft: "28px",width:"250px"}}/>
                      <Form.Control.Feedback type="invalid" style={{marginLeft: "28px"}}>
                            {error.password_nameError}
                        </Form.Control.Feedback>
                        </Form.Group>
                      <Form.Group  as={Col} controlId="formGridEmail">
                        <Form.Label>Enter Email:-</Form.Label>
                        <Form.Control type="email" isInvalid={error.email_nameError} className="form-control" name="email" onChange={(e) => {HandleChange(e,"email")}} onBlur={() => cityCall()} placeholder="Enter email ..."   style={{width:"290px"}}/>
                        <Form.Control.Feedback type="invalid">
                            {error.email_nameError}
                        </Form.Control.Feedback>
                      </Form.Group>
                  </Form.Row>
                      
                  <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label style={{marginLeft: "28px"}}>Select Gender:-</Form.Label>
                        <Form.Check type="radio" name="gender" value="male" label="Male" style={{marginLeft: "28px"}} onChange={(e) => {HandleChange(e,"gender")}} checked/>
                        <Form.Check type="radio" name="gender" value="female" label="Female" style={{marginLeft: "28px"}} onChange={(e) => {HandleChange(e,"gender")}}/>
                      </Form.Group>
                      <Form.Group>
                          <Form.Label>Select User Photo:-</Form.Label>
                          <Form.Control type="file" name="photo1" onChange={(e) => {HandleChange(e,"photo1")}} style={{maxWidth : "300px"}}/>
                      </Form.Group> 
                  </Form.Row>
                  <Form.Row>
                      <Form.Group>
                          <Form.Label>Select State:-</Form.Label>
                          <Form.Control isInvalid={error.state_nameError} className="form-control" as="select" name="state_id" onChange={(e) => {HandleChange(e,"state_id")}}  style={{width:"290px"}} >
                            <option selected disabled>-----Select -----</option>
                              {optionStates()}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {error.state_nameError}
                          </Form.Control.Feedback>
                      </Form.Group> 
                      <Form.Group>
                          <Form.Label style={{marginLeft: "50px"}}>Select city:-</Form.Label>
                          <Form.Control isInvalid={error.city_nameError} className="form-control" as="select" name="city_id" onChange={(e) => {HandleChange(e,"city_id")}} style={{marginLeft: "50px",width:"250px"}} >
                              <option selected disabled>-----Select -----</option>
                              {optioncities()}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" style={{marginLeft: "28px"}}>
                            {error.city_nameError}
                          </Form.Control.Feedback>
                      </Form.Group> 
                  </Form.Row>
                  <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail2">
                          {/* <input type="submit" /> */}
                          <Button className="btnRegister" defaultValue="Register" style={{marginLeft: "28px"}} onClick={handleSubmit}>Submit</Button>
                      </Form.Group>
                  </Form.Row>

                  </Form>
                  <span className="logn-form-copy" style={{ marginLeft: "262px",marginTop: "26px"}}>Already have an account? <a onClick={()=>{loginHandler()}} className="login-form__sign-up" style={{color:"#0074d9"}}>Sign in</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const mapStateToProps =  (state) => ({
      err:state.stateReducer.error,
      // err:state.userReducer.error1,
      states:state.stateReducer.states,
      cities:state.cityReducer.cities,
    })
  
  const mapDispatchToProps = dispatch =>{
    return{
      fetchstatedata:()=>dispatch(fetchstatedata()),
      // fetchcitiesdata:()=>dispatch(fetchcitiesdata()),
      fetchAllStatesBystate_id:(_id)=>dispatch(fetchAllStatesBystate_id(_id)),
      adduserdata: (postdata) => dispatch(adduserdata(postdata))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(FormPage);
  