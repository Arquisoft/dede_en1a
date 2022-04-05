import {Request, Response} from "express";
import {
    getSolidDataset,
    getStringNoLocale,
    getThing,
    getUrlAll,
    SolidDataset,
    Thing,  UrlString
} from "@inrupt/solid-client";
import {VCARD} from "@inrupt/vocab-common-rdf";
import {getSessionFromStorage, Session} from "@inrupt/solid-client-authn-node";
import IAddress from "../interfaces/AddressInterface";
import {Buffer} from "buffer"
import IContactData from "../interfaces/ContactDataInterface";

// Parametros para el logeo
const redirectUrl: string = process.env.WEBAPP_URI + "/solid/redirect-from-solid-idp"
const oidcIssuer: string = "https://solidcommunity.net/" // Name of the pod provider.
const clientName: string = "DeDe" // Name of the app.
const errorRedirect: string = process.env.WEBAPP_URI + ""

export let solidLogin = async (req: Request, res: Response) => {
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

}

export let redirectFromSolidIdp =  async (req: Request, res: Response) => {
    const session = await getSessionFromStorage(req.session.id);
    if(session){
        await session.handleIncomingRedirect(process.env.WEBAPP_URI + "/solid" + req.url);
        if(session.info.isLoggedIn)
            return res.redirect(process.env.WEBAPP_URI + "/solid/login/"+ Buffer.from(`${session.info.webId}`).toString("base64") + "/" + session.info.sessionId)

    } else {
        res.redirect(errorRedirect)
    }
}

export let solidFetch = async (req: Request, res: Response) =>{
    await retrieveInfo(req.params.id)
        .then((data) => {
            res.json(data)
        })
}

export let solidLogout =  async (req: Request, res: Response) => {
    let session = await getSessionFromStorage(req.params.sessionID)
    if(session) {
        session.logout()
            .then(() => {
                res.redirect(process.env.WEBAPP_URI + "/solid/logout")
            })
    } else {
        res.redirect(process.env.WEBAPP_URI + "/solid/logout")
    }
}


/**
 * This function retrieves information from
 * the given pod.
 * @param encryptedWebId
 */
async function retrieveInfo(encryptedWebId: string): Promise<IContactData> {
    // Desencription of the webID
    let webID = decodeURIComponent(encryptedWebId)
    console.log(webID)
    let profileDocumentURI = webID.split("#")[0] // Retrieve the user card
    let myDataSet = await getSolidDataset(profileDocumentURI) // Get the dataset
    let profile = getThing(myDataSet, webID) // Get the #me thing
    // We get an array of the addreses of the user.
    let urlAddress = getUrlAll(profile as Thing, VCARD.hasAddress)
    let result = processAddresses(urlAddress, myDataSet, profile)

    return result
}

function processAddresses(urlAddresses: string[], dataset: SolidDataset, profile: (Thing & { url: UrlString }) | null): IContactData {
    // Here we store the adresses of the client
    let addresses: IAddress[] = []

    urlAddresses.forEach(async function(url, index) {
        // We get the user profile
        let addressProfile = await getThing(dataset, url)

        // We extract the info as needed.
        let country = getStringNoLocale(addressProfile as Thing, VCARD.country_name) as string
        let locality = getStringNoLocale(addressProfile as Thing, VCARD.locality) as string
        let region = getStringNoLocale(addressProfile as Thing, VCARD.region) as string
        let street_address = getStringNoLocale(addressProfile as Thing, VCARD.street_address) as string
        let postal_code = getStringNoLocale(addressProfile as Thing, VCARD.postal_code) as string

        // We build the address
        let address: IAddress = {
            country: country,
            locality: locality,
            region : region,
            street_address: street_address,
            postal_code: postal_code,
        }
        // We include it in the addresses list
        addresses[index] = address
    });

    // We retrieve the name from the pod.
    let fn = getStringNoLocale(profile as Thing, VCARD.fn) as string

    // We build the contact data.
    let contactData: IContactData = {
        fn: fn,
        addresses: addresses
    }

    return contactData
}

