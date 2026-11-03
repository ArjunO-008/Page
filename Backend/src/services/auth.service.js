import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken';

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
        err.status = err.status ?? 500;
        err.message = err.message ?? "Google Token Verification Failed";
        throw err;
    }
}

const findOrCreateUser = async (verifiedData) => {
    try {
        const user = await User.findOne({ googleSub: verifiedData.sub });
        if (user) return user;

        const newUser = await User.create({
            googleSub: verifiedData.sub,
            email: verifiedData.email,
            displayName: verifiedData.name,
            avatarUrl: verifiedData.picture || undefined,
        });

        return newUser;
    } catch (err) {
        err.status = err.status ?? 500;
        err.message = err.message ?? "MongoDB Atlas Error";
        throw err;

    }

}

const generateAccessToken = (userData) => {
    const payload = {
        sub: userData._id.toString(),
    }
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: '15m',
            algorithm: 'HS256',
            issuer: "page-api",
            audience: "page-api",
        }
    )

    return accessToken;
}


const authServices = {
    verifyGoogleIdToken,
    findOrCreateUser,
    generateAccessToken,
}

export default authServices;

