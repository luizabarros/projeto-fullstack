import Clients from "../../entities/clients.entity"
import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"

const getClientService = async (clientID: string) => {
    try {
        const clientsRepository = AppDataSource.getRepository(Clients)
    
        const foundClient = await clientsRepository.findOne({
            where: {
                id: clientID
            },
            relations: {
                contacts: true
            },
            withDeleted: true
        })
    
        if (clientID !== foundClient.id) {
            throw new AppError("Client invalid", 403)
        }
    
        return foundClient
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default getClientService