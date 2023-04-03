import * as yup from "yup"

const formSchema  = yup.object().shape({
    email: yup
        .string()
        .email("Email inválido")
        .required("Email obrigatório"),

    password: yup
        .string()
        .required("Senha obrigatória"),
})

export default formSchema