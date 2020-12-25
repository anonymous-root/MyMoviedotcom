import axios from "axios";
import * as actionTypes from "../screenActionType";

export const getscreen = () => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.INIT_FETCH_SCREEN
        })
        try {
            let verifytoken = localStorage.getItem("Token");
            let response = await axios.get("http://localhost:3001/getscreen", {
                headers: { 'Authorization': verifytoken }
            })
            console.log(response.data);
            dispatch({
                type: actionTypes.FETCH_SCREEN_SUCCESS,
                screens: response.data
            })
        } catch (error) {
            console.log(error.response.data.message);
            dispatch({
                type: actionTypes.FETCH_SCREEN_FAILED,
                error: error.response.data.message
            });
            throw new Error();
        }
    }
}

export const addscreen = (postdata) => {
    console.log(postdata);
    return async (dispatch) => {
        dispatch({
            type: actionTypes.INIT_ADD_SCREEN
        })
        try {
            let response = await axios.post("http://localhost:3001/addscreen", postdata)
            dispatch({
                type: actionTypes.ADD_SCREEN_SUCCESS,
                screens: response.data
            })
        } catch (error) {
            console.log(error.response.data.message);
            dispatch({
                type: actionTypes.ADD_SCREEN_FAILED,
                error: error.response.data.message
            });
            throw new Error();
        }
    }
}

export const deletescreen = (id) => {
    console.log(id);
    return async (dispatch) => {
        dispatch({
            type: actionTypes.INIT_DELETE_SCREEN
        })
        try {
            let response = await axios.delete(`http://localhost:3001/deletescreen/${id}`)
            dispatch({
                type: actionTypes.DELETE_SCREEN_SUCCESS,
                id: id
            })
        } catch (error) {
            console.log(error.response.data.message);
            dispatch({
                type: actionTypes.DELETE_SCREEN_FAILED,
                error: error.response.data.message
            });
            throw new Error();
        }
    }
}

export const singlescreenrecord = (id) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.INIT_SINGLE_SCREEN
        })
        try {
            let response = await axios.get(`http://localhost:3001/singlescreen/${id}`)
            dispatch({
                type: actionTypes.SINGLE_SCREEN_SUCCESS,
                singlescreen: response.data
            })
        } catch (error) {
            console.log(error.response.data.message);
            dispatch({
                type: actionTypes.SINGLE_SCREEN_FAILED,
                error: error.response.data.message
            });
            throw new Error();
        }
    }
}

export const updatescreen = (id, put) => {
    console.log(put);
    return async (dispatch) => {
        dispatch({
            type: actionTypes.INIT_UPDATE_SCREEN
        })
        try {
            let response = await axios.put(`http://localhost:3001/updatescreen/${id}`, put)
            dispatch({
                type: actionTypes.UPDATE_SCREEN_SUCCESS,
                screens: response.data
            })
        } catch (error) {
            console.log(error.response.data.message);
            dispatch({
                type: actionTypes.UPDATE_SCREEN_FAILED,
                error: error.response.data.message
            });
            throw new Error();
        }
    }
} 