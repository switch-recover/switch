import { BodyLayout, MenuBar, DialogButton, TitleDescription, SideBar } from "components"

const TrustedAgentRecovery = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Trusted Agent recovery", path: "/setup/trusted-agent" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Trusted Agent recovery"
                        description={[
                            "In case you lose your account, your assets will be transferred to our Trusted Agents, who will be legally obliged to return the assets to you.",
                            <br key={1} />,
                            <br key={2} />,
                            "To access the funds, we require at least 3 Trusted Agents to approve the transaction. This ensures your assets remain secure whilst under custody of our Trusted Agents.",
                        ]}
                    />
                    <DialogButton
                        location="/setup/trusted-agent/legal"
                        header="Setup your legal identification"
                        text="To recover your assets, we will need to identify you using a legal document such as a passport or a driver’s licence. "
                        logo="/certified.png"
                        colorScheme="theme"
                    />
                </BodyLayout>
            </div>
        </div>
    )
}

export default TrustedAgentRecovery
