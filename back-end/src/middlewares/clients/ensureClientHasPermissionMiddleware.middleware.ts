import { Request, Response, NextFunction } from "express"
import AppError from "../../errors/AppError"

const ensureClientHasPermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqID = req.params.id
        const decoded = res.locals.decoded

        if (decoded.id === reqID) {
            return next()
        }
        throw new AppError("Client not authorized.", 403)
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default ensureClientHasPermissionMiddleware