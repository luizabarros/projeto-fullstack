import { Route, Routes } from "react-router-dom"
import AllClients from "../pages/AllClients/AllClients"
import PostClient from "../pages/PostClient/PostClient"
import LoginClient from "../pages/LoginCliente/LoginCliente"

const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<PostClient/>}/>
            <Route path="/todosClientes" element={ <AllClients/> }/>
            <Route path="/loginCliente" element={<LoginClient/>}/>
        </Routes>
    )
}

export default RoutesMain