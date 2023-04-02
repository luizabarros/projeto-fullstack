import { Request, Response, NextFunction } from "express"
import AppError from "../../errors/AppError"
import AppDataSource from "../../data-source"
import Contacts from "../../entities/contacts.entity"

const ensureContactExistsByIDMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqID: string = req.params.contactID
    
        const contactRepository = AppDataSource.getRepository(Contacts)

        const contact = await contactRepository.findOneBy({
            id: reqID
        })
        
        if (!contact || !contact.isActive) {
            throw new AppError("Contact not found.")
        } else if (contact && contact.isActive) {
            res.locals.foundContact = contact
            return next()
        }
        
    } catch (error) {
        throw new AppError("Invalid ID.")
    }
    
}

export default ensureContactExistsByIDMiddleware