import { Router } from "express"
import { createContactsController, deleteContactController, getAllContactsController, loginContactController, uptadeContactController } from "../controllers/contacts.controllers"
import ensureAuthMiddleware from "../middlewares/clients/ensureAuthMiddleware.middleware"
import ensureContactExistsByIDMiddleware from "../middlewares/contacts/ensureContactExistsByIDMiddleware.middleware"
import ensureContactHasPermissionMiddleware from "../middlewares/contacts/ensureContactHasPermissionMiddleware.middleware"
import ensureContactDisponibilityByEmailMiddleware from "../middlewares/contacts/ensureContactDisponibilityByEmailMiddleware.middleware"
import ensureLoginIsCorrectMiddleware from "../middlewares/contacts/ensureLoginIsCorrectMiddleware.middleware"

const contactsRoutes = Router()

contactsRoutes.post("/login", ensureLoginIsCorrectMiddleware, loginContactController)
contactsRoutes.post("/:clientID", ensureAuthMiddleware, ensureContactDisponibilityByEmailMiddleware, createContactsController)
contactsRoutes.get("", ensureAuthMiddleware, getAllContactsController)
contactsRoutes.patch("/:contactID", ensureContactExistsByIDMiddleware, ensureAuthMiddleware, ensureContactHasPermissionMiddleware, uptadeContactController)
contactsRoutes.delete("/:contactID", ensureContactExistsByIDMiddleware, ensureAuthMiddleware, ensureContactHasPermissionMiddleware, deleteContactController)

export default contactsRoutes