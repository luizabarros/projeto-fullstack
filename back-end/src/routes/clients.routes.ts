import { Router } from "express"
import { createClientController, deleteClientController, getAllClientsController, loginClientController, updateClientController } from "../controllers/clients.controllers"
import ensureAuthMiddleware from "../middlewares/clients/ensureAuthMiddleware.middleware"
import ensureClientDisponibilityByEmailMiddleware from "../middlewares/clients/ensureClientDisponibilityByEmailMiddleware.middleware"
import ensureLoginIsCorrectMiddleware from "../middlewares/clients/ensureLoginIsCorrectMiddleware.middleware"
import ensureClientExistsByIDMiddleware from "../middlewares/clients/ensureClientExistsByIDMiddleware.middleware"
import ensureUserHasPermissionMiddleware from "../middlewares/clients/ensureUserHasPermissionMiddleware.middleware"

const clientsRoutes = Router()

clientsRoutes.post("", ensureClientDisponibilityByEmailMiddleware, createClientController)
clientsRoutes.post("/login", ensureLoginIsCorrectMiddleware, loginClientController)
clientsRoutes.get("", ensureAuthMiddleware, getAllClientsController)
clientsRoutes.patch("/:id", ensureClientExistsByIDMiddleware, ensureAuthMiddleware, ensureUserHasPermissionMiddleware, updateClientController)
clientsRoutes.delete("/:id", ensureClientExistsByIDMiddleware, ensureAuthMiddleware, ensureUserHasPermissionMiddleware, deleteClientController)

export default clientsRoutes