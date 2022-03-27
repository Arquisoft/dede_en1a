import {Router} from "express";
import * as solidFunctions from "./solidFunctions"
const cookieSession = require("cookie-session")
const crypto = require("crypto")
const solidRouter: Router = Router()

solidRouter.use(
    cookieSession({
        name: "session",
        // These keys are required by cookie-session to sign the cookies.
        keys: [
            crypto.randomBytes(20).toString("hex"),
            crypto.randomBytes(20).toString("hex"),
        ],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);

solidRouter.get("/login", solidFunctions.solidLogin)
solidRouter.get("/redirect-from-solid-idp", solidFunctions.redirectFromSolidIdp);
solidRouter.get("/fetch/:id", solidFunctions.solidFetch)
solidRouter.get("/logout/:sessionID", solidFunctions.solidLogout)

export default solidRouter