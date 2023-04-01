import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import Clients from "../../entities/clients.entity"
import { Request, Response, NextFunction } from "express"
import { loginClientSerializer } from "../../serializers/clients.serializers"
import { ILoginRequest } from "../../interfaces/clients.interface"

const ensureLoginIsCorrectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientRequest: ILoginRequest = req.body
        const clientRequestValidated = await loginClientSerializer.validate(clientRequest, {
            stripUnknown: true,
            abortEarly: false
        })
        
        const client = await AppDataSource.createQueryBuilder()
        .where("clients.email = :clientEmail", { clientEmail: clientRequestValidated.email })
        .select()
        .from(Clients, "clients")
        .getRawOne()

        if (client) {
            res.locals.clientRequestValidated = clientRequestValidated
            res.locals.foundClient = client
            next()
        } else {
            throw new AppError("Client invalid.", 401)
        }

    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default ensureLoginIsCorrectMiddleware