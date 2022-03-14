import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
    Thing,
} from "@inrupt/solid-client";
import { VCARD } from "@inrupt/vocab-common-rdf";

const getAddress = async (webID: string) => {
    let profileDocumentURI = webID.split("#")[0]; // we are just interested in the card
    let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
    let profile = getThing(myDataset, webID); // we obtain the thing we are looking for from the dataset
    // we obtain the address
    return getStringNoLocale(profile as Thing, VCARD.street_address) as string;
};

export default getAddress;