import { AppProps } from "next/app"
import React, { createContext, useState } from "react"
import { StarknetProvider, getInstalledInjectedConnectors } from "@starknet-react/core"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"
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

export const FormDataContext = createContext<ISetContractContext | null>(null)

function MyApp({ Component, pageProps }: AppProps) {
    const [context, setContext] = useState<IFormDataContext>({})
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

    const client = createClient({
        autoConnect: true,
        provider: getDefaultProvider(),
    })

    const connectors = getInstalledInjectedConnectors()

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
