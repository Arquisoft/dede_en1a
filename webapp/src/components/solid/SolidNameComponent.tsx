import React from "react";
import { useSession } from "@inrupt/solid-ui-react";
import {usePodData} from "../../hooks/usePodData";
import {Typography} from "@mui/material";

export const SolidNameComponent = () => {
    const { session } = useSession();

    const {fn} = usePodData(session)

    return (
        <Typography>{fn}</Typography>
    )
}