import axios from "axios";
import * as actionTypes from "../userActionTypes";

export const fetchusersdata = () =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_FETCH_USER
        })
        await axios.get("http://localhost:3001/getusers").then(res => {
            dispatch({
                type:actionTypes.FETCH_USER_SUCCESS,
                users:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.FETCH_USER_FAILED,
                error1:error.message
            })
        });        
    }
}

export const adduserdata = (postdata) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_ADD_USER
        })
        await axios.post("http://localhost:3001/adduser",postdata).then(res => {
            dispatch({
                type:actionTypes.ADD_USER_SUCCESS,
                users:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.ADD_USER_FAILED,
                error1:error.message
            })
        });    
    }
}

export const login = (email,password) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_SINGLE_LOGIN
        })
        await axios.get(`http://localhost:3001/login/${email}/${password}`).then(res => {
            console.log(res.data);
            dispatch({
                type:actionTypes.SINGLE_LOGIN_SUCCESS,
                token:res.data.token,
                singleuser:res.data.user
            })
            localStorage.setItem("Token",res.data.token);
        }).catch(error=>{
            dispatch({
                type:actionTypes.SINGLE_LOGIN_FAILED,
                error1:error.message
            })
        });    
    }
}

export const logout = (props) =>{
    return async(dispatch)=>{
        dispatch({
            type:"VerifyToken"
        })
        localStorage.removeItem("Token");
    }
}

export const autoCheckLogin = () =>{
    return async(dispatch)=>{
        let verifytoken= localStorage.getItem("Token");
         await axios.get('http://localhost:3001/fetchProfileToken',{
            headers:{'Authorization':verifytoken}
        }).then(response => {
            dispatch({
                type:"VerifyToken",
                token:verifytoken,
                singleuser:response.data
            })
        }).catch(err => {
            // console.log(err.message);
        })           
    }
}


export const getAllUser = () =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_FETCH_GETALLUSER
        })
        await axios.get("http://localhost:3001/getAllUser").then(res => {
            console.log(res.data);
            dispatch({
                type:actionTypes.FETCH_GETALLUSER_SUCCESS,
                users:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.FETCH_GETALLUSER_FAILED,
                error1:error.message
            })
        });    
    }
}

export const getAllTheater = () =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_FETCH_GETALLTHEATER
        })
        await axios.get("http://localhost:3001/getAllTheater").then(res => {
            console.log(res.data);
            dispatch({
                type:actionTypes.FETCH_GETALLTHEATER_SUCCESS,
                users:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.FETCH_GETALLTHEATER_FAILED,
                error1:error.message
            })
        });    
    }
}
export const updateProfile = (id,put) =>{
    console.log(id);
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_UPDATE_UPDATEPROFILE
        })
        await axios.put(`http://localhost:3001/updateProfile/${id}`,put).then(res => {
            console.log(res.data);
            dispatch({
                type:actionTypes.UPDATE_UPDATEPROFILE_SUCCESS,
                id:id,
                singleuser1:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.UPDATE_UPDATEPROFILE_FAILED,
                error:error.message
            })
        });    
    }
}

export const fetchProfile = (id) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_SINGLE_FETCHPROFILE
        })
        await axios.get(`http://localhost:3001/fetchProfile/${id}`).then(res => {
            console.log(res.data);
            dispatch({
                type:actionTypes.SINGLE_FETCHPROFILE_SUCCESS,
                singleuser1:res.data
            })
        }).catch(error=>{
            
            dispatch({
                type:actionTypes.SINGLE_FETCHPROFILE_FAILED,
                error:error.message
            })
        });    
    }
}   

export const fetchDashboradRecord = () =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_SINGLE_FETCHDASHBOARDRECORD
        })
        await axios.get(`http://localhost:3001/fetchDashboradRecord`).then(res => {
            console.log(res.data);
            dispatch({
                type:actionTypes.SINGLE_FETCHDASHBOARDRECORD_SUCCESS,
                singleDashboard:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.SINGLE_FETCHDASHBOARDRECORD_FAILED,
                error:error.message
            })
        });    
    }
}

export const changepassword = (pass,newpass) =>{
    console.log(newpass);
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_SINGLE_CHANGEPASSWORD
        })
        let verifytoken= localStorage.getItem("Token");
        try {
            let res = await axios.get(`http://localhost:3001/changepassword/${pass}/${newpass}`,{
                headers:{'Authorization':verifytoken}
            });
            console.log(res);
            dispatch({
                type:actionTypes.SINGLE_CHANGEPASSWORD_SUCCESS,
                singleuser2:res.data,
            })
         
        } catch (error) {
            // if(error.response.status === 422) {
            //     // message = error.response.data.message;
            // }
            console.log(error.response.data.message);
            dispatch({
                type:actionTypes.SINGLE_CHANGEPASSWORD_FAILED,
                error1:error.response.data.message
            });
            throw new Error();
        } 
    }
}   
