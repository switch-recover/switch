import { AppProps } from "next/app"
import React from "react"
import { StarknetProvider, getInstalledInjectedConnectors } from "@starknet-react/core"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"
import "../styles/globals.css"

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
})

const connectors = getInstalledInjectedConnectors()

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={client}>
            <StarknetProvider connectors={connectors}>
                <Component {...pageProps} />
            </StarknetProvider>
        </WagmiConfig>
    )
}

export default MyApp
