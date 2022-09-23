import { MenuBar, NumberSelector, TitleDescription } from "components"
import { BodyLayout } from "layouts"

const SetInactivity = () => {
    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Nominate a recovery address", path: "/setup/self-hosted/nominate" },
        { name: "Enable recovery service", path: "/setup/self-hosted/set-inactivity" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Enable recovery address"
                        description={[
                            "To enable the recovery service, we will deploy a recovery smart contract that is used to return your assets in case your account is lost.",
                            <br />,
                            <br />,
                            "The contract works as follows: it monitors your account for inactivity (meaning a lack of outgoing transactions from your account). Once the set inactivity period has passed, your account will be marked as inactive and you can initiate the recovery process.",
                            <br />,
                            <br />,
                            "In other words, the inactivity period is the length of time you must wait before you can recover your assets (measured from the moment you lose your account). ",
                            <strong>
                                But beware, an inactivity period that is too short could mean accidentally triggering
                                account recovery simply because you have not used your account recently.
                            </strong>,
                        ]}
                    />
                    <NumberSelector
                        id="inactivityPeriodInDays"
                        placeholder={365}
                        nextPageRoute="/setup/self-hosted/review"
                    />
                </BodyLayout>
            </div>
        </div>
    )
}

export default SetInactivity
