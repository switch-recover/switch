import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { connect } from "@argent/get-starknet"
import { shortString } from "starknet"
import {
    addWalletChangeListener,
    chainId,
    connectWallet,
    disconnectWallet,
    removeWalletChangeListener,
    silentConnectWallet,
    addNetworkChangeListener,
    removeNetworkChangeListener,
} from "utils/StarknetWalletServices"
import { shortenAddress } from "utils/shortenAddress"
import Image from "next/image"
import { Account, AccountInterface } from "starknet"

const StarknetConnector = () => {
    const [hover, setHover] = useState(false)
    const [address, setAddress] = useState<string>()
    const [chain, setChain] = useState<string | undefined>()
    const [isConnected, setConnected] = useState(false)

    const disconnectHandler = () => {
        setAddress("")
        setChain(undefined)
        setConnected(false)
    }

    useEffect(() => {
        const handler = async () => {
            try {
                const starknet = await connect()
                await starknet?.enable()
                // setProvider(starknet.account)
                const fetchedChainId = await chainId()
                setChain(fetchedChainId)
                setAddress(starknet?.selectedAddress)
                setConnected(true)
            } catch (error) {
                if (error instanceof Error) alert(error.message)
            }
        }

        ;(async () => {
            await handler()
            addWalletChangeListener(handler)
            addNetworkChangeListener(handler)
        })()

        return () => {
            removeWalletChangeListener(handler)
            removeNetworkChangeListener(handler)
        }
    }, [])

    return (
        <div className="w-20 sm:w-44 h-11 rounded-full flex justify-center items-center">
            {address ? (
                <Connected
                    hover={hover}
                    setHover={setHover}
                    address={address}
                    chain={chain}
                    disconnectHandler={disconnectHandler}
                />
            ) : (
                <Disconnected setAddress={setAddress} setChain={setChain} setConnected={setConnected} />
            )}
        </div>
    )
}

const Connected = ({
    hover,
    setHover,
    address,
    chain,
    disconnectHandler,
}: {
    hover: boolean
    setHover: Dispatch<SetStateAction<boolean>>
    address: string | undefined
    chain: string | undefined
    disconnectHandler: () => void
}) => {
    return (
        <div
            className="flex items-center gap-2 w-full h-full justify-center rounded-full hover:cursor-pointer select-none hover:bg-red-100 active:bg-red-200 border"
            onClick={() => disconnectWallet(disconnectHandler)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`w-2 h-2 rounded-full ${
                        hover ? "bg-red-500" : chain !== "SN_GOERLI" ? "bg-yellow-500" : "bg-green-500"
                    }`}
                />
                <div className="hidden sm:flex">
                    <Image src="/starknet.png" height="22" width="22" alt="Starknet" />
                </div>
                <div className="hidden sm:flex flex-col items-center">
                    <span className="text-center text-sm font-semibold w-24">
                        {hover ? "Disconnect" : address ? shortenAddress(address) : ""}
                    </span>
                    <span className="text-xs">{chain === "SN_GOERLI" ? "StarkNet Goerli" : "Switch to Goerli"}</span>
                </div>
                <div className="flex sm:hidden">
                    {hover ? (
                        <span className="text-center text-sm font-semibold">End</span>
                    ) : (
                        <Image src="/starknet.png" height="22" width="22" alt="Starknet" />
                    )}
                </div>
            </div>
        </div>
    )
}

const Disconnected = ({
    setAddress,
    setChain,
    setConnected,
}: {
    setAddress: Dispatch<SetStateAction<string | undefined>>
    setChain: Dispatch<SetStateAction<string | undefined>>
    setConnected: Dispatch<SetStateAction<boolean>>
}) => {
    const handleConnect = async () => {
        const handler = async () => {
            try {
                const starknet = await connect()
                await starknet?.enable()
                // setProvider(starknet.account)
                const fetchedChainId = await chainId()
                setChain(fetchedChainId)
                setAddress(starknet?.selectedAddress)
                setConnected(true)
            } catch (error) {
                if (error instanceof Error) alert(error.message)
            }
        }

        ;(async () => {
            await handler()
            addWalletChangeListener(handler)
            addNetworkChangeListener(handler)
        })()

        return () => {
            removeWalletChangeListener(handler)
            removeNetworkChangeListener(handler)
        }
    }

    return (
        <div
            className="flex flex-col w-full h-full justify-center items-center rounded-full cursor-pointer bg-theme hover:bg-theme-dark active:bg-theme select-none"
            onClick={() => handleConnect()}
        >
            <span className="text-sm font-semibold hidden sm:flex">Connect wallet</span>
            <span className="text-xs hidden sm:flex">Starknet</span>
            <div className="flex sm:hidden">
                <Image src="/starknet.png" height="22" width="22" alt="Starknet" />
            </div>
        </div>
    )
}

export default StarknetConnector
