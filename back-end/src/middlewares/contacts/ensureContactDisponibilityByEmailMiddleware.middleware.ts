import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import Contacts from "../../entities/contacts.entity"
import { Request, Response, NextFunction } from "express"
import { IContactRequest } from "../../interfaces/contacts.interface"
import { createContactSerializer } from "../../serializers/contacts.serializers"

const ensureContactDisponibilityByEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactRequest: IContactRequest = req.body
        const contactRequestValidated = await createContactSerializer.validate(contactRequest, {
            stripUnknown: true,
            abortEarly: false
        })
        
        const contactsRepository = AppDataSource.getRepository(Contacts)
        const contact = await contactsRepository.findOneBy({ email: contactRequestValidated.email })
        
        if (contact) {
            throw new AppError("Email already registered.", 409)
        } 

        res.locals.contact = contactRequestValidated
        next()

    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default ensureContactDisponibilityByEmailMiddleware