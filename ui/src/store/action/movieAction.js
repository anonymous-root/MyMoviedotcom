import axios from "axios";
import * as actionTypes from "../movieActionTypes";

export const fetchmoviedata = () =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_FETCH_MOVIES
        })
        await axios.get("http://localhost:3001/getmovie").then(res => {
            //console.log(res.data);
            dispatch({
                type:actionTypes.FETCH_MOVIES_SUCCESS,
                movies:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.FETCH_MOVIES_FAILED,
                error:error.message
            })
        });        
    }
}

export const addmoviedata = (postdata) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_ADD_MOVIES
        })
        await axios.post("http://localhost:3001/addmovie",postdata).then(res => {
            console.log(postdata);
            dispatch({
                type:actionTypes.ADD_MOVIES_SUCCESS,
                movies:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.ADD_MOVIES_FAILED,
                error:error.message
            })
        });    
    }
}

export const deletemoviedata = (id) =>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_DELETE_MOVIES
        })
        await axios.delete(`http://localhost:3001/deletemovie/${id}`).then(res => {
            dispatch({
                type:actionTypes.DELETE_MOVIES_SUCCESS,
                id:id
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.DELETE_MOVIES_FAILED,
                error:error.message
            })
        });    
    }
}

export const singlemovieDataFetch = (id) =>{
    console.log(id);
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_SINGLE_MOVIES
        })
        await axios.get(`http://localhost:3001/getsinglemovie/${id}`).then(res => {
            console.log(res.data);
            dispatch({
                type:actionTypes.SINGLE_MOVIES_SUCCESS,
                singlemovie:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.SINGLE_MOVIES_FAILED,
                error:error.message
            })
        });    
    }
}   

export const updatemoviedata = (id,put) =>{
    console.log(put);
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.INIT_UPDATE_MOVIES
        })
        await axios.put(`http://localhost:3001/updatemovie/${id}`,put).then(res => {
            // console.log(res.data);
            dispatch({
                type:actionTypes.UPDATE_MOVIES_SUCCESS,
                movies:res.data
            })
        }).catch(error=>{
            dispatch({
                type:actionTypes.UPDATE_MOVIES_FAILED,
                error:error.message
            })
        });    
    }
}   