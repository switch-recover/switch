import { AssetSelector, MenuBar, TitleDescription } from "components"
import { BodyLayout } from "layouts"

const RecoverSelfHosted = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Recover assets"
                        description="The inactivity period has now passed and you can reclaim your assets. Please select the assets you would like to withdraw and check that the withdrawal address is correct."
                    />
                    <AssetSelector />
                </BodyLayout>
            </div>
        </div>
    )
}

export default RecoverSelfHosted
