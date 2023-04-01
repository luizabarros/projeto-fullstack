import Clients from "../../entities/clients.entity"
import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import { IClientRequest } from "../../interfaces/clients.interface"

const createClientService = async (client: Omit<IClientRequest, "id">) => {
    try {
        const clientRepository = AppDataSource.getRepository(Clients)
    
        const clientCreated = clientRepository.create(client)
        await clientRepository.save(clientCreated)

        delete clientCreated.password
        return clientCreated
    } catch (error) {
        throw new AppError(error.message)
    }
}

export default createClientService