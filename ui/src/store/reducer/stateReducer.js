import * as actionTypes from "../actionTypes";
const initalstore ={
    states:[],
    singlestate:{},
    loading:false,
    error:"",
}

const store = (state = initalstore,action) =>{
    switch(action.type){
        case actionTypes.INIT_FETCH_STATES:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_STATES_SUCCESS:
            return{
                ...state,
                loading:false,
                states:action.states
            }

        case actionTypes.FETCH_STATES_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error,
            }
        case actionTypes.INIT_ADD_STATES:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.ADD_STATES_SUCCESS:

                return{
                    ...state,
                    loading:false                  
                }
        case actionTypes.ADD_STATES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_DELETE_STATES:
                    return{
                        ...state,
                        loading:true,
    
                    };
        case actionTypes.DELETE_STATES_SUCCESS:
                let statees = state.states.filter(statese => statese._id !== action.id);
                // let studentst = state.states.filter(student => student._id !== action.id);
                return{
                    ...state,
                    loading:false,   
                    states:statees,
                }
        case actionTypes.DELETE_STATES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_SINGLE_STATES:
                    return{
                        ...state,
                        loading:true,    
                    };
        case actionTypes.SINGLE_STATES_SUCCESS:
            console.log(action.singlestate)
                return{
                    ...state,
                    loading:false, 
                    singlestate:action.singlestate             
                }
        case actionTypes.SINGLE_STATES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_UPDATE_STATES:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.UPDATE_STATES_SUCCESS:
            let statesst = [...state.states];
            statesst.map(order => {
                if(order._id === action.states._id)
                {
                    order.state_name = action.states.state_name                    
                }
            });
            // console.log(action.singlestates);
                return{
                    ...state,
                    loading:false, 
                    states:statesst             
                }
        case actionTypes.UPDATE_STATES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
            default :
                return state;
    }
}

export default store;