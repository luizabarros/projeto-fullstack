interface IContactRequest {
    email: string,
    fullName: string,
    phone: string,
    password: string
}

interface IContactResponse {
    id: string,
    email: string,
    fullName: string,
    password: string,
    phone: string,
    createdOn: Date,
    updatedAt: Date,
    deletedAt: Date,
    isActive: boolean,
}

interface IContactUpdate {
    email?: string,
    fullName?: string,
    phone?: string,
}

export {
    IContactRequest,
    IContactResponse,
    IContactUpdate
}