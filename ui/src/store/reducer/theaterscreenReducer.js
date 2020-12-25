import * as actionTypes from '../theaterscreenActionType';
const initialstore = {
    tscreens:[],
    singletscreen:{},
    loading:false,
    error:""
}

const store = (state=initialstore,action)=>{
    switch(action.type)
    {
        case actionTypes.INIT_FETCH_THEATER_SCREEN:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETCH_SCREEN_THEATER_SUCCESS:
            return{
                ...state,
                loading:false,
                tscreens:action.theaterscreens
            }
        case actionTypes.FETCH_SCREEN_THEATER_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case actionTypes.INIT_ADD_THEATER_SCREEN:
            return{
                ...state,
                loading:true
            }
        case actionTypes.ADD_SCREEN_THEATER_SUCCESS:
            return{
                ...state,
                loading:false                  
            }
        case actionTypes.ADD_SCREEN_THEATER_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        
        case actionTypes.INIT_DELETE_THEATER_SCREEN:
            return{
                ...state,
                loading:true
            }
        case actionTypes.DELETE_SCREEN_THEATER_SUCCESS:
            let tscreeens = state.tscreens.filter(tscren => tscren._id !== action.id);
            return{
                ...state,
                loading:false,           
                tscreens:tscreeens    
            }
        case actionTypes.DELETE_SCREEN_THEATER_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        // case actionTypes.INIT_UPDATE_THEATER_SCREEN:
        //     return{
        //         ...state,
        //         loading:true
        //     }
        // case actionTypes.UPDATE_SCREEN_THEATER_SUCCESS:
        //     let tscreens = [...state.tscreens];
        //     tscreens.map(order => {
        //         if(order._id === action.theaterscreens._id)
        //         {
        //             order = action.states.state_name                    
        //         }
        //     });
        //     // console.log(action.singlestates);
        //         return{
        //             ...state,
        //             loading:false, 
        //             states:statesst             
        //         }
        // case actionTypes.UPDATE_SCREEN_THEATER_FAILED:
        //     return{
        //         ...state,
        //         loading:false,
        //         error:action.error
        //     }
        // case actionTypes.INIT_SINGLE_THEATER_SCREEN:
        //     return{
        //         ...state,
        //         loading:true
        //     }
        default:
            return state;
    }
}

export default store;