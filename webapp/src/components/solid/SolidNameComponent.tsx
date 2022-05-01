import React from "react";
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";

export const SolidNameComponent = () => {
    const { session } = useSession();

    const webId = session.info.webId ? session.info.webId : "";

    return (
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
            <Text property="http://www.w3.org/2006/vcard/ns#fn"/>
        </CombinedDataProvider>
    )
}