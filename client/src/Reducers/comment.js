import {
    LIKE_COMMENT_REQUEST,
    LIKE_COMMENT_SUCCESS,
    LIKE_COMMENT_FAILURE,
    DISLIKE_COMMENT_REQUEST,
    DISLIKE_COMMENT_SUCCESS,
    DISLIKE_COMMENT_FAILURE
   
  } from '../action/comment.js';
  
  
  const initialState = {
    comments: [],
    loading: false,
    error: null
   
  };




const commentreducer=(state={data:null},action)=>{
    switch (action.type) {
        case LIKE_COMMENT_REQUEST:
            return {
              ...state,
              loading: true,
              error: null
            };
          
          case LIKE_COMMENT_SUCCESS:
            return {
              ...state,
              loading: false,
              comments: state.comments.map(comment => 
                comment._id === action.payload._id ? action.payload : comment
              )
            };
          
          case LIKE_COMMENT_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload
            };
          
          
          case DISLIKE_COMMENT_REQUEST:
            return {
              ...state,
              loading: true,
              error: null
            };
          
          case DISLIKE_COMMENT_SUCCESS:
            return {
              ...state,
              loading: false,
              comments: state.comments.map(comment => 
               
                comment._id === action.payload._id ? action.payload : comment
              ).filter(comment => 
               
                !comment.isRemoved
              )
            };
          
          case DISLIKE_COMMENT_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload
            };
        case "POST_COMMENT":
          return {...state};
        case "EDIT_COMMENT":
            return {...state};
        case "FETCH_ALL_COMMENTS":
            return {...state,data:action.payload}
            case 'REMOVE_COMMENT':
                return state.filter(comment => comment._id !== action.payload);
        default:
            return state;
    }
}
export default commentreducer