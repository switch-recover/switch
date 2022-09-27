import { BodyLayout, AssetSelector, Button, DisplayList, MenuBar, SideBar, TitleDescription } from "components"
import { useEffect, useState } from "react"
import Link from "next/link"

const RecoverSelfHosted = () => {
    const [periodElapsed, setPeriodElapsed] = useState<boolean>(true)

    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recover a lost wallet", path: "/recover" },
        { name: "Recovery plan details", path: "/recover/details" },
        { name: "Recover assets", path: "/recover/self-hosted/nominate" },
    ]

    // Check whether plan is active
    // useEffect(() => {}, [])

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <SideBar />
                <BodyLayout path={pathObject}>{periodElapsed ? <PeriodElapsed /> : <PeriodNotElapsed />}</BodyLayout>
            </div>
        </div>
    )
}

const PeriodElapsed = () => {
    const recoveryDetails = [
        {
            label: "Withdrawal access",
            value: "0x123...456",
        },
    ]
    return (
        <>
            <TitleDescription
                title="Recover assets"
                description="The inactivity period has now passed and you can reclaim your assets. Please select the assets you would like to withdraw and check that the withdrawal address is correct."
            />
            <AssetSelector />
            <div className="mx-6 flex flex-col">
                <DisplayList fields={recoveryDetails} />
            </div>
            <div className="flex flex-col mx-8">
                <Button label="Recover assets" callback={() => {}} />
            </div>
        </>
    )
}

const PeriodNotElapsed = () => {
    const recoveryDetails = [
        {
            label: "Inactivity period remaining",
            value: "10 months, 21 days",
        },
    ]
    return (
        <>
            <TitleDescription
                title="Recover assets"
                description="Unfortunately the inactivity period has not yet fully elapsed and you will still need to wait some time before your assets can be recovered. Please check back once the inactivity period has passed."
            />
            <div className="mx-6 flex flex-col">
                <DisplayList fields={recoveryDetails} />
            </div>
            <div className="flex flex-col mx-8">
                <Link href="/recover">
                    <a>
                        <Button label="← Go back" callback={() => {}} />
                    </a>
                </Link>
            </div>
        </>
    )
}

export default RecoverSelfHosted
