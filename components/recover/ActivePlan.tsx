import { Button, DisplayList, TitleDescription } from "components"
import addresses from "contracts/deployments"
import { shortenAddress } from "utils/shortenAddress"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi"
const { abi: GatewayContractABI } = require("contracts/abis/GatewayContract.json")
const { abi: RecoveryContractABI } = require("contracts/abis/RecoveryContract.json")
const { abi: RecoveryContractPasswordABI } = require("contracts/abis/RecoveryContractPassword.json")
const { abi: RecoveryContractTrustedAgentsABI } = require("contracts/abis/RecoveryContractTrustedAgents.json")

export const ActivePlan = ({ recoveryAddress }: { recoveryAddress: string }) => {
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

    return <>{renderActivePlan()}</>
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
                { label: "Recipient", value: shortenAddress(String(recipient)) },
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
        contractInterface: RecoveryContractTrustedAgentsABI,
        functionName: "recipient",
    })

    const { data: minBlocks } = useContractRead({
        addressOrName: recoveryAddress,
        contractInterface: RecoveryContractTrustedAgentsABI,
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
                { label: "Trusted agent", value: shortenAddress(String(recipient)) },
                {
                    label: "Inactivity period",
                    value: `${Math.round((Number(minBlocks) * 17) / 24 / 60 / 60)} days`,
                },
            ]}
        />
    )
}
