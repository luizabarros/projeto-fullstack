import AppDataSource from "../../data-source"
import Contacts from "../../entities/contacts.entity"
import AppError from "../../errors/AppError"
import { IContactRequest } from "../../interfaces/contacts.interface"

const createContactsService = async (contactsRequestData: IContactRequest | any, clientID: string) => {
    try {
        const contactsRepository = AppDataSource.getRepository(Contacts)
        
        const clientContact = {...contactsRequestData, client: clientID}
        
        const newContact = contactsRepository.create(clientContact)
        await contactsRepository.save(newContact)

        return newContact
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default createContactsService 