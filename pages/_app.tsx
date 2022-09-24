import { AppProps } from "next/app"
import React, { createContext, useState } from "react"
import { StarknetProvider, getInstalledInjectedConnectors } from "@starknet-react/core"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"
import "../styles/globals.css"

export type ISetContractContext = {
    context: IFormDataContext
    setContext: (context: IFormDataContext) => void
}

export type IFormDataContext = {
    option?: recoveryOptions
    recoveryAddress?: string
    inactivityPeriodInDays?: number
    passwordHash?: string
    firstName?: string
    lastName?: string
    dateOfBirth?: string
    countryOfOrigin?: string
    legalDocumentType?: string
    legalDocumentNumber?: string
}

export enum recoveryOptions {
    SelfHosted,
    SelfHostedPassword,
    TrustedAgent,
}

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
})

const connectors = getInstalledInjectedConnectors()

export const FormDataContext = createContext<ISetContractContext | null>(null)

function MyApp({ Component, pageProps }: AppProps) {
    const [context, setContext] = useState<IFormDataContext>({})
    return (
        <WagmiConfig client={client}>
            <StarknetProvider connectors={connectors}>
                <FormDataContext.Provider value={{ context, setContext }}>
                    <Component {...pageProps} />
                </FormDataContext.Provider>
            </StarknetProvider>
        </WagmiConfig>
    )
}

export default MyApp
