import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        console.log(token + " asfadsf ");
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;