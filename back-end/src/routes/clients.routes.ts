import { Router } from "express"
import { createClientController, deleteClientController, getAllClientsController, getClientController, loginClientController, updateClientController } from "../controllers/clients.controllers"
import ensureAuthMiddleware from "../middlewares/clients/ensureAuthMiddleware.middleware"
import ensureClientDisponibilityByEmailMiddleware from "../middlewares/clients/ensureClientDisponibilityByEmailMiddleware.middleware"
import ensureLoginIsCorrectMiddleware from "../middlewares/clients/ensureLoginIsCorrectMiddleware.middleware"
import ensureClientExistsByIDMiddleware from "../middlewares/clients/ensureClientExistsByIDMiddleware.middleware"
import ensureClientHasPermissionMiddleware from "../middlewares/clients/ensureClientHasPermissionMiddleware.middleware"

const clientsRoutes = Router()

clientsRoutes.post("", ensureClientDisponibilityByEmailMiddleware, createClientController)
clientsRoutes.post("/login", ensureLoginIsCorrectMiddleware, loginClientController)
clientsRoutes.get("", ensureAuthMiddleware, getAllClientsController)
clientsRoutes.patch("/:id", ensureClientExistsByIDMiddleware, ensureAuthMiddleware, ensureClientHasPermissionMiddleware, updateClientController)
clientsRoutes.delete("/:id", ensureClientExistsByIDMiddleware, ensureAuthMiddleware, ensureClientHasPermissionMiddleware, deleteClientController)
clientsRoutes.get("/:id", ensureClientExistsByIDMiddleware, ensureAuthMiddleware, getClientController)

export default clientsRoutes