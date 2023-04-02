interface IClientRequest {
    id: string,
    email: string,
    fullName: string,
    phone: string,
    password: string
}

interface IClientResponse {
    id: string,
    email: string,
    fullName: string,
    phone: string,
    password: string,
    createdOn: Date,
    updatedAt: Date,
    deletedAt: Date,
    isActive: boolean,
}

interface ILoginRequest {
    email: string,
    password: string
}

interface IDecoded {
    id: string
}

interface IClientUpdate {
    email?: string,
    fullName?: string,
    phone?: string,
}

export {
    IClientRequest,
    ILoginRequest,
    IDecoded,
    IClientResponse,
    IClientUpdate
}