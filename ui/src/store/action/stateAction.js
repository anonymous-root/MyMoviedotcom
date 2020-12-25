import axios from "axios";
import * as actionTypes from "../actionTypes";

export const fetchstatedata = () =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_FETCH_STATES
        })
        await axios.get("http://localhost:3001/getstate").then(res => {
            dispatch({
                type:actionTypes.FETCH_STATES_SUCCESS,
                states:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.FETCH_STATES_FAILED,
                error:error.message
            })
        });        
    }
}

export const addstatedata = (postdata) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_ADD_STATES
        })
        await axios.post("http://localhost:3001/addstate",postdata).then(res => {
            dispatch({
                type:actionTypes.ADD_STATES_SUCCESS,
                states:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.ADD_STATES_FAILED,
                error:error.message
            })
        });    
    }
}

export const deletestatedata = (id) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_DELETE_STATES
        })
        await axios.delete(`http://localhost:3001/deletestate/${id}`).then(res => {
            dispatch({
                type:actionTypes.DELETE_STATES_SUCCESS,
                id:id
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.DELETE_STATES_FAILED,
                error:error.message
            })
        });    
    }
}

export const singlestateDataFetch = (id) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_SINGLE_STATES
        })
        await axios.get(`http://localhost:3001/singlestate/${id}`).then(res => {
            dispatch({
                type:actionTypes.SINGLE_STATES_SUCCESS,
                singlestate:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.SINGLE_STATES_FAILED,
                error:error.message
            })
        });    
    }
}   

export const updatestatedata = (id,put) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_UPDATE_STATES
        })
        await axios.put(`http://localhost:3001/updatestate/${id}`,put).then(res => {
            dispatch({
                type:actionTypes.UPDATE_STATES_SUCCESS,
                states:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.UPDATE_STATES_FAILED,
                error:error.message
            })
        });    
    }
}   