import * as actionTypes from "../movieActionTypes";
const initalstore ={
    movies:[],
    singlemovie:{},
    loading:false,
    error:"",
}

const store = (state = initalstore,action) =>{
    switch(action.type){
        case actionTypes.INIT_FETCH_MOVIES:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_MOVIES_SUCCESS:
            return{
                ...state,
                loading:false,
                movies:action.movies
            }

        case actionTypes.FETCH_MOVIES_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error,
            }
        case actionTypes.INIT_ADD_MOVIES:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.ADD_MOVIES_SUCCESS:
                return{
                    ...state,
                    loading:false                  
                }
        case actionTypes.ADD_MOVIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_DELETE_MOVIES:
                    return{
                        ...state,
                        loading:true,
    
                    };
        case actionTypes.DELETE_MOVIES_SUCCESS:
                let moviessd= state.movies.filter(movies1 => movies1._id !== action.id);
                return{
                    ...state,
                    loading:false,   
                    movies:moviessd,
                }
        case actionTypes.DELETE_MOVIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_SINGLE_MOVIES:
                    return{
                        ...state,
                        loading:true,    
                    };
        case actionTypes.SINGLE_MOVIES_SUCCESS:
            console.log(action.singlemovie)
                return{
                    ...state,
                    loading:false, 
                    singlemovie:action.singlemovie             
                }
        case actionTypes.SINGLE_MOVIES_FAILED:
                return{
                    ...state,
                    loading:false,
                    error:action.error
                }
        case actionTypes.INIT_UPDATE_MOVIES:
                    return{
                        ...state,
                        loading:true,
                    };
        case actionTypes.UPDATE_MOVIES_SUCCESS:
            let statesst = [...state.movies];
            statesst.map(order => {
                if(order._id === action.movies._id)
                {
                    order.moviename = action.movies.moviename;
                    order.movie_category=action.movies.movie_category;
                    order.releasedate=action.movies.releasedate;
                    order.director_name=action.movies.director_name;
                    order.Actors_name=action.movies.Actors_name; 
                    order.movie_description=action.movies.movie_description;
                    order.movie_type=action.movies.movie_type;
                    order.movie_logo=action.movies.movie_logo;
                    order.movie_status=action.movies.movie_status;
                    order.booking_status=action.movies.booking_status;                   
                }
            });
            console.log(action.singlestates);
                return{
                    ...state,
                    loading:false, 
                    movies:statesst             
                }
        case actionTypes.UPDATE_MOVIES_FAILED:
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