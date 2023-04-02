import { Request, Response, NextFunction } from "express"
import { IDecoded } from "../../interfaces/clients.interface"
import jwt from "jsonwebtoken"
import "dotenv/config"
import AppError  from "../../errors/AppError"

const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization
        
        if (!token) {
            throw new AppError("Invalid token")
        }
        
        token = token.split(" ")[1]
    
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded: IDecoded) => {
            if (error) {
                throw new AppError("Invalid token")
            }
    
            res.locals.decoded = decoded
            next()
        })
        
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default ensureAuthMiddleware