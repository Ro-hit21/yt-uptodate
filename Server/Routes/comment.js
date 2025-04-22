import express from "express"

import { postcomment,getcomment,deletecomment,editcomment,createComment,
    dislikeComment } from "../Controllers/Comment.js"
import auth from "../middleware/auth.js"
const router=express.Router()

router.post("/post",auth,postcomment)
router.get('/get',getcomment)
router.delete('/delete/:id',auth,deletecomment)
router.patch('/edit/:id',auth,editcomment)
router.post('/', auth, createComment);
router.put('/dislike/:id', auth, dislikeComment);



export default router