import { Request, Response, NextFunction } from "express"
import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import Clients from "../../entities/clients.entity"
import { IClientResponse } from "../../interfaces/clients.interface"

const ensureClientExistsByIDMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const reqID: string = req.params.id

    const clientRepository = AppDataSource.getRepository(Clients)

    try {
        const client: IClientResponse = await clientRepository.findOneBy({
            id: reqID
        })
        
        if (!client || !client.isActive) {
            throw new AppError("Client not found.")
        } else if (client && client.isActive) {
            res.locals.foundClient = client
            return next()
        }
        
    } catch (error) {
        throw new AppError("Invalid ID.")
    }
    
}

export default ensureClientExistsByIDMiddleware