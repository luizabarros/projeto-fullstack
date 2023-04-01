import { compare } from "bcryptjs"
import { IClientRequest, ILoginRequest } from "../../interfaces/clients.interface"
import { loginClientSerializer } from "../../serializers/clients.serializers"
import AppError  from "../../errors/AppError"
import jwt from "jsonwebtoken"
import "dotenv/config"

const createLoginService = async (login: ILoginRequest, foundClient: IClientRequest): Promise<{}> => {
    try {
        const validatedLogin = await loginClientSerializer.validate(login, {
            abortEarly: false,
            stripUnknown: true
        })
    
        const passwordMatch = await compare(validatedLogin.password, foundClient.password)
    
        if (!passwordMatch) {
            throw new AppError("Client or password invalid", 403)
        }
    
        const token = jwt.sign(
            {
                id: foundClient.id
            },
            process.env.SECRET_KEY,
            {
                subject: foundClient.id,
                expiresIn: "24h"
            }
        )
    
        return { token: token }
        
    } catch (error) {
        throw new AppError(error.message, 403)
    }

}

export default createLoginService