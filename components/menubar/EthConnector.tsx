import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { shortenAddress } from "utils/shortenAddress"
import Image from "next/image"

const EthConnector = () => {
    const [connected, setConnected] = useState(false)
    const { address, isConnected } = useAccount()
    useEffect(() => {
        setConnected(isConnected)
    }, [isConnected])

    const { connect } = useConnect({ connector: new InjectedConnector() })
    const { disconnect } = useDisconnect()
    const [hover, setHover] = useState(false)

    return (
        <div className="w-20 sm:w-36 h-11 rounded-full flex justify-center items-center">
            {connected ? (
                <div
                    className="flex items-center gap-2 w-full h-full justify-center rounded-full hover:cursor-pointer select-none hover:bg-red-100 active:bg-red-200 border"
                    onClick={() => disconnect()}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {hover ? (
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="hidden sm:flex flex-col items-center">
                                <span className="text-center text-sm font-semibold w-24">Disconnect</span>
                                <span className="text-xs">Ethereum</span>
                            </div>
                            <div className="flex sm:hidden">
                                <span className="text-center text-sm font-semibold">End</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex w-2 h-2 rounded-full bg-green-500" />
                            <div className="hidden sm:flex flex-col items-center">
                                <span className="text-center text-sm font-semibold w-24">
                                    {address ? shortenAddress(address) : ""}
                                </span>
                                <span className="text-xs">Ethereum</span>
                            </div>
                            <div className="flex sm:hidden">
                                <Image src="/ethereum.png" height="27" width="15" alt="Ethereum" />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="flex flex-col w-full h-full justify-center items-center rounded-full cursor-pointer bg-theme hover:bg-theme-dark active:bg-theme select-none"
                    onClick={() => connect()}
                >
                    <span className="text-sm font-semibold hidden sm:flex">Connect wallet</span>
                    <span className="text-xs hidden sm:flex">Ethereum</span>
                    <div className="flex sm:hidden">
                        <Image src="/ethereum.png" height="27" width="15" alt="Ethereum" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default EthConnector
