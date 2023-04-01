import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"
import AppError  from "../../errors/AppError"
import { IDecoded } from "../../interfaces/clients.interface"

const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const reqID = req.params.id
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
}

export default ensureAuthMiddleware