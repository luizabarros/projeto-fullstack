import { Request, Response } from "express"
import { IClientResponse, ILoginRequest } from "../interfaces/clients.interface"
import { IContactRequest, IContactResponse, IContactUpdate } from "../interfaces/contacts.interface"
import createLoginService from "../services/clients/createLoginService.services"
import createContactsService from "../services/contacts/createContactsService.services"
import deleteContactService from "../services/contacts/deleteContactService.services"
import getAllContactsService from "../services/contacts/getAllContactsService.services"
import updateContactService from "../services/contacts/updateContactService.services"

const createContactsController = async (req: Request, res: Response) => {
    const clientID: string = req.params.clientID
    const contactsRequestData: IContactRequest = req.body

    const contactCreated = await createContactsService(contactsRequestData, clientID)
    return res.status(201).json(contactCreated)
}

const getAllContactsController = async (req: Request, res: Response) => {
    const allContacts = await getAllContactsService()
    return res.status(200).json(allContacts)
}

const uptadeContactController = async (req: Request, res: Response) => {
    const dataToUpdate: IContactUpdate = req.body
    const foundContact: IClientResponse = res.locals.foundContact

    const updatedContact = await updateContactService(dataToUpdate, foundContact, req.params.contactID)
    return res.status(200).json(updatedContact)
}

const loginContactController = async (req: Request, res: Response) => {
    const foundContact: IContactResponse = res.locals.foundContact
    const contactRequestValidated: ILoginRequest = res.locals.contactRequestValidated

    const token = await createLoginService(contactRequestValidated, foundContact)
    return res.status(200).json(token)
}

const deleteContactController = async (req: Request, res: Response) => {
    const contactID: string = req.params.contactID

    await deleteContactService(contactID)
    return res.status(204).send()
}

export {
    createContactsController,
    getAllContactsController,
    uptadeContactController,
    loginContactController,
    deleteContactController
}