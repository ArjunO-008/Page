




const handleGoogleAuth = async(req,res)=>{
    try{
        const credential = req.body.credential;
        if(!credential || !(typeof credential === "string") || !credential.trim()){
            return res.status(400).json({
                success:false,
                message:"Bad Request: Credential is missing from the request body.",
            });
        }

    }catch (err) {
        console.error("Internal Server Error:",err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
        
    }


}




export default handleGoogleAuth;