import { BodyLayout, MenuBar, DialogButton, TitleDescription, SideBar } from "components"

const Setup = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Setup a new wallet", path: "/setup" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full overflow-scroll">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Setup a new wallet"
                        description="You now have two options for setting up your new wallet. The first option is entirely trustless, but requires you to manage your own recovery. The second option passes responsibility for recovering your assets to a Trusted Agent, who will recover the assets on your behalf."
                    />
                    <DialogButton
                        location="/setup/self-hosted"
                        header="Setup self hosted recovery"
                        text="You will manage your own recovery. This option is recommended for experienced users who would like to manage their assets trustlessly."
                        logo="/recover.png"
                        colorScheme="gray"
                    />
                    <DialogButton
                        location="/setup/trusted-agent"
                        header="Setup recovery through Trusted Agent (recommended)"
                        text="A group of Trusted Agents will manage recovery on your behalf. This option is recommended for most users."
                        logo="/shield.png"
                        colorScheme="theme"
                    />
                </BodyLayout>
            </div>
        </div>
    )
}

export default Setup
