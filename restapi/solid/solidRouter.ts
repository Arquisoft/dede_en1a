import {Router} from "express";
import {solidCommunityFetch} from "./solidCommunityFetch"
import {solidInruptFetch} from "./solidInruptFetch"
const solidRouter: Router = Router()

solidRouter.get("/fetch/solidCommunity/:id", solidCommunityFetch)
solidRouter.get("/fetch/inrupt/:id", solidInruptFetch)

export default solidRouter