import { Request, Response, NextFunction } from "express"
import AppError from "../../errors/AppError"

const ensureUserHasPermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const reqID = req.params.id
    const decoded = res.locals.decoded

    if (decoded.id === reqID) {
        return next()
    }
    throw new AppError("User not authorized.", 403)
}

export default ensureUserHasPermissionMiddleware