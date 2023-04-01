import AppDataSource from "../../data-source"
import Clients from "../../entities/clients.entity"

const deleteClientService = async (reqID: string): Promise<void> => {
    const clientRepository = AppDataSource.getRepository(Clients)

    const foundClient = await clientRepository.findOneBy({
        id: reqID
    })
    
    await clientRepository.softDelete(foundClient.id)
    await clientRepository.save({...foundClient, isActive: false}) 
}

export default deleteClientService