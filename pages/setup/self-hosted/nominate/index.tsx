import { MenuBar, TitleDescription, RecoveryAddressForm } from "components"
import { BodyLayout } from "layouts"

const NominateRecoveryAddress = () => {
    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Nominate a recovery address", path: "/setup/self-hosted/nominate" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Nominate a recovery address"
                        description="This is the address where you assets will be sent if you lose your account. You can change this address later, but it will cost you some gas fees to do so."
                    />
                    <RecoveryAddressForm nextPageRoute="/setup/self-hosted/nominate/set-inactivity" />
                </BodyLayout>
            </div>
        </div>
    )
}

export default NominateRecoveryAddress
