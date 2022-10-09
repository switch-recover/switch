import { BodyLayout, MenuBar, TitleDescription, RecoveryAddressForm, SideBar } from "components"

const Recovery = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recover a lost wallet", path: "/recover" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full overflow-scroll">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Recover a lost wallet"
                        description="You seem to have lost your wallet details. Don’t worry, we’re here to help. To get started, enter the address of the wallet you lost. We will help retrieve your recovery details."
                    />
                    <RecoveryAddressForm nextPageRoute="/recover/details" mode="recovery" />
                </BodyLayout>
            </div>
        </div>
    )
}

export default Recovery
