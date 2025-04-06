const translateComment = async (req, res) => {
    try {
      const { commentId, targetLanguage } = req.body;
      
    
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
      
      const translatedText = await translateService.translate(comment.text, targetLanguage);
      
      return res.status(200).json({ originalText: comment.text, translatedText, language: targetLanguage });
    } catch (error) {
      console.error("Translation error:", error);
      return res.status(500).json({ message: "Error translating comment" });
    }
  };
  
  export default  translateComment ;
  