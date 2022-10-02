import { AssetSelector, BodyLayout, Button, MenuBar, SideBar, TitleDescription } from "components"

const ApproveAssets = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recovery plan", path: "/plan" },
        { name: "Approve assets", path: "/plan/approve-assets" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full relative">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Approve assets for recovery"
                        description="Please select the assets you would like to approve for recovery. You will need to sign a transaction to approve each new asset in the next screen."
                    />
                    <AssetSelector />
                    <div className="flex flex-col mx-8">
                        <Button label="Confirm selection" callback={() => {}} />
                    </div>
                </BodyLayout>
            </div>
        </div>
    )
}

export default ApproveAssets
