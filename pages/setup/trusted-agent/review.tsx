import { ReviewContainer } from "components"
import addresses from "contracts/deployments"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useContext } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
const { abi: RecoveryContractFactoryABI } = require("contracts/abis/RecoveryContractFactory.json")

const Review = () => {
    const { context } = useContext(FormDataContext) as ISetContractContext

    const { config } = usePrepareContractWrite({
        addressOrName: addresses.L1RecoveryContractFactory,
        contractInterface: RecoveryContractFactoryABI,
        functionName: "deployTrustedAgentRecoveryContract",
        args: [
            context.legalDocumentsHash,
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
        { name: "Trusted Agent recovery", path: "/setup/trusted-agent" },
        { name: "Setup your legal identification", path: "/setup/trusted-agent/legal" },
        { name: "Enable recovery service", path: "/setup/trusted-agent/set-inactivity" },
        { name: "Review", path: "/setup/trusted-agent/review" },
    ]

    const displayFields = [
        {
            label: "Mode",
            value: "Trusted agent",
        },
        {
            label: "Legal first name",
            value: context.firstName ? context.firstName : "",
        },
        {
            label: "Legal last name",
            value: context.lastName ? context.lastName : "",
        },
        {
            label: "Date of birth",
            value: context.dateOfBirth ? context.dateOfBirth : "",
        },
        {
            label: "Country of origin",
            value: context.countryOfOrigin ? context.countryOfOrigin : "",
        },
        {
            label: "Legal document type",
            value: context.legalDocumentType ? context.legalDocumentType : "",
        },
        {
            label: "Legal document number",
            value: context.legalDocumentNumber ? context.legalDocumentNumber : "",
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
