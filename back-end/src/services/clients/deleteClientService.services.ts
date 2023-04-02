import AppDataSource from "../../data-source"
import Clients from "../../entities/clients.entity"
import AppError from "../../errors/AppError"

const deleteClientService = async (reqID: string): Promise<void> => {
    try {
        const clientRepository = AppDataSource.getRepository(Clients)
    
        const foundClient = await clientRepository.findOneBy({
            id: reqID
        })
        
        await clientRepository.softDelete(foundClient.id)
        await clientRepository.save({...foundClient, isActive: false}) 
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default deleteClientService