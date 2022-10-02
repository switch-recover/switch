import { BodyLayout, Button, DisplayList, MenuBar, SideBar, TitleDescription } from "components"
import addresses from "contracts/deployments"
import Link from "next/link"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useContext } from "react"
import { shortenAddress } from "utils/shortenAddress"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
const { abi: GatewayContractABI } = require("contracts/abis/GatewayContract.json")
const { abi: RecoveryContractABI } = require("contracts/abis/RecoveryContract.json")
const { abi: RecoveryContractPasswordABI } = require("contracts/abis/RecoveryContractPassword.json")
const { abi: RecoveryContractTrustedAgentsABI } = require("contracts/abis/RecoveryContractTrustedAgents.json")

enum RecoveryContractType {
    Default,
    Password,
    TrustedAgent,
}

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

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full relative">
                <SideBar />
                <BodyLayout path={pathObject}>
                    {recoveryAddress ? <ActivePlan recoveryAddress={String(recoveryAddress)} /> : <NoActivePlan />}
                </BodyLayout>
            </div>
        </div>
    )
}

const ActivePlan = ({ recoveryAddress }: { recoveryAddress: string }) => {
    const { address } = useAccount()

    const { data: contractType } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToContractType",
        args: [address],
    })

    const renderActivePlan = () => {
        switch (Number(contractType)) {
            case 0:
                return <ActivePlanDefault recoveryAddress={recoveryAddress} />
            case 1:
                return <ActivePlanPassword recoveryAddress={recoveryAddress} />
            case 2:
                return <ActivePlanTrustedAgent recoveryAddress={recoveryAddress} />
            default:
                return <></>
        }
    }

    const recoveryPlanLabels = {
        Default: "Self hosted recovery with nominated recipient",
        Password: "Self hosted recovery with password",
        TrustedAgent: "Trusted agent recovery",
    }

    const { config } = usePrepareContractWrite({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "terminateRecoveryContract",
    })

    const { write } = useContractWrite(config)

    return (
        <>
            <TitleDescription
                title="Recovery plan"
                description="You can find the details of your existing recovery plan below."
            />
            {renderActivePlan()}
            <div className="flex flex-col px-2 gap-4">
                <Button label={"Edit plan"} callback={() => {}} />
                <Button label={"Delete plan"} callback={() => write?.()} />
            </div>
        </>
    )
}

const ActivePlanDefault = ({ recoveryAddress }: { recoveryAddress: string }) => {
    const { data: recipient } = useContractRead({
        addressOrName: recoveryAddress,
        contractInterface: RecoveryContractABI,
        functionName: "recipient",
    })

    const { data: minBlocks } = useContractRead({
        addressOrName: recoveryAddress,
        contractInterface: RecoveryContractABI,
        functionName: "minBlocks",
    })

    return (
        <DisplayList
            fields={[
                { label: "Recovery contract", value: recoveryAddress },
                {
                    label: "Contract type",
                    value: "Self hosted recovery with nominated recipient",
                },
                { label: "Recipient", value: String(recipient) },
                {
                    label: "Inactivity period",
                    value: `${Math.round((Number(minBlocks) * 17) / 24 / 60 / 60)} days`,
                },
            ]}
        />
    )
}

const ActivePlanPassword = ({ recoveryAddress }: { recoveryAddress: string }) => {
    const { data: hashedPassword } = useContractRead({
        addressOrName: recoveryAddress,
        contractInterface: RecoveryContractPasswordABI,
        functionName: "hashedPassword",
    })

    const { data: minBlocks } = useContractRead({
        addressOrName: recoveryAddress,
        contractInterface: RecoveryContractPasswordABI,
        functionName: "minBlocks",
    })

    return (
        <DisplayList
            fields={[
                { label: "Recovery contract", value: recoveryAddress },
                {
                    label: "Contract type",
                    value: "Self hosted recovery with password",
                },
                {
                    label: "Password (hashed)",
                    value: shortenAddress("0x" + BigInt(String(hashedPassword)).toString(16)),
                },
                {
                    label: "Inactivity period",
                    value: `${Math.round((Number(minBlocks) * 17) / 24 / 60 / 60)} days`,
                },
            ]}
        />
    )
}

const ActivePlanTrustedAgent = ({ recoveryAddress }: { recoveryAddress: string }) => {
    const { data: recipient } = useContractRead({
        addressOrName: recoveryAddress,
        contractInterface: RecoveryContractABI,
        functionName: "recipient",
    })

    const { data: minBlocks } = useContractRead({
        addressOrName: recoveryAddress,
        contractInterface: RecoveryContractABI,
        functionName: "minBlocks",
    })

    return (
        <DisplayList
            fields={[
                { label: "Recovery contract", value: recoveryAddress },
                {
                    label: "Contract type",
                    value: "Trusted agent recovery",
                },
                { label: "Trusted agent", value: String(recipient) },
                {
                    label: "Inactivity period",
                    value: `${Math.round((Number(minBlocks) * 17) / 24 / 60 / 60)} days`,
                },
            ]}
        />
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
