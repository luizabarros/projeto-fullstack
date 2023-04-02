import { Request, Response } from "express"
import { IClientRequest, IClientResponse, IClientUpdate } from "../interfaces/clients.interface"
import createClientService from "../services/clients/createClientService.services"
import createLoginService from "../services/clients/createLoginService.services"
import deleteClientService from "../services/clients/deleteClientService.services"
import getAllClientsService from "../services/clients/getAllClientsService.services"
import getClientService from "../services/clients/getClientService.controllers"
import updateClientService from "../services/clients/updateClientService.services"

const createClientController = async (req: Request, res: Response) => {
    const client: Omit<IClientRequest, "id"> = res.locals.client

    const clientCreated = await createClientService(client)
    return res.status(201).json(clientCreated)
}

const loginClientController = async (req: Request, res: Response) => {
    const foundClient: IClientResponse = res.locals.foundClient
    const clientRequestValidated: IClientRequest = res.locals.clientRequestValidated

    const token = await createLoginService(clientRequestValidated, foundClient)
    return res.status(200).json(token)
}

const getAllClientsController = async (req: Request, res: Response) => {
    const allClients = await getAllClientsService()
    return res.status(200).json(allClients)
}

const updateClientController = async (req: Request, res: Response) => {
    const dataToUpdate: IClientUpdate = req.body
    const foundClient: IClientResponse = res.locals.foundClient

    const updatedClient = await updateClientService(dataToUpdate, foundClient, req.params.id)
    return res.status(200).json(updatedClient)
}

const deleteClientController = async (req: Request, res: Response) => {
    await deleteClientService(req.params.id)
    return res.status(204).send()
}

const getClientController = async (req: Request, res: Response) => {
    const foundClient = await getClientService(req.params.id)
    return res.status(200).json(foundClient)
}

export {
    createClientController,
    loginClientController,
    getAllClientsController,
    updateClientController,
    deleteClientController,
    getClientController
}