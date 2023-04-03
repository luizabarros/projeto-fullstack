import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import Container from "."
import { useNavigate } from "react-router-dom"

const Starter = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <header>
                <h1>Kenzie Company</h1>

                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                                Clientes
                            </Button>

                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={() => navigate("/")}>Cadastrar</MenuItem>

                                <MenuItem onClick={() => navigate("/loginCliente")}>Login</MenuItem>

                                <MenuItem onClick={() => navigate("/todosClientes")}>Todos clientes</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
                
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="contained" {...bindTrigger(popupState)}>
                                Contatos
                            </Button>

                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}>Deletar</MenuItem>
                                <MenuItem onClick={() => navigate("/cadastroContato")}>Cadastrar</MenuItem>
                                <MenuItem onClick={popupState.close}>Login</MenuItem>
                                <MenuItem onClick={popupState.close}>Todos contatos</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </header>
        </Container>
    )
}

export default Starter