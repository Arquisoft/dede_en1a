import {Request, Response} from "express";
import {
    getSolidDataset,
    getStringNoLocale,
    getThing,
    getUrlAll,
    SolidDataset,
    Thing, UrlString
} from "@inrupt/solid-client";
import {VCARD} from "@inrupt/vocab-common-rdf";
import IAddress from "../interfaces/AddressInterface";
import IContactData from "../interfaces/ContactDataInterface";


export let solidFetch = async (req: Request, res: Response) =>{
    await retrieveInfo(req.params.id)
        .then((data) => {
            res.json(data)
        })
}


/**
 * This function retrieves information from
 * the given pod.
 * @param encryptedWebId
 */
async function retrieveInfo(encryptedWebId: string): Promise<IContactData> {
    // Desencription of the webID
    let webID = decodeURIComponent(encryptedWebId)
    let profileDocumentURI = webID.split("#")[0] // Retrieve the user card
    let myDataSet = await getSolidDataset(profileDocumentURI) // Get the dataset

    let profile = getThing(myDataSet, webID) // Get the #me thing
    // We get an array of the addresses of the user.
    let urlAddress = getUrlAll(profile as Thing, VCARD.hasAddress)

    return processAddresses(urlAddress, myDataSet, profile)


}


function processAddresses(urlAddresses: string[], dataset: SolidDataset, profile: (Thing & { url: UrlString }) | null): IContactData {
    // Here we store the addresses of the client
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

