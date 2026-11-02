import authServices from '../services/auth.service.js';


const handleGoogleAuth = async(req,res)=>{
    try{
        const credential = req?.body?.credential;
        if(!credential || !(typeof credential === "string") || !credential.trim()){
            return res.status(400).json({
                success:false,
                message:"Bad Request: Credential is missing from the request body.",
            });
        }

        const data = await authServices.verifyGoogleIdToken(credential);
        const user = await authServices.findOrCreateUser(data.user);        
        return res.status(200).json(user);       

    }catch (err) {
        console.error("Internal Server Error:",err);
        return res.status(err.status || 500).json({
            success:false,
            message:err.message,
        })
        
    }


}

export default handleGoogleAuth;