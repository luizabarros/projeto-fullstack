import * as yup from "yup"
import { SchemaOf } from "yup"
import { IClientRequest, IClientUpdate, ILoginRequest } from "../interfaces/clients.interface"

const createClientSerializer: SchemaOf<Omit<IClientRequest, "id">> = yup.object().shape({
    email: yup.string().email().required(),
    fullName: yup.string().required(),
    phone: yup.string().required(),
    password: yup.string().required()
})

const updateUserSerializer: SchemaOf<IClientUpdate> = yup.object().shape({
    email: yup.string().email(),
    fullName: yup.string(),
    phone: yup.string(),
})

const loginClientSerializer: SchemaOf<ILoginRequest> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

export {
    createClientSerializer,
    loginClientSerializer,
    updateUserSerializer
}