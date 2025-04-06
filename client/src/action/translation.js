export const TRANSLATE_COMMENT_REQUEST = 'TRANSLATE_COMMENT_REQUEST';
export const TRANSLATE_COMMENT_SUCCESS = 'TRANSLATE_COMMENT_SUCCESS';
export const TRANSLATE_COMMENT_FAILURE = 'TRANSLATE_COMMENT_FAILURE';

export const translateComment = (commentId, targetLanguage) => async (dispatch) => {
  dispatch({ type: TRANSLATE_COMMENT_REQUEST });
  
  try {
    const response = await fetch('/api/comments/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentId, targetLanguage }),
    });
    
    if (!response.ok) {
      throw new Error('Translation failed');
    }
    
    const data = await response.json();
    
    dispatch({
      type: TRANSLATE_COMMENT_SUCCESS,
      payload: {
        commentId,
        translatedText: data.translatedText,
        language: targetLanguage
      }
    });
    
    return data;
  } catch (error) {
    dispatch({
      type: TRANSLATE_COMMENT_FAILURE,
      payload: error.message
    });
    throw error;
  }
};