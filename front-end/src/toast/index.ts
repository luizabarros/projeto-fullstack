import { toast } from "react-toastify"

export const notifySuccess = () => toast.success("Operação realizada com sucesso!")
export const notifyError = () => toast.error("Ops! Algo deu errado")