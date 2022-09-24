import { ReviewContainer } from "components"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useContext } from "react"
import { shortenAddress } from "utils/shortenAddress"

const Review = () => {
    const { context } = useContext(FormDataContext) as ISetContractContext

    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Nominate a recovery address", path: "/setup/self-hosted/nominate" },
        { name: "Enable recovery service", path: "/setup/self-hosted/nominate/set-inactivity" },
        { name: "Review", path: "/setup/self-hosted/nominate/review" },
    ]

    const displayFields = [
        {
            label: "Mode",
            value: "Self hosted recovery",
        },
        {
            label: "Setup",
            value: "Nominate a recovery address",
        },
        {
            label: "Recovery address",
            value: context.recoveryAddress ? shortenAddress(context.recoveryAddress) : "",
        },
        {
            label: "Inactivity period",
            value: context.inactivityPeriodInDays ? `${context.inactivityPeriodInDays} days` : "",
        },
    ]

    return <ReviewContainer pathObject={pathObject} displayFields={displayFields} />
}

export default Review
