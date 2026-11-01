import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const oauth2client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
);

const verifyGoogleIdToken = async (credential) => {
    try {
        const loginTicket = await oauth2client.verifyIdToken({
            idToken: credential,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = loginTicket.getPayload();

        if(!payload?.sub || !payload?.email || !payload?.email_verified){
            const err = new Error("Unauthorized: Invalid Google Token");
            err.status = 401;
            err.success = false;
            throw err;
        }

        return {
            success: true,
            user: {
                sub: payload?.sub,
                email: payload?.email,
                email_verified:payload?.email_verified,
                name: payload?.name,
                picture: payload?.picture,
            }
        }

    } catch (err) {
        console.error("Google Token Verification Failed",err);
        err.status = err.status ?? 500;
        err.message = err.message ?? "Google Token Verification Failed";
        throw err;       
    }
}

export default verifyGoogleIdToken;