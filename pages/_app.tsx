import { AppProps } from "next/app"
import React, { createContext, useState } from "react"
import { StarknetProvider, getInstalledInjectedConnectors } from "@starknet-react/core"
import { WagmiConfig, createClient, chain, configureChains } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import "../styles/globals.css"
import { useEffect } from "react"

export type ISetContractContext = {
    context: IFormDataContext
    setContext: (context: IFormDataContext) => void
}

export type IFormDataContext = {
    option?: recoveryOptions
    recoveryAddress?: string
    inactivityPeriodInDays?: number
    passwordHash?: string
    legalDocumentsHash?: string
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
    None,
}

export type ISetInterfaceContext = {
    UIContext: IInterfaceContext
    setUIContext: (context: IInterfaceContext) => void
}

export type IInterfaceContext = {
    sideBarHidden: boolean
}

export const FormDataContext = createContext<ISetContractContext | null>(null)
export const InterfaceContext = createContext<ISetInterfaceContext | null>(null)

function MyApp({ Component, pageProps }: AppProps) {
    const [context, setContext] = useState<IFormDataContext>({})
    const [UIContext, setUIContext] = useState<IInterfaceContext>({ sideBarHidden: false })
    const [mobile, setMobile] = useState<boolean>()

    useEffect(() => {
        const { isMobile } = require("react-device-detect")
        setMobile(isMobile)
    }, [])

    if (mobile)
        return (
            <div className="flex justify-center text-center items-center w-full h-screen p-2">
                <span>This application is not supported on mobile.</span>
            </div>
        )

    const connectors = getInstalledInjectedConnectors()

    const { provider, webSocketProvider } = configureChains([chain.goerli], [publicProvider()])

    const client = createClient({
        autoConnect: true,
        provider,
        webSocketProvider,
    })

    return (
        <WagmiConfig client={client}>
            <StarknetProvider connectors={connectors}>
                <FormDataContext.Provider value={{ context, setContext }}>
                    <InterfaceContext.Provider value={{ UIContext, setUIContext }}>
                        <Component {...pageProps} />
                    </InterfaceContext.Provider>
                </FormDataContext.Provider>
            </StarknetProvider>
        </WagmiConfig>
    )
}

export default MyApp
