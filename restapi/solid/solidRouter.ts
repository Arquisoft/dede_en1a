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
const temporalRedirect: string = "https://google.es"

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
            return res.send(`<p>Logged in with the WebID ${session.info.webId}.</p>`)
    } else {
        res.redirect(temporalRedirect)
    }

});


solidRouter.get("/fetch", async (req, res) =>{
    let session = await getSessionFromStorage(req.session.id)

    if(session && session.info.webId) {
        await retrieveInfo(session.info.webId)
            .then((address: string) => {
                console.log(address)
                res.send(address)
            })
    } else {
        console.log("No session or webID")
    }
})

/**
 * This function retrieves information from
 * the given pod.
 * @param webID
 */
export async function retrieveInfo(webID: string): Promise<string> {
    let profileDocumentURI = webID.split("#")[0] // Retrieve the user card
    let myDataSet = await getSolidDataset(profileDocumentURI) // Get the data
    let profile = getThing(myDataSet, webID) // Get the thing
    let urlAddress = getUrl(profile as Thing, VCARD.hasAddress) as string // From the thing retrieve the id card
    let addressProfile = await getThing(myDataSet, urlAddress) // Get the thing
    let address = getStringNoLocale(addressProfile as Thing, VCARD.street_address) as string // Retrieve the value corresponding to the address
    return address
}

export default solidRouter