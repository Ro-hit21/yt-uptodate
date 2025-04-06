import mongoose from "mongoose";

const commentschema = mongoose.Schema({
    videoid: String,
    userid: String,
    
    commentbody: String,
    usercommented: String,
  
    text: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            // Regex to prevent special characters (adjust as needed)
            return !/[^\w\s.,!?()']/.test(v);
          },
          message: "Comments cannot contain special characters"
        }
      },
      likes: {
        type: [String],
        default: []
      },
      dislikes: {
        type: [String],
        default: []
      },
      userLocation: {
        city: String,
        country: String
      },
      isRemoved: {
        type: Boolean,
        default: false
      },
      commentedon: { type: Date, default: Date.now }
     
});
commentschema.methods.shouldRemove = function() {
    return this.dislikes.length >= 2;
  };
export default mongoose.model("Comments", commentschema)