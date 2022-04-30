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
import IAddress from "../interfaces/AddressInterface";
import IContactData from "../interfaces/ContactDataInterface";

export let solidInruptFetch = async (req: Request, res: Response) =>{
    await retrieveInfo(req.params.id)
        /*.then((data) => {
            res.json(data)
        })
        */

}

function retrieveInfo(id: string) {

}