import { ReviewContainer } from "components"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useContext } from "react"

const Review = () => {
    const { context } = useContext(FormDataContext) as ISetContractContext

    const pathObject = [
        { name: "Home", path: "/welcome" },
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
            value: context.passwordHash ? context.passwordHash : "",
        },
        {
            label: "Inactivity period",
            value: context.inactivityPeriodInDays ? `${context.inactivityPeriodInDays} days` : "",
        },
    ]

    return <ReviewContainer pathObject={pathObject} displayFields={displayFields} />
}

export default Review
