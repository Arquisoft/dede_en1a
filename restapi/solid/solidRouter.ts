import {Router} from "express";
import {solidCommunityFetch} from "./solidCommunityFetch"
const solidRouter: Router = Router()

solidRouter.get("/fetch/solidCommunity/:id", solidCommunityFetch)

export default solidRouter