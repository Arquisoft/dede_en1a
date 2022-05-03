import {useEffect, useState} from "react";
import axios from "axios";
import {SessionInfo} from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import { appendFile } from "fs";

function encrypt(webId: string): string {
    return encodeURIComponent(webId)
}

export const usePodData = (session: SessionInfo["session"]) => {
    const [contactData, setContactData] = useState({
        fn: "",
        addresses: []
    })
	const apiEndPoint = process.env.REACT_APP_API_URI;
    useEffect(() => {
        if(session.info.webId) {
            axios.get(apiEndPoint + "/solid/fetch/" + encrypt(session.info.webId)).then(
                response => {
                    setContactData({
                        fn: response.data.fn,
                        addresses: response.data.addresses
                    })
                }
            )
        }
    }, [])

    return contactData
}