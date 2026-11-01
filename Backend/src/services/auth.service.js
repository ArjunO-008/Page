import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/user.model.js'

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

        if (!payload?.sub || !payload?.email || !payload?.email_verified) {
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
                email_verified: payload?.email_verified,
                name: payload?.name,
                picture: payload?.picture,
            }
        }

    } catch (err) {
        console.error("Google Token Verification Failed", err);
        err.status = err.status ?? 500;
        err.message = err.message ?? "Google Token Verification Failed";
        throw err;
    }
}

const findOrCreateUser = async (verifiedData) => {
    try {
            const user = await User.findOne({googleSub:verifiedData.sub});
            if(user) return user;

            const newUser = await User.create({
                googleSub:verifiedData.sub,
                email:verifiedData.email,
                displayName:verifiedData.name,
                avatarUrl:verifiedData.picture || verifiedData.email.charAt(0).toUpperCase(),
            })

            if(!newUser){
                const err = new Error();
                err.status = 400;
                err.success = false;
                throw err;

            }

            return newUser;
    } catch (err) {

    }

}

export default { verifyGoogleIdToken, findOrCreateUser };
