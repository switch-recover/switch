import { ReviewContainer } from "components"
import addresses from "contracts/deployments"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useContext } from "react"
import { shortenAddress } from "utils/shortenAddress"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
const { abi: RecoveryContractFactoryABI } = require("contracts/abis/RecoveryContractFactory.json")

const Review = () => {
    const { context } = useContext(FormDataContext) as ISetContractContext

    const { config } = usePrepareContractWrite({
        addressOrName: addresses.L1RecoveryContractFactory,
        contractInterface: RecoveryContractFactoryABI,
        functionName: "deployPasswordRecoveryContract",
        args: [
            context.passwordHash,
            Math.round(((context.inactivityPeriodInDays ? context.inactivityPeriodInDays : -1) * 24 * 60 * 60) / 17), // temporary calculation
        ],
    })
    const { data, write } = useContractWrite(config)
    const { isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Set password", path: "/setup/self-hosted/password" },
        { name: "Enable recovery service", path: "/setup/self-hosted/password/set-inactivity" },
        { name: "Review", path: "/setup/self-hosted/password/review" },
    ]

    const displayFields = [
        {
            label: "Mode",
            value: "Self hosted recovery",
        },
        {
            label: "Setup",
            value: "Set a password",
        },
        {
            label: "Password (hashed)",
            value: context.passwordHash ? shortenAddress(context.passwordHash) : "",
        },
        {
            label: "Inactivity period",
            value: context.inactivityPeriodInDays ? `${context.inactivityPeriodInDays} days` : "",
        },
    ]

    return (
        <ReviewContainer
            pathObject={pathObject}
            displayFields={displayFields}
            data={data}
            write={write}
            isSuccess={isSuccess}
        />
    )
}

export default Review
