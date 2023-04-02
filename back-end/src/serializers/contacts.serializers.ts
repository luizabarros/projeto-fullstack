import * as yup from "yup"
import { SchemaOf } from "yup"
import { IContactRequest } from "../interfaces/contacts.interface"

const createContactSerializer: SchemaOf<IContactRequest> = yup.object().shape({
    fullName: yup.string(),
    email: yup.string(), 
    phone: yup.string(), 
    password: yup.string(),
})

export {
    createContactSerializer
}