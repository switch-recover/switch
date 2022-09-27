import { BodyLayout, MenuBar, SideBar, SpecifyRecoveryAddress, TitleDescription } from "components"

const RecoverSelfHostedPassword = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recover a lost wallet", path: "/recover" },
        { name: "Recovery plan details", path: "/recover/details" },
        { name: "Recover assets", path: "/recover/self-hosted/nominate" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Recover assets"
                        description="The inactivity period has now passed and you can reclaim your assets. Please select the assets you would like to withdraw and check that the withdrawal address is correct."
                    />
                    <SpecifyRecoveryAddress nextPageRoute="/" />
                </BodyLayout>
            </div>
        </div>
    )
}

export default RecoverSelfHostedPassword
