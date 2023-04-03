import { useEffect, useState } from "react"
import { notifyError, notifySuccess } from "../../toast"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import api from "../../services/api"
import formSchema from "./formSchema"
import Starter from "../Starter/Starter"

interface iFormData {
    email: string,
    phone: string,
    password: string,
    fullName: string,
    confirmPassword: string

}
const LoginClient = () => {
    const [login, setLogin] = useState<iFormData | null>(null)
    const navigate = useNavigate()

    const { 
        register, 
        handleSubmit, 
        formState: { errors } }
        = useForm<iFormData>( { resolver: yupResolver(formSchema) })

    const onSubmit = (data: iFormData) => setLogin(data)

    useEffect(() => {
        async function loginClient() {
            if (login) {
                try {
                    const response = await api.post("clients/login", login)

                    localStorage.setItem("@kenzieCompany:token", response.data.token)
                    api.defaults.headers.common.authorization = `Bearer ${response.data.token}`

                    notifySuccess()
                    navigate("/loginCliente")
                } catch (error) {
                    notifyError()
                }
            }
        }
        loginClient()
    }, [login])

    return (
        <>
            <Starter/>
            <section className="register">
                <div className="formWrapper">
                    <h1>Faça o login</h1>
                    <p className="suggestion">Rapido e grátis, vamos nessa</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
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

                        <button type="submit">Login</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LoginClient