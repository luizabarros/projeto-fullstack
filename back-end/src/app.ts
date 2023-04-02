import "reflect-metadata"
import "express-async-errors"
import express from "express"
import clientsRoutes from "./routes/clients.routes"
import contactsRoutes from "./routes/contatcs.routes"
import errorHandler from "./errors/errorHandler"
import cors from "cors"
import { Request, Response } from "express"

const app = express()
app.use(express.json())

app.use(errorHandler)

app.use(cors())

app.use("/clients", clientsRoutes)
app.use("/contacts", contactsRoutes)

app.use(express.static("documentation"))
app.use("./", (req: Request, res: Response) => {
    res.render("index.html")
})

export default app