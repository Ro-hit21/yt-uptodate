import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { translateComment } from '../../action/translation';

const TranslateButton = ({ commentId}) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  
  const translation = useSelector(state => 
    state.translations?.translations?.[commentId]?.text || ''
  );
  
  const handleTranslate = async () => {
    setIsLoading(true);
    try {
    
      await dispatch(translateComment(commentId, targetLanguage));
      setShowTranslation(true);
      
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="translation-container">
      {!showTranslation ? (
        <div className="translate-controls">
          <select 
            value={targetLanguage} 
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="hi">Hindi</option>
          
          </select>
          <button 
            onClick={handleTranslate} 
            disabled={isLoading}
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>
        </div>
      ) : (
        <div className="translated-text">
          <p>{translation}</p>
          <button onClick={() => setShowTranslation(false)}>Show Original</button>
        </div>
      )}
    </div>
  );
};

export default TranslateButton;
