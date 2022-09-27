import { BodyLayout, MenuBar, DialogButton, TitleDescription, SideBar } from "components"

const Home = () => {
    const pathObject = [{ name: "Home", path: "/" }]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Welcome to Switch"
                        description="Switch is the first trustless and fully on-chain recovery solution for your Ethereum wallet. Get started by setting up your wallet for Switch, or recover your lost assets below."
                    />
                    <DialogButton
                        location="/setup"
                        header="Setup a new wallet"
                        text="Setup a new wallet so that you’ll be able to recover your assets in case you ever lose it."
                        logo="/leaf.png"
                        colorScheme="theme"
                    />
                    <DialogButton
                        location="/recover"
                        header="Recover a lost wallet"
                        text="Setup a new wallet so that you’ll be able to recover your assets in case you ever lose it."
                        logo="/recover.png"
                        colorScheme="gray"
                    />
                </BodyLayout>
            </div>
        </div>
    )
}

export default Home
