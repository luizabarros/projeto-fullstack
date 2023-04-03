import { useEffect, useState } from "react"
import { notifyError } from "../../toast"
import api from "../../services/api"
import Starter from "../Starter/Starter"
import Container from "."

interface Client {
    id: string,
    fullName: string,
    phone: string,
    isActive: boolean
}

interface Contact {
    fullName: string,
    phone: string,
    email: string
}

interface ClientDetails {
    id: string,
    fullName: string,
    phone: string,
    isActive: boolean,
    contacts: Contact[],
    email: string
}

const AllClients = () => {
    const [clients, setClients] = useState<Client[] | []>([])
    const [foundClient, setFoundClient] = useState<ClientDetails | null>(null)
    const [clientToBeDeletedID, setClientToBeDeletedID] = useState<string>("")
    const [clientDetails, setClientDetails] = useState<string>("")
    const [modal, setModal] = useState<boolean>(false)

    useEffect(() => {
        async function getClients() {
            try {
                const token = localStorage.getItem("@kenzieCompany:token")

                const response = await api.get("clients", {
                    headers: {
                        "Authorization": `Basic ${token}` 
                    }
                })

                setClients(response.data)
            } catch (error) {
                notifyError()
            }
        }
        getClients()
    }, [])
    
    useEffect(() => {
        async function deleteClient() {
            if (clientToBeDeletedID) {
                try {
                    const token = localStorage.getItem("@kenzieCompany:token")
    
                    await api.delete(`clients/${clientToBeDeletedID}`, {
                        headers: {
                            "Authorization": `Basic ${token}` 
                        }
                    })
                } catch (error) {
                    notifyError()
                }
            }
        }
        deleteClient()
    }, [clientToBeDeletedID])
    
    useEffect(() => {
        async function getClientProfile() {
            if (clientDetails) {
                try {
                    const token = localStorage.getItem("@kenzieCompany:token")
    
                    const client = await api.get(`clients/${clientDetails}`, {
                        headers: {
                            "Authorization": `Basic ${token}` 
                        }
                    })

                    console.log(client.data)
                    setFoundClient(client.data)
                } catch (error) {
                    notifyError()
                }
            }
        }
        getClientProfile()
    }, [clientDetails])

    function clientExpandedInfo(clientID: string) {
        setClientDetails(clientID)
        setModal(true)
    }

    return (
       <>
        <Starter/>

        <Container>
            {
                clients.map(client => {
                    return (
                        <li key={ client.id } id={ client.id }>
                            <h2>{ client.fullName }</h2>
                            <p>{ client.phone }</p>
                            <p>{ client.isActive ? "Ativo" : "Desativado" }</p>
                            <button onClick={() => setClientToBeDeletedID(client.id)}>Deletar</button>
                            <button onClick={() => clientExpandedInfo(client.id)}>Ver cliente</button>
                        </li>
                    )
                })
            }
        </Container>

        {
            modal 
            ? (
                <Container>
                    <div className="modal">
                        <li>
                            <h2>{ foundClient?.fullName }</h2>
                            <p>{ foundClient?.phone }</p>
                            <p>{ foundClient?.email }</p>
                            <p>{ foundClient?.isActive ? "Ativo" : "Desativado" }</p>
                            <ul>
                                {
                                    foundClient?.contacts.map(contact => {
                                        return (
                                            <li>
                                                <h2>{ contact?.fullName }</h2>
                                                <p>{ contact?.phone }</p>
                                                <p>{ contact?.email }</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <button onClick={() => setModal(false)}>Fechar</button>
                        </li>
                    </div>
                </Container>
            )
            : null
        }
       </>
    )
}

export default AllClients