import { connect, disconnect } from "@argent/get-starknet"
import { constants, shortString } from "starknet"

type Network = "goerli-alpha" | "mainnet-alpha" | "localhost"

export const silentConnectWallet = async () => {
    const windowStarknet = await connect({ showList: false })
    if (!windowStarknet?.isConnected) {
        await windowStarknet?.enable({
            showModal: false,
            starknetVersion: "v4",
        } as any)
    }
    return windowStarknet
}

export const connectWallet = async () => {
    const windowStarknet = await connect()
    await windowStarknet?.enable()
    return windowStarknet
}

export const disconnectWallet = async (handleEvent: () => void) => {
    const disconnectStarkNet = disconnect({ clearDefaultWallet: true })
    handleEvent()
    return disconnectStarkNet
}

export const walletAddress = async (): Promise<string | undefined> => {
    const starknet = await connect()
    if (!starknet?.isConnected) {
        return
    }
    return starknet.selectedAddress
}

export const networkId = async (): Promise<Network | undefined> => {
    const starknet = await connect({ showList: false })
    if (!starknet?.isConnected) {
        return
    }
    try {
        const { chainId } = starknet.provider
        if (chainId === constants.StarknetChainId.MAINNET) {
            return "mainnet-alpha"
        } else if (chainId === constants.StarknetChainId.TESTNET) {
            return "goerli-alpha"
        } else {
            return "localhost"
        }
    } catch {}
}

export const chainId = async (): Promise<string | undefined> => {
    const starknet = await connect({ showList: false })
    if (!starknet?.isConnected) {
        return
    }
    try {
        return shortString.decodeShortString(starknet.provider.chainId)
    } catch {}
}

export const addWalletChangeListener = async (handleEvent: (accounts: string[]) => void) => {
    const starknet = await connect({ showList: false })
    if (!starknet?.isConnected) {
        return
    }
    starknet.on("accountsChanged", handleEvent)
}

export const removeWalletChangeListener = async (handleEvent: (accounts: string[]) => void) => {
    const starknet = await connect({ showList: false })
    if (!starknet?.isConnected) {
        return
    }
    starknet.off("accountsChanged", handleEvent)
}

export const addNetworkChangeListener = async (handleEvent: () => void) => {
    const starknet = await connect({ showList: false })
    if (!starknet?.isConnected) {
        return
    }
    starknet.on("networkChanged", handleEvent)
}

export const removeNetworkChangeListener = async (handleEvent: (accounts: string[]) => void) => {
    const starknet = await connect({ showList: false })
    if (!starknet?.isConnected) {
        return
    }
    starknet.off("networkChanged", handleEvent)
}
