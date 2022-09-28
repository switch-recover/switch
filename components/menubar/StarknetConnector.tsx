import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useConnectors, useStarknet } from "@starknet-react/core"
import { ConnectorOverlay } from "components"
import { shortenAddress } from "utils/shortenAddress"
import Image from "next/image"

const StarknetConnector = () => {
    const [open, setOpen] = useState(false)
    const [hover, setHover] = useState(false)
    const { account } = useStarknet()
    const { connect, connectors } = useConnectors()

    useEffect(() => {
        if (connectors) connect(connectors[0])
    }, [])

    return (
        <div className="w-20 sm:w-44 h-11 rounded-full flex justify-center items-center">
            <ConnectorOverlay open={open} setOpen={setOpen} setHover={setHover} />
            {account ? (
                <Connected hover={hover} setHover={setHover} account={account} />
            ) : (
                <Disconnected setOpen={setOpen} />
            )}
        </div>
    )
}

const Connected = ({
    hover,
    setHover,
    account,
}: {
    hover: boolean
    setHover: Dispatch<SetStateAction<boolean>>
    account: string
}) => {
    const { library } = useStarknet()
    const { disconnect } = useConnectors()

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
                        hover
                            ? "bg-red-500"
                            : library.chainId !== "0x534e5f474f45524c49"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }`}
                />
                <div className="hidden sm:flex">
                    <Image src="/starknet.png" height="22" width="22" alt="Starknet" />
                </div>
                <div className="hidden sm:flex flex-col items-center">
                    <span className="text-center text-sm font-semibold w-24">
                        {hover ? "Disconnect" : shortenAddress(account)}
                    </span>
                    <span className="text-xs">
                        {library.chainId === "0x534e5f474f45524c49" ? "StarkNet Goerli" : "Switch to Goerli"}
                    </span>
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

const Disconnected = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div
            className="flex flex-col w-full h-full justify-center items-center rounded-full cursor-pointer bg-theme hover:bg-theme-dark active:bg-theme select-none"
            onClick={() => setOpen(true)}
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
