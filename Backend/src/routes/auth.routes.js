import { Router } from "express";

const router = Router();

router.route('/google').post((req,res)=>{
    res.send("Successfull Routes to Google Auth");
})
export default router