import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import { Request, Response, NextFunction } from "express"
import { loginClientSerializer } from "../../serializers/clients.serializers"
import { ILoginRequest } from "../../interfaces/clients.interface"
import Contacts from "../../entities/contacts.entity"

const ensureLoginIsCorrectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactRequest: ILoginRequest = req.body
        const contactRequestValidated = await loginClientSerializer.validate(contactRequest, {
            stripUnknown: true,
            abortEarly: false
        })
        
        const contact = await AppDataSource.createQueryBuilder()
        .where("contacts.email = :contactEmail", { contactEmail: contactRequestValidated.email })
        .select()
        .from(Contacts, "contacts")
        .getRawOne()

        if (contact) {
            res.locals.contactRequestValidated = contactRequestValidated
            res.locals.foundContact = contact
            next()
        } else {
            throw new AppError("Contact invalid.", 401)
        }

    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default ensureLoginIsCorrectMiddleware