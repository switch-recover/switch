import { MenuBar, NumberSelector, TitleDescription } from "components"
import { BodyLayout } from "layouts"

type pathObjectProp = {
    name: string
    path: string
}

const SetInactivityContainer = ({
    pathObject,
    nextPageRoute,
}: {
    pathObject: Array<pathObjectProp>
    nextPageRoute: string
}) => {
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
                            <br key={1} />,
                            <br key={2} />,
                            "The contract works as follows: it monitors your account for inactivity (meaning a lack of outgoing transactions from your account). Once the set inactivity period has passed, your account will be marked as inactive and you can initiate the recovery process.",
                            <br key={3} />,
                            <br key={4} />,
                            "In other words, the inactivity period is the length of time you must wait before you can recover your assets (measured from the moment you lose your account). ",
                            <strong key={5}>
                                But beware, an inactivity period that is too short could mean accidentally triggering
                                account recovery simply because you have not used your account recently.
                            </strong>,
                        ]}
                    />
                    <NumberSelector id="inactivityPeriodInDays" placeholder={365} nextPageRoute={nextPageRoute} />
                </BodyLayout>
            </div>
        </div>
    )
}

export default SetInactivityContainer
