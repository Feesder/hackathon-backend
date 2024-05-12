import jwt from "jsonwebtoken";
import token from "../model/Token.js";
import Token from "../model/Token.js";
import User from "../model/User.js";

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, "jwt-secret-key", {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, "jwt-refresh-secret-key", {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})
        if (tokenData) {
            tokenData.refresh = refreshToken;
            await Token.findOneAndUpdate(tokenData._id, {...tokenData});
        }

        const token = await Token.create({user: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        console.log(refreshToken)
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, "jwt-secret-key");
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, "jwt-refresh-secret-key");
            return userData;
        } catch (e) {
            return null;
        }
    }
}

export default new TokenService();