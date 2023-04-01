import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import Clients from "../../entities/clients.entity"
import { Request, Response, NextFunction } from "express"
import { createClientSerializer } from "../../serializers/clients.serializers"
import { IClientRequest } from "../../interfaces/clients.interface"

const ensureClientDisponibilityByEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientRequest: Omit<IClientRequest, "id"> = req.body
        const clientRequestValidated = await createClientSerializer.validate(clientRequest, {
            stripUnknown: true,
            abortEarly: false
        })
        
        const clientsRepository = AppDataSource.getRepository(Clients)
        const client = await clientsRepository.findOneBy({ email: clientRequestValidated.email })
        
        if (client) {
            throw new AppError("Email already registered.", 409)
        } 
        res.locals.client = clientRequestValidated
        next()

    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default ensureClientDisponibilityByEmailMiddleware