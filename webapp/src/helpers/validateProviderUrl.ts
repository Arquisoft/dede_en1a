import validator from "validator";

export const validateUrl = (url: string) => {
    if(url !== null
        && url !== "undefined"
        && url.trim().length !== 0
        && validator.isURL(url, {require_protocol: true})
        && validator.contains(url, "solidcommunity")
        || validator.contains(url, "broker.pod.inrupt")
		)
        return true
    return false
}