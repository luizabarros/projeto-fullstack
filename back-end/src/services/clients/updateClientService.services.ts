import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import Clients from "../../entities/clients.entity"
import { IClientUpdate } from "../../interfaces/clients.interface"
import { updateUserSerializer } from "../../serializers/clients.serializers"

const updateClientService = async (dataToUpdate: IClientUpdate, foundClient, reqID: string) => {
    try {
        const validatedDataToUpdate = await updateUserSerializer.validate(dataToUpdate, {
            abortEarly: false,
            stripUnknown: true
        })

        const clientRepository = AppDataSource.getRepository(Clients)

        await clientRepository.update(reqID, {
            email: validatedDataToUpdate.email || foundClient.email,
            fullName: validatedDataToUpdate.fullName || foundClient.fullName,
            phone: validatedDataToUpdate.phone || foundClient.phone,
        })

        const updatedClient = await clientRepository.findOneBy({
            id: reqID
        })

        return updatedClient
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default updateClientService