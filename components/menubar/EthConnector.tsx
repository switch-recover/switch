import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect, chain as chn, useNetwork } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { shortenAddress } from "utils/shortenAddress"
import Image from "next/image"

const EthConnector = () => {
    const [connected, setConnected] = useState(false)
    const { address } = useAccount()

    useEffect(() => {
        setConnected(!!address)
    }, [address])

    const { connect } = useConnect({
        connector: new InjectedConnector({
            chains: [chn.goerli],
        }),
    })

    const { disconnect } = useDisconnect()

    return (
        <div className="w-20 sm:w-44 h-11 rounded-full flex justify-center items-center">
            {connected ? <Connected disconnect={disconnect} /> : <Disconnected connect={connect} />}
        </div>
    )
}

const Connected = ({ disconnect }: any) => {
    const { address } = useAccount()
    const [hover, setHover] = useState(false)
    const { chain } = useNetwork()

    return (
        <div
            className="flex items-center gap-2 w-full h-full justify-center rounded-full hover:cursor-pointer select-none hover:bg-red-100 active:bg-red-200 border"
            onClick={() => disconnect()}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`w-2 h-2 rounded-full ${
                        hover ? "bg-red-500" : chain?.unsupported ? "bg-yellow-500" : "bg-green-500"
                    }`}
                />
                <div className="hidden sm:flex">
                    <Image src="/ethereum.png" height="27" width="15" alt="Ethereum" />
                </div>

                <div className="hidden sm:flex flex-col items-center">
                    <span className="text-center text-sm font-semibold w-24">
                        {hover ? "Disconnect" : address ? shortenAddress(address) : ""}
                    </span>
                    <span className="text-xs">{chain?.unsupported ? "Switch to Goerli" : "Ethereum Goerli"}</span>
                </div>
                <div className="flex sm:hidden">
                    {hover ? (
                        <span className="text-center text-sm font-semibold">End</span>
                    ) : (
                        <Image src="/ethereum.png" height="27" width="15" alt="Ethereum" />
                    )}
                </div>
            </div>
        </div>
    )
}

const Disconnected = ({ connect }: any) => {
    return (
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
    )
}

export default EthConnector
