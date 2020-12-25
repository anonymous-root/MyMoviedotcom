import * as actionTypes from "../cityActionTypes";
const initalstore ={
    cities:[],
    singlecities:{},
    loading:false,
    error:"",
}

const store = (state = initalstore,action) =>{
    switch(action.type){
        case actionTypes.INIT_FETCH_CITIES:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_CITIES_SUCCESS:
            return{
                ...state,
                loading:false,
                cities:action.cities
            }

        case actionTypes.FETCH_CITIES_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error,
            }
        case actionTypes.INIT_ADD_CITIES:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.ADD_CITIES_SUCCESS:

                return{
                    ...state,
                    loading:false                  
                }
        case actionTypes.ADD_CITIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_DELETE_CITIES:
                    return{
                        ...state,
                        loading:true,
    
                    };
        case actionTypes.DELETE_CITIES_SUCCESS:
                let citiest = state.cities.filter(statese => statese._id !== action.id);
                // let studentst = state.states.filter(student => student._id !== action.id);
                return{
                    ...state,
                    loading:false,   
                    cities:citiest,
                }
        case actionTypes.DELETE_CITIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_SINGLE_CITIES:
                    return{
                        ...state,
                        loading:true,    
                    };
        case actionTypes.SINGLE_CITIES_SUCCESS:
            // console.log(ac)
                return{
                    ...state,
                    loading:false, 
                    singlecities:action.singlecities             
                }
        case actionTypes.SINGLE_CITIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_UPDATE_CITIES:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.UPDATE_CITIES_SUCCESS:
                let statesst = [...state.cities];
                statesst.map(order => {
                    if(order._id === action.cities._id)
                    {
                        order.city_name = action.cities.city_name
                        order.state_id = action.cities.state_id;
                    }
                });  
                // console.log(action.cities.state_id);          
                return{
                    ...state,
                    loading:false, 
                    cities:statesst
                }
        case actionTypes.UPDATE_CITIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_FETCHSTATESBYCITYID_CITIES:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCHSTATESBYCITYID_CITIES_SUCCESS:
            return{
                ...state,
                loading:false,
                cities:action.cities
            }
        case actionTypes.FETCHSTATESBYCITYID_CITIES_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error,
            }
            default :
                return state;
    }
}

export default store;