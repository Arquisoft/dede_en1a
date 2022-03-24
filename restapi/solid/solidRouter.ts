import {getSolidDataset, getStringNoLocale, getThing, getUrl, Thing} from "@inrupt/solid-client";
import {VCARD} from "@inrupt/vocab-common-rdf";
import {Router} from "express";
import {getSessionFromStorage, Session} from "@inrupt/solid-client-authn-node";
const cookieSession = require("cookie-session")
const crypto = require("crypto")
const solidRouter: Router = Router()
const port: number = 5000

// Parametros para el logeo
const redirectUrl: string = "http://localhost:5000/solid/redirect-from-solid-idp" // Esto se cambiara por otra pagina como por ejemplo /home.
const oidcIssuer: string = "https://solidcommunity.net/" // Name of the pod provider.
const clientName: string = "DeDe" // Name of the app.
const errorRedirect: string = "http://localhost:3000"


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


solidRouter.get("/login", async (req, res) => {
    let session = new Session()
    req.session.id = session.info.sessionId

    const redirectToUrlIdentityProvider = (url: string) => {
        res.redirect(url)
    };

    await session.login({
        redirectUrl: redirectUrl,
        oidcIssuer: oidcIssuer,
        clientName: clientName,
        handleRedirect: redirectToUrlIdentityProvider
    });
})

solidRouter.get("/redirect-from-solid-idp", async (req, res) => {
    const session = await getSessionFromStorage(req.session.id);
     if(session){
        await session.handleIncomingRedirect(`http://localhost:${port}/solid${req.url}`);
         if(session.info.isLoggedIn)
            return res.redirect("http://localhost:3000/solid/login/" + Buffer.from(`${session.info.webId}`).toString("base64") + "/" + session.info.sessionId)
    } else {
        res.redirect(errorRedirect)
    }
});


solidRouter.get("/fetch/:id", async (req, res) =>{
    await retrieveInfo(req.params.id)
        .then((data) => {
            res.redirect("http://localhost:3000/solid/checkout/" + data[0] + "/" + data[1])
        })
})

solidRouter.get("/logout/:sessionID", async (req, res) => {
    let session = await getSessionFromStorage(req.params.sessionID)

    if(session){
        session.logout()
            .finally(() => {
                res.redirect("http://localhost:3000/solid/logout")
            })

    }
})

/**
 * This function retrieves information from
 * the given pod.
 * @param encryptedWebId
 */
export async function retrieveInfo(encryptedWebId: string): Promise<string[]> {

    let data: string[] = []
    let webID = Buffer.from(encryptedWebId, 'base64').toString('binary')
    let profileDocumentURI = webID.split("#")[0] // Retrieve the user card
    let myDataSet = await getSolidDataset(profileDocumentURI) // Get the data
    let profile = getThing(myDataSet, webID) // Get the thing
    let urlAddress = getUrl(profile as Thing, VCARD.hasAddress) as string // From the thing retrieve the id card
    let addressProfile = await getThing(myDataSet, urlAddress) // Get the thing
    data[0] = getStringNoLocale(profile as Thing, VCARD.fn) as string
    console.log(data[0])
    data[1] = getStringNoLocale(addressProfile as Thing, VCARD.street_address) as string // Retrieve the value corresponding to the address

    return data
}

export default solidRouter