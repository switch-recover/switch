import { ActivePlan, BodyLayout, Button, MenuBar, SideBar, TitleDescription } from "components"
import addresses from "contracts/deployments"
import Link from "next/link"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi"
const { abi: GatewayContractABI } = require("contracts/abis/GatewayContract.json")

const RecoveryPlan = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recovery plan", path: "/plan" },
    ]

    const { address } = useAccount()

    const { data: recoveryAddress } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToRecoveryContract",
        args: [address],
    })

    const { config } = usePrepareContractWrite({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "terminateRecoveryContract",
    })

    const { write } = useContractWrite(config)

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full relative overflow-scroll">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Recovery plan"
                        description="You can find the details of your existing recovery plan below."
                    />
                    {recoveryAddress ? <ActivePlan recoveryAddress={String(recoveryAddress)} /> : <NoActivePlan />}
                    <div className="flex flex-col px-2 gap-4">
                        <Button label={"Edit plan"} callback={() => {}} />
                        <Link href="/plan/approve-assets">
                            <a>
                                <Button label={"Approve assets for recovery"} callback={() => {}} />
                            </a>
                        </Link>
                        <Button label={"Delete plan"} callback={() => write?.()} />
                    </div>
                </BodyLayout>
            </div>
        </div>
    )
}

const NoActivePlan = () => {
    return (
        <>
            <TitleDescription
                title="Recovery plan"
                description="No recovery plan found. Please return to the home page to set one up."
            />
            <div className="flex flex-col mx-8">
                <Link href="/">
                    <a>
                        <Button label="← Go back" callback={() => {}} />
                    </a>
                </Link>
            </div>
        </>
    )
}

export default RecoveryPlan
