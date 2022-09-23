import { MenuBar, DialogButton, TitleDescription } from "components"
import { BodyLayout } from "layouts"

const Setup = () => {
    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Setup a new wallet"
                        description="You now have two options for setting up your new wallet. The first option is entirely trustless, but requires you to manage your own recovery. The second option passes responsibility for recovering your assets to a Trusted Agent, who will recover the assets on your behalf."
                    />
                    <DialogButton
                        location="/setup/trusted-agent"
                        header="Setup recovery through Trusted Agent (recommended)"
                        text="A group of Trusted Agents will manage recovery on your behalf. This option is recommended for most users."
                        logo="/shield.png"
                        colorScheme="theme"
                    />
                    <DialogButton
                        location="/setup/self-hosted"
                        header="Setup self hosted recovery"
                        text="You will manage your own recovery. This option is recommended for more experienced users."
                        logo="/recover.png"
                        colorScheme="gray"
                    />
                </BodyLayout>
            </div>
        </div>
    )
}

export default Setup
