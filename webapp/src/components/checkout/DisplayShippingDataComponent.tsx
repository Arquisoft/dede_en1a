import HorizontalLinearStepper from "./HorizontalLinearStepper";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import {usePodData} from "../../hooks/usePodData";
import {Address} from "../../shared/shareddtypes";

type CustomerDataProps = {
    fn: string
    addresses: Address[]
    setIsValidAddress: (valid: boolean) => void
    setIsValidName: (valid: boolean) => void
}

type FullNameProps = {
    fn: string
    setIsValidName: (valid: boolean) => void
}

type AddressesProps = {
    addresses: Address[]
    setIsValidAddress: (valid: boolean) => void
}

const addressToString = (address: Address) => {
    return address.country + "/"
        + address.region + "/"
        + address.locality + "/"
        + address.street_address
}

const DisplayFullNameComponent = (props: FullNameProps) => {
    const {fn, setIsValidName} = props

    const handleChange = (fn: string) => {
        localStorage.setItem("fn", fn)
        setIsValidName(fn.length !== 0)
    }

    return (
        <Box>
            {
                fn === ""
                    ?
                    <Box component="div" sx={{display: "inline"}}>
                        <Typography>
                            We could not find a name in your pod, please type yours.
                        </Typography>
                        <TextField onChange={(event => handleChange(event.target.value))} label="Full name" variant="filled" />
                    </Box>
                    :
                    <h1>Full name: {fn}</h1>
            }
        </Box>
    )
}

const DisplayAddressesComponent = (props: AddressesProps) => {
    const {addresses, setIsValidAddress} = props

    const [address, setAddress] = useState<string[]>(["", "", "", ""]) // Country, region, locality, address



    useEffect(() => {
        localStorage.setItem("address", address[0] + "/" + address[1] + "/" + address[2] + "/" + address[3])
    }, address)

    const validateAddress = () => {
        let valid = true
        address.forEach(e => {
            if(e.length === 0){
                valid = false
            }
        })
        setIsValidAddress(valid)
    }

    const handleAddressChange = (element: string, index: number) => {
        let newAddress = address
        newAddress[index] = element
        setAddress(newAddress)
        localStorage.setItem("address", address[0] + "/" + address[1] + "/" + address[2] + "/" + address[3])
        validateAddress()
    }

    const handleChange = (address: string) => {
        localStorage.setItem("address", address)
    }

    return (
        <Box sx={{margin: '5px'}}>
            {
                addresses.length ?
                    <Box>
                        <Typography>
                            Select an address:
                        </Typography>
                        <select
                            onChange={(e) => handleChange(e.target.value)}
                        >
                            <option value="no_address">Select an address</option>
                            {addresses.map((address, index) =>
                                <option
                                    key={index}
                                    value={addressToString(address)}
                                >
                                    {addressToString(address)}
                                </option>
                            )}
                        </select>
                    </Box>
                    :
                    <Box component="div" sx={{display: "inline"}}>
                        <Typography>
                            We could not find an address in your pod, please type yours.
                        </Typography>
                        <Box>
                            <TextField onChange={(e => handleAddressChange(e.target.value, 0))} label="Country" variant="filled" />
                            <TextField onChange={(e => handleAddressChange(e.target.value, 1))} label="Region" variant="filled" />
                            <TextField onChange={(e => handleAddressChange(e.target.value, 2))} label="Locality" variant="filled" />
                            <TextField onChange={(e => handleAddressChange(e.target.value, 3))} label="Street" variant="filled" />
                        </Box>
                    </Box>
            }
        </Box>
    )
}

const DisplayCustomerDataComponent = (props: CustomerDataProps) => {
    const {fn, addresses, setIsValidAddress, setIsValidName} = props
    return (
        <Box>
            <DisplayFullNameComponent fn={fn} setIsValidName={setIsValidName}/>
            <DisplayAddressesComponent addresses={addresses} setIsValidAddress={setIsValidAddress}/>
        </Box>
    )
}

export const DisplayShippingDataComponent = () => {

    const {session} = useSession()
    const {fn, addresses} = usePodData(session)
    const [isValidAddress, setIsValidAddress] = useState(false)
    const [isValidName, setIsValidName] = useState(false)

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: '50vh'}}
        >
            <Paper  sx={{marginTop: '30px', marginLeft: '100px', marginRight: '100px', marginDown: '100px'}}>
                <DisplayCustomerDataComponent fn={fn} addresses={addresses} setIsValidAddress={setIsValidAddress} setIsValidName={setIsValidName}/>
            </Paper>
            <Box sx={{margin: '60px'}}>
                <HorizontalLinearStepper step={1} isValidAddress={isValidAddress} isValidName={isValidName}/>
            </Box>
        </Grid>
    )
}