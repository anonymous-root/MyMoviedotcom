import axios from "axios";
import * as actionTypes from "../cityActionTypes";

export const fetchcitiesdata = () =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_FETCH_CITIES
        })
        await axios.get("http://localhost:3001/getcities").then(res => {
            dispatch({
                type:actionTypes.FETCH_CITIES_SUCCESS,
                cities:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.FETCH_CITIES_FAILED,
                error:error.message
            })
        });        
    }
}

export const addcitiesdata = (postdata) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_ADD_CITIES
        })
        await axios.post("http://localhost:3001/addcities",postdata).then(res => {
            dispatch({
                type:actionTypes.ADD_CITIES_SUCCESS,
                cities:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.ADD_CITIES_FAILED,
                error:error.message
            })
        });    
    }
}

export const deletecitiesdata = (id) =>{
    console.log(id);
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_DELETE_CITIES
        })
        await axios.delete(`http://localhost:3001/deletecities/${id}`).then(res => {
            dispatch({
                type:actionTypes.DELETE_CITIES_SUCCESS,
                id:id
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.DELETE_CITIES_FAILED,
                error:error.message
            })
        });    
    }
}

export const singlecitiesDataFetch = (id) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_SINGLE_CITIES
        })
        await axios.get(`http://localhost:3001/singlecities/${id}`).then(res => {
            // console.log(res.data);
            dispatch({
                type:actionTypes.SINGLE_CITIES_SUCCESS,
                singlecities:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.SINGLE_CITIES_FAILED,
                error:error.message
            })
        });    
    }
}   

export const updatecitiesdata = (id,put) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_UPDATE_CITIES
        })
        await axios.put(`http://localhost:3001/updatecities/${id}`,put).then(res => {
            // console.log(res.data);
            dispatch({
                type:actionTypes.UPDATE_CITIES_SUCCESS,
                cities:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.UPDATE_CITIES_FAILED,
                error:error.message
            })
        });    
    }
} 

export const fetchAllStatesBystate_id = (id) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_FETCHSTATESBYCITYID_CITIES
        })
            await axios.get(`http://localhost:3001/fetchAllStatesBystate_id/${id}`).then(res => {
            console.log(res.data);
            dispatch({
                type:actionTypes.FETCHSTATESBYCITYID_CITIES_SUCCESS,
                cities:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.FETCHSTATESBYCITYID_CITIES_FAILED,
                error:error.message
            })
        });    
    }
} 