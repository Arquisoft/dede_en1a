import {SessionInfo} from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import {useEffect, useState} from "react";
import axios from "axios";

const parseAddress = (address: string) => {
    let elems = address.split("/")

    return {
        street: elems[3],
        city: elems[2],
        region: elems[1],
        country: elems[0]
    }
}

export const useShipping = (address: string) => {
    const [shipping, setShipping] = useState({
        distance: 0.0,
        price: 0.0,
    })

    useEffect(() => {
        if(address.length !== 0) {
            axios.post("https://restapi.dededeals.es:5000/geocode", parseAddress(address))
                .then(res => {
                    setShipping({
                        distance: res.data.distance,
                        price: res.data.price
                    })
                })
        }
    }, [])

    return shipping
}