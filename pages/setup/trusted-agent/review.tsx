import { ReviewContainer } from "components"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useContext } from "react"

const Review = () => {
    const { context } = useContext(FormDataContext) as ISetContractContext

    const pathObject = [
        { name: "Home", path: "/welcome" },
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

    return <ReviewContainer pathObject={pathObject} displayFields={displayFields} />
}

export default Review
