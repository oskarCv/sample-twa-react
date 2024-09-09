import { CONSTANTS_PROPERTIES } from "../constants"

export const isConnectedMainNet = (isConnected, network) => {
    return isConnected && network === CONSTANTS_PROPERTIES.mainnet
}