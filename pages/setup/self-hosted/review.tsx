import { MenuBar, NumberSelector, TitleDescription } from "components"
import { BodyLayout } from "layouts"

type displayField = {
    label: string
    value: string
}

const Review = () => {
    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Nominate a recovery address", path: "/setup/self-hosted/nominate" },
        { name: "Enable recovery service", path: "/setup/self-hosted/set-inactivity" },
        { name: "Review", path: "/setup/self-hosted/review" },
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
            value: "0x123...456",
        },
        {
            label: "Inactivity period",
            value: "1 year",
        },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Review"
                        description="Carefully review the settings below before continuing. You can change these settings later, but it will cost you some gas fees to do so."
                    />
                    <DisplayList fields={displayFields} />
                    <DeployContract />
                </BodyLayout>
            </div>
        </div>
    )
}

const DisplayList = ({ fields }: { fields: Array<displayField> }) => {
    return (
        <div className="flex w-full px-6 py-6 justify-between rounded-xl bg-white gap-12 mx-2">
            <div className="flex flex-col w-full gap-5">
                {fields.map((fd: displayField, i: number) => {
                    return (
                        <div className="flex flex-col gap-1" key={i}>
                            <span className="text-xs font-semibold text-gray-400">{fd.label}</span>
                            <span className="text-sm font-semibold text-gray-900">{fd.value}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const DeployContract = () => {
    return (
        <div
            className={`flex justify-center text-sm w-full p-3 rounded-xl bg-theme-lighter hover:bg-theme-light active:bg-theme cursor-pointer select-none`}
        >
            <span className="font-semibold">Deploy recovery service</span>
        </div>
    )
}

export default Review
