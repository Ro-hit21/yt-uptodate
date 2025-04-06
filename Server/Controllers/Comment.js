import comment from "../Models/comment.js";
import mongoose from "mongoose";
import geoip from 'geoip-lite';


export const postcomment = async (req, res) => {

    const commentdata = req.body
    const postcomment = new comment(commentdata)
    
    try {
        
        await postcomment.save()
        res.status(200).json("posted the comment")
       
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const getcomment = async (req, res) => {
    try {
        
        const commentlist = await comment.find()
        res.status(200).send(commentlist)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const deletecomment = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comments unavailable..")
    }
    try {
        await comment.findByIdAndDelete(_id);
        res.status(200).json({ message: "deleted comment" })
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const editcomment = async (req, res) => {
    const { id: _id } = req.params;
    const { commentbody } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comments unavailable..")
    }
    try {
        const updatecomment = await comment.findByIdAndUpdate(
            _id,
            { $set: { "commentbody": commentbody } }
        )
        res.status(200).json(updatecomment)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const createComment = async (req, res) => {
    try {
      const { videoId, text } = req.body;
      const userId = req.userId; 
      
    
      if (/[^\w\s.,!?()']/.test(text)) {
        return res.status(400).json({ message: "Comments cannot contain special characters" });
      }
      
   
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const geo = geoip.lookup(ip);
      const userLocation = geo ? { city: geo.city, country: geo.country } : { city: "Unknown", country: "Unknown" };
      
      const newComment = new Comment({
        videoId,
        userId,
        text,
        userLocation
      });
      
      await newComment.save();
      
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  };
  

  export const dislikeComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const userId = req.userId;
      
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
   
      if (!comment.dislikes.includes(userId)) {
        comment.dislikes.push(userId);
        
        
        comment.likes = comment.likes.filter(id => id !== userId);
        
        
        if (comment.dislikes.length >= 2) {
          comment.isRemoved = true;
        }
        
        await comment.save();
      }
      
      res.status(200).json(comment);
    } catch (error) {
      console.error("Error disliking comment:", error);
      res.status(500).json({ message: "Failed to dislike comment" });
    }
  };




