import AppDataSource from "../../data-source"
import Contacts from "../../entities/contacts.entity"
import AppError from "../../errors/AppError"

const deleteContactService = async (contactID: string) => {
    try {
        const contactsRepository = AppDataSource.getRepository(Contacts)

        const foundContact = await contactsRepository.findOne({
            where: {
                id: contactID
            },
            relations: {
                client: true
            }
        })

        await contactsRepository.softDelete(foundContact.id)
        await contactsRepository.save({...foundContact, isActive: false}) 
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default deleteContactService 