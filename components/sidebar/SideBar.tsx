import Image from "next/image"
import { InterfaceContext, ISetInterfaceContext } from "pages/_app"
import { useContext, useRef } from "react"
import { useAccount, useContractRead } from "wagmi"
import addresses from "contracts/deployments"
import Link from "next/link"
const { abi: GatewayContractABI } = require("contracts/abis/GatewayContract.json")

enum RecoveryContractType {
    Default,
    Password,
    TrustedAgent,
}

const SideBar = () => {
    const { UIContext, setUIContext } = useContext(InterfaceContext) as ISetInterfaceContext
    const wrapperRef = useRef(null)

    const { address } = useAccount()

    const { data: recoveryAddress } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToRecoveryContract",
        args: [address],
    })

    return (
        <div
            className={`flex flex-col h-full bg-gray-200 z-10 justify-between transition-all relative ${
                UIContext.sideBarHidden ? "w-5" : "w-80 p-4"
            }`}
            ref={wrapperRef}
        >
            <div className={UIContext.sideBarHidden ? "hidden" : ""}>
                {recoveryAddress && Number(recoveryAddress) !== 0 ? <ActivePlan /> : <InactivePlan />}
            </div>
            <div
                className={`flex-col justify-between gap-3 border-t border-gray-400 p-5 ${
                    UIContext.sideBarHidden ? "hidden" : ""
                }`}
            >
                <div className="flex items-center gap-8 cursor-pointer hover:opacity-60 active:opacity-40 select-none">
                    <div className="flex w-6 h-6">
                        <Image src="/book.png" width="24" height="24" alt="Documentation" />
                    </div>
                    <span className="font-semibold text-sm">Documentation</span>
                </div>
            </div>
            <div
                className={`w-5 h-8 bg-gray-300 absolute right-0 top-9 flex justify-center items-center font-semibold text-gray-400 select-none cursor-pointer ${
                    UIContext.sideBarHidden ? "rounded-tr-md rounded-br-md" : "rounded-tl-md rounded-bl-md"
                }`}
                onClick={() => setUIContext({ ...UIContext, sideBarHidden: !UIContext.sideBarHidden })}
            >
                <Image
                    src={UIContext.sideBarHidden ? "/maximise.png" : "/minimise.png"}
                    width="11"
                    height="14"
                    alt="Toggle"
                    className="opacity-70"
                />
            </div>
        </div>
    )
}

const InactivePlan = () => {
    return (
        <div className="flex flex-col gap-2 mt-12">
            <span className="text-sm font-semibold text-gray-400 px-2">No active plan</span>
            <div className="flex flex-col gap-3 bg-gray-50 rounded-lg w-full h-24 p-4">
                <div className="bg-gray-200 w-1/3 h-3"></div>
                <div className="bg-gray-200 w-2/3 h-6"></div>
            </div>
        </div>
    )
}

const ActivePlan = () => {
    const { address } = useAccount()

    const { data: contractType } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToContractType",
        args: [address],
    })

    const recoveryPlanLabels = {
        Default: "Self hosted recovery",
        Password: "Self hosted recovery",
        TrustedAgent: "Trusted agent recovery",
    }

    type RecoveryContractTypeAsString = "Default" | "Password" | "TrustedAgent"

    return (
        <div className="flex flex-col gap-2 mt-12">
            <span className="text-sm font-semibold text-gray-400 px-2">Active plan</span>
            <div className="flex flex-col bg-gray-50 rounded-lg w-full h-24 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Image src="/recover.png" width="20" height="20" alt="recover" />
                    </div>
                    <div className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">ACTIVE</div>
                </div>
                <span className="text-sm font-semibold text-gray-800 mt-3">
                    {
                        recoveryPlanLabels[
                            RecoveryContractType[contractType as unknown as number] as RecoveryContractTypeAsString
                        ]
                    }
                </span>
                <Link href="/plan">
                    <span className="text-xs text-theme-darker cursor-pointer hover:opacity-70 active:opacity-50 select-none">
                        Edit
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default SideBar
