import * as yup from "yup"

const formSchema  = yup.object().shape({
    email: yup
        .string()
        .email("Email inválido")
        .required("Email obrigatório"),

    password: yup
        .string()
        // eslint-disable-next-line no-useless-escape
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Senha deve conter no mínimo 8 caracteres. Necessário ter letras, números e ao menos um símbolo")
        .required("Senha obrigatória"),
        

    confirmPassword: yup
        .string()
        .required("Confirmar senha é obrigatório")
        .oneOf([yup.ref("password")], "Confirmação de senha deve ser igual a senha"),

    fullName: yup
        .string()
        .required("Nome obrigatório"),

    phone: yup
        .string()
        .required("Telefone obrigatória"),
})

export default formSchema