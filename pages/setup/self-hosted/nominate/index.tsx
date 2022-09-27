import { BodyLayout, MenuBar, TitleDescription, RecoveryAddressForm, SideBar } from "components"

const NominateRecoveryAddress = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Nominate a recovery address", path: "/setup/self-hosted/nominate" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <SideBar />
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
