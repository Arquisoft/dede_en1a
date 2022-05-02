import {Router} from "express";
import {solidFetch} from "./solidFetch"
const solidRouter: Router = Router()

solidRouter.get("/fetch/:id", solidFetch)

export default solidRouter