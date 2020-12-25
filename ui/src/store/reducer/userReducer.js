import * as actionTypes from "../userActionTypes";
const initalstore ={
    users:[],
    singleuser:{},
    singleuser1:{},
    singleuser2:{},
    singleDashboard:{},
    loading:false,
    error1:"",
    token:null,
}

const store = (state = initalstore,action) =>{
    switch(action.type){
        case actionTypes.INIT_FETCH_USER:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                users:action.users
            }

        case actionTypes.FETCH_USER_FAILED:
            return{
                ...state,
                loading:false,
                error1:action.error1,
            }
        case actionTypes.INIT_ADD_USER:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.ADD_USER_SUCCESS:

                return{
                    ...state,
                    loading:false                  
                }
        case actionTypes.ADD_USER_FAILED:
                return{
                    ...state,
                    loading:false,
                    error1:action.error1
                }
        case actionTypes.INIT_DELETE_USER:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.DELETE_USER_SUCCESS:
                let usert = state.users.filter(statese => statese._id !== action.id);
                // let studentst = state.states.filter(student => student._id !== action.id);
                return{
                    ...state,
                    loading:false,   
                    users:usert,
                }
        case actionTypes.DELETE_USER_FAILED:
                return{
                    ...state,
                    loading:false,
                    error1:action.error1
                }
        case actionTypes.INIT_SINGLE_USER:
                    return{
                        ...state,
                        loading:true,    
                    };
        case actionTypes.SINGLE_USER_SUCCESS:
            // console.log()
                return{
                    ...state,
                    loading:false, 
                    singleuser:action.singleuser             
                }
        case actionTypes.SINGLE_USER_FAILED:
                return{
                    ...state,
                    loading:false,
                    error1:action.error1
                }
        case actionTypes.INIT_SINGLE_LOGIN:
                    return{
                        ...state,
                        loading:true,    
                    };
        case actionTypes.SINGLE_LOGIN_SUCCESS:
                console.log(action.token)
                console.log(action.singleuser)
                return{
                    ...state,
                    loading:false, 
                    token:action.token,
                    error1:"",
                    singleuser:action.singleuser             
                }
        case actionTypes.SINGLE_LOGIN_FAILED:
                return{
                    ...state,
                    loading:false,
                    error1:action.error1
                }
        case actionTypes.INIT_UPDATE_USER:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.UPDATE_USER_SUCCESS:
                // let statesst = [...state.users];
                // statesst.map(order => {
                //     if(order._id === action.USER._id)
                //     {
                //         order.city_name = action.users.city_name
                //         order.state_id = action.users.state_id;
                //     }
                // });  
                // console.log(action.USER.state_id);          
                return{
                    ...state,
                    loading:false, 
                    // USER:statesst
                }
        case "VerifyToken":
            return {
                ...state,
                token:action.token,
                singleuser:action.singleuser
            }
        case actionTypes.UPDATE_USER_FAILED:
                return{
                    ...state,
                    loading:false,
                    error1:action.error1
                }
        case actionTypes.INIT_FETCH_GETALLUSER:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_GETALLUSER_SUCCESS:
            console.log(action.users);
            return{
                ...state,
                loading:false,
                users:action.users
            }

        case actionTypes.FETCH_GETALLUSER_FAILED:
            return{
                ...state,
                loading:false,
                error1:action.error1,
            }
        case actionTypes.INIT_FETCH_GETALLTHEATER:
                return{
                    ...state,
                    loading:true,
                }
        case actionTypes.FETCH_GETALLTHEATER_SUCCESS:
            console.log(action.users);
            return{
                ...state,
                loading:false,
                users:action.users
            }

        case actionTypes.FETCH_GETALLTHEATER_FAILED:
            return{
                ...state,
                loading:false,
                error1:action.error1,
            }
        case actionTypes.INIT_UPDATE_UPDATEPROFILE:
                return{
                    ...state,
                    loading:true,
                }
        case actionTypes.UPDATE_UPDATEPROFILE_SUCCESS:
            console.log(action.singleuser);
            return{
                ...state,
                loading:false,
                singleuser1:action.singleuser1
            }

        case actionTypes.UPDATE_UPDATEPROFILE_FAILED:
            return{
                ...state,
                loading:false,
                error1:action.error1,
            }
        case actionTypes.INIT_SINGLE_FETCHPROFILE:
                    return{
                        ...state,
                        loading:true,    
                    };
        case actionTypes.SINGLE_FETCHPROFILE_SUCCESS:
            // console.log()
                return{
                    ...state,
                    loading:false, 
                    singleuser1:action.singleuser1             
                }
        case actionTypes.SINGLE_FETCHPROFILE_FAILED:
                return{
                    ...state,
                    loading:false,
                    error1:action.error1
            }
        case actionTypes.INIT_SINGLE_FETCHDASHBOARDRECORD:
                return{
                    ...state,
                    loading:true,    
                };
        case actionTypes.SINGLE_FETCHDASHBOARDRECORD_SUCCESS:
        console.log(action.singleDashboard);
            return{
                ...state,
                loading:false, 
                singleDashboard:action.singleDashboard             
            }
        case actionTypes.SINGLE_FETCHDASHBOARDRECORD_FAILED:
            return{
                ...state,
                loading:false,
                error1:action.error1
        }
        case actionTypes.INIT_SINGLE_CHANGEPASSWORD:
                return{
                    ...state,
                    loading:true, 
                    error1:""
                };
        case actionTypes.SINGLE_CHANGEPASSWORD_SUCCESS:
            console.log(action.singleuser2);
            return{
                ...state,
                loading:false, 
                error1:"",
                singleuser2:action.singleuser2,        
            }
        case actionTypes.SINGLE_CHANGEPASSWORD_FAILED:
            console.log(action.error1);
            return{
                ...state,
                loading:false,
                error1:action.error1
        }
            default :
                return state;
    }
}

export default store;