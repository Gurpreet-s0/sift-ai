import jwt from "jsonwebtoken"
export default async function identifyUser(req, res, next) {
    const token = req.cookies.token
    let user
    if(!token){
        return res.status(400).json({
            message:"Token Not Provided"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
} 