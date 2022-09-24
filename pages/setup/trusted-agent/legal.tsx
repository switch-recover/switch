import { KYCForm, MenuBar, TitleDescription } from "components"
import { BodyLayout } from "layouts"

const LegalIdentification = () => {
    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Trusted Agent recovery", path: "/setup/trusted-agent" },
        { name: "Setup your legal identification", path: "/setup/trusted-agent/legal" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Setup your legal identification"
                        description={[
                            "Please enter the information below to assist us with identifying you. We will encrypt and store this information on-chain, to be used by the Trusted Agents to verify your identity upon recovery of your assets.",
                            <br key={1} />,
                            <br key={2} />,
                            "Please make sure you use a legal document that either you, a trusted family members, or lawyer can access during the recovery process.",
                        ]}
                    />
                    <KYCForm nextPageRoute="/setup/trusted-agent/set-inactivity" />
                </BodyLayout>
            </div>
        </div>
    )
}

export default LegalIdentification
