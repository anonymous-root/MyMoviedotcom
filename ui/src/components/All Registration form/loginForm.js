import React,{useState,useEffect} from 'react';
import  "./../css/login.css";
import {connect} from 'react-redux';
import {login} from '../../store/action/userAction';
import {Form,Button,Input} from "antd";
import Logo from '../../Movie_logo/Admin3.jpg'

const NewComponent = (props) => {
  const [form] = Form.useForm();
  useEffect(()=>{
    if(props.token===true){
      props.history.replace("/city");
    }
  },[props.token])
  const [obj,setMyObj] = useState({
    email:"",
    password:"",
  });
  const [error,setError]=useState(false);
  const handleSubmit = async () =>{
    await props.login(obj.email,obj.password);
    if(props.token!==true && obj.email && obj.password){
     setError(true);
    }
  }

    const signUp = () =>{
        props.history.replace("/userreg");
    }

    const HandleChange = (e,name) =>{
      let olddata = {...obj};
        olddata[name] = e.target.value;
      setMyObj(olddata)
    }
      return (  
        <Form className="login" style={{marginLeft: "500px",marginTop:"90px",borderBottomLeftRadius: "50px",
        borderBottomRightRadius: "50px",
        borderTopLeftRadius: "50px",
        borderTopRightRadius: "50px"}} form={form}
        name="register">
          <header style={{marginTop:"35px",color:'#0ec78b'}}><img src={Logo} style={{height: "60px",width: "60px",marginLeft:"05px",borderBottomLeftRadius: "43px",borderBottomRightRadius: "43px",borderTopLeftRadius: "43px",borderTopRightRadius: "43px"}}/> Movie Login</header>
          <div className="field">
              <span className="fa fa-user" />
              <Form.Item
                  name="email"
                  style={{marginLeft:"45px",width:"280px"}}
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                ><Input placeholder="Enter Your email" style={{height:"55px"}} onChange={(e) => {HandleChange(e,"email")}}/></Form.Item>
          </div>
          <div className="field">
              <span className="fa fa-lock" />
              <Form.Item
                  style={{width:"280px",marginTop: "20px",marginLeft: "46px"}}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password  placeholder="*************" onChange={(e) => {HandleChange(e,"password")}}/>
                </Form.Item>
          </div>
          {(error)?<h4 style={{color:"red"}}>You are Not Unable to Login !!</h4>:""}
          <Form.Item>
              <Button type="primary" htmlType="submit" onClick={() =>handleSubmit()}>Login</Button>
            </Form.Item>
          <div className="forgot-password" style={{textAlign:"center"}}><a href="/">Forgot password?</a></div>
          <span className="logn-form-copy">Don't have an account? <a onClick={()=>{signUp()}} className="login-form__sign-up" style={{color:"#0074d9"}}>Sign Up</a></span>
        </Form>
    );
  }
  
  const mapStateToProps =  (state) => ({
    err1:state.userReducer.error1,
    singleuser:state.userReducer.singleuser,
    token:state.userReducer.token ? true : false

  })

const mapDispatchToProps = dispatch =>{
  return{
    login:(email,password)=>dispatch(login(email,password))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewComponent);