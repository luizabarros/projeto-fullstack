import Clients from "../../entities/clients.entity"
import AppDataSource from "../../data-source"

const getAllClientsService = async () => {
    const clientRepository = AppDataSource.getRepository(Clients)

    const clients = clientRepository.find()
    return clients
}

export default getAllClientsService