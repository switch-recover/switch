import { useState } from "react"
import { useConnectors, useStarknet } from "@starknet-react/core"
import { ConnectorOverlay } from "../components"
import { shortenAddress } from "../utils/shortenAddress"

const Connect = () => {
    const [open, setOpen] = useState(false)
    const [hover, setHover] = useState(false)
    const { account } = useStarknet()

    const { disconnect } = useConnectors()

    return (
        <div className="w-36 h-11 rounded-full flex justify-center items-center">
            <ConnectorOverlay open={open} setOpen={setOpen} setHover={setHover} />
            {account ? (
                <div
                    className="flex items-center gap-2 w-full h-full justify-center rounded-full hover:cursor-pointer select-none hover:bg-red-100 active:bg-red-200 border"
                    onClick={() => disconnect()}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {hover ? (
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="flex flex-col items-center">
                                <span className="text-center text-sm font-semibold w-24">Disconnect</span>
                                <span className="text-xs">Starknet</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <div className="flex flex-col items-center">
                                <span className="text-center text-sm font-semibold w-24">
                                    {shortenAddress(account)}
                                </span>
                                <span className="text-xs">Starknet</span>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="flex flex-col w-full h-full justify-center items-center rounded-full cursor-pointer bg-theme hover:bg-theme-dark active:bg-theme select-none"
                    onClick={() => setOpen(true)}
                >
                    <span className="text-sm font-semibold">Connect wallet</span>
                    <span className="text-xs">Starknet</span>
                </div>
            )}
        </div>
    )
}

export default Connect
