import Clients from "../../entities/clients.entity"
import AppDataSource from "../../data-source"
import AppError from "../../errors/AppError"

const getAllClientsService = async () => {
    try {
        const clientRepository = AppDataSource.getRepository(Clients)
    
        const clients = clientRepository.find()
        return clients
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default getAllClientsService