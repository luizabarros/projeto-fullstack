import { useEffect, useState } from "react"
import { notifyError, notifySuccess } from "../../toast"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import api from "../../services/api"
import Starter from "../Starter/Starter"
import formSchema from "./formSchema"

interface iFormData {
    email: string,
    phone: string,
    password: string,
    fullName: string,
    confirmPassword: string

}
const RegisterContact = () => {
    const [createUser, setCreateUser] = useState<iFormData | null>(null)
    const navigate = useNavigate()

    const { 
        register, 
        handleSubmit, 
        formState: { errors } }
        = useForm<iFormData>( { resolver: yupResolver(formSchema) })

    const onSubmit = (data: iFormData) => setCreateUser(data)

    useEffect(() => {
        async function postContact() {
            if (createUser) {
                try {
                    const token = localStorage.getItem("@kenzieCompany:token")
                    const clientID = localStorage.getItem("@kenzieCompany:clientID")

                    await api.post(`contacts/${clientID}`, createUser, {
                        headers: {
                            "Authorization": `Basic ${token}` 
                        }
                    })
                    notifySuccess()
                } catch (error) {
                    notifyError()
                }
            }
        }
        postContact()
    }, [createUser])

    return (
        <>
            <Starter/>
            <section className="register">
                <div className="formWrapper">
                    <h1>Crie sua conta</h1>
                    <p className="suggestion">Rapido e grátis, vamos nessa</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="fullName">Nome</label>
                        <input
                        type="text"
                        id="fullName"
                        placeholder="Seu nome"
                        {...register("fullName")}>
                        </input>
                        <p className="error">{errors.fullName?.message}</p>
            
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        placeholder="Seu email"
                        {...register("email")}>
                        </input>
                        <p className="error">{errors.email?.message}</p>
            
                        <label htmlFor="password">Senha</label>
                        <input
                        type="password"
                        id="password"
                        placeholder="Sua senha"
                        {...register("password")}>
                        </input>
                        <p className="error">{errors.password?.message}</p>
            
                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Sua confirmação de senha"
                        {...register("confirmPassword")}>
                        </input>
                        <p className="error">{errors.confirmPassword?.message}</p>
            
                        <label htmlFor="phone">Telefone</label>
                        <input
                        type="text"
                        id="phone"
                        placeholder="Seu telefone"
                        {...register("phone")}>
                        </input>
                        <p className="error">{errors.phone?.message}</p>

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default RegisterContact