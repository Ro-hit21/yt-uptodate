import * as api from "../Api";

export const editcomment=(commentdata)=>async(dispatch)=>{
    try {
        const {id,commentbody}=commentdata
        const {data}=await api.editcomment(id,commentbody)
        dispatch({type:"EDIT_COMMENT",payload:data})
        dispatch(getallcomment())
    } catch (error) {
        console.log(error)
    }
}

export const postcomment=(commentdata)=>async(dispatch)=>{
    try {
        const {data}=await api.postcomment(commentdata)
        dispatch({type:"POST_COMMENT",payload:data})
        dispatch(getallcomment())
    } catch (error) {
        console.log(error)
    }
}
export const getallcomment=()=>async(dispatch)=>{
    try {
        const {data}=await api.getallcomment()
        // console.log(data)
        dispatch({type:"FETCH_ALL_COMMENTS",payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deletecomment=(id)=>async(dispatch)=>{
    try {
        await api.deletecomment(id)
        dispatch(getallcomment())
    } catch (error) {
        console.log(error)
    }
}


export const DISLIKE_COMMENT_REQUEST = 'DISLIKE_COMMENT_REQUEST';
export const DISLIKE_COMMENT_SUCCESS = 'DISLIKE_COMMENT_SUCCESS';
export const DISLIKE_COMMENT_FAILURE = 'DISLIKE_COMMENT_FAILURE';


export const dislikeComment = (commentId) => async (dispatch) => {
  dispatch({ type: DISLIKE_COMMENT_REQUEST });
  
  try {
    const response = await fetch(`/api/comments/${commentId}/dislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to dislike comment');
    }
    
    const data = await response.json();
    
    dispatch({
      type: DISLIKE_COMMENT_SUCCESS,
      payload: data
    });
    
    return data;
  } catch (error) {
    dispatch({
      type: DISLIKE_COMMENT_FAILURE,
      payload: error.message
    });
    throw error;
  }
};

export const LIKE_COMMENT_REQUEST = 'LIKE_COMMENT_REQUEST';
export const LIKE_COMMENT_SUCCESS = 'LIKE_COMMENT_SUCCESS';
export const LIKE_COMMENT_FAILURE = 'LIKE_COMMENT_FAILURE';


export const likeComment = (commentId) => async (dispatch) => {
  dispatch({ type: LIKE_COMMENT_REQUEST });
  
  try {
    const response = await fetch(`/api/comments/${commentId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
       
    });
    
    if (!response.ok) {
      throw new Error('Failed to like comment');
    }
    
    const data = await response.json();
    
    dispatch({
      type: LIKE_COMMENT_SUCCESS,
      payload: data
    });
    
    return data;
  } catch (error) {
    dispatch({
      type: LIKE_COMMENT_FAILURE,
      payload: error.message
    });
    
    throw error;
  }
};