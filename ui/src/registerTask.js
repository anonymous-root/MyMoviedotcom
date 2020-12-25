import React,{useEffect} from 'react';
import { Switch, Route,Redirect } from 'react-router'
import RegisterForm from './components/All Registration form/userRegistration';
import LoginForm from './components/All Registration form/loginForm';
import {login,autoCheckLogin} from './store/action/userAction';
import TheaterRegistration from './components/All Registration form/theaterRegistration';
import Temp from './components/All Registration form/Temp';
import TheaterTask from './TheaterTask';
import StateTask from './stateTask';
import {connect} from 'react-redux';

const RegisterTask = (props) => {

    useEffect(() => {
        if(props.location.pathname.startsWith("/") && !props.token) {
            props.autoCheckLogin();
            // props.singleuser
            console.log(props.singleuser)
        }
    }, [props.location.pathname,props.autoCheckLogin,props.token])
    let content = <Redirect to="/" />
    if(props.location.pathname.startsWith("/") && !props.token) {
        console.log("Login In " + false + " token " + props.token);
        content = <Switch>
            <Route path="/login" exact component={LoginForm}/>
            <Route path="/userreg" exact component={RegisterForm}/>
            <Route path="/theaterreg" exact component={TheaterRegistration}/>
            <Redirect to="/login" />
        </Switch>
    } else if(props.location.pathname.startsWith("/") && props.token && props.singleuser.group_id.group_name=="admin") {
        content = <>
            <div >
            <Switch>
                
                <Route path="/city" component={StateTask}/>
                <Route path="/city/cityAdd" exact component={StateTask}/>
                
                <Route path="/state/stateAdd" exact component={StateTask}/>
                <Route path="/state" exact component={StateTask}/>

                <Route path="/movie" exact component={StateTask} />
                <Route path="/movie/movieAdd" exact component={StateTask} />
                
                <Route path="/users/" exact component={StateTask} />
                <Route path="/theaters/" exact component={StateTask} />
                <Route path="/dashboard" exact component={StateTask} />

                <Redirect to="/dashboard" />
            </Switch>
            </div>
        </>    
    }else if(props.location.pathname.startsWith("/") && props.token && props.singleuser.group_id.group_name=="user"){
        content = <>
        <div >
        <Switch>
            <Route path="/Temp" exact component={Temp} />
            {/* <Route path="/Temp" exact component={Temp} /> */}

            <Redirect to="/Temp" />
         </Switch>
        </div> 
    </>
     }else if(props.location.pathname.startsWith("/") && props.token && props.singleuser.group_id.group_name=="theater"){
            content = <>
            <div > 
             <Switch>
                
                <Route path="/theater/dashboard" exact component={TheaterTask} />
                <Route path="/theater/addScreen" exact component={TheaterTask} />
                <Route path="/theater/screenList" exact component={TheaterTask} />
                <Route path="/theater/addtscreen" exact component={TheaterTask} />
                <Route path="/theater/tscreenList" exact component={TheaterTask} />
                <Redirect to="/theater/dashboard" />
            </Switch>
             </div>
        </>
    }
    return content
}

const mapStateToProps =  (state) => ({
    err1:state.userReducer.error1,
    singleuser:state.userReducer.singleuser,
    token:state.userReducer.token ? true : false
  })

const mapDispatchToProps = dispatch =>{
  return{
    autoCheckLogin:()=>dispatch(autoCheckLogin()),
    login:(email,password)=>dispatch(login(email,password))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(RegisterTask);