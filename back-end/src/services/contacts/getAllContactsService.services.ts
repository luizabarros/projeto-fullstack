import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import Contacts from "../../entities/contacts.entity"

const getAllContactsService = async () => {
    try {
        const contactsRepository = AppDataSource.getRepository(Contacts)

        const allConctacts = await contactsRepository.find({
            relations: {
                client: true
            },
            withDeleted: true
        })

        return allConctacts
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default getAllContactsService