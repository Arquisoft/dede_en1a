import validator from "validator";

export const validateUrl = (url: string) => {
    if(url !== null
        && url !== "undefined"
        && url.trim().length !== 0
        && validator.isURL(url, {require_protocol: true})
        && validator.contains(url, "solidcommunity"))
        return true
    return false
}