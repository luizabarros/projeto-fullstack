import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import Contacts from "../../entities/contacts.entity"
import { updateUserSerializer } from "../../serializers/clients.serializers"
import { IContactUpdate } from "../../interfaces/contacts.interface"

const updateContactService = async (dataToUpdate: IContactUpdate, foundContact, reqID: string) => {
    try {
        const validatedDataToUpdate = await updateUserSerializer.validate(dataToUpdate, {
            abortEarly: false,
            stripUnknown: true
        })

        const contactRepository = AppDataSource.getRepository(Contacts)

        await contactRepository.update(reqID, {
            email: validatedDataToUpdate.email || foundContact.email,
            fullName: validatedDataToUpdate.fullName || foundContact.fullName,
            phone: validatedDataToUpdate.phone || foundContact.phone,
        })

        const updatedContact = await contactRepository.findOneBy({
            id: reqID
        })

        return updatedContact
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default updateContactService