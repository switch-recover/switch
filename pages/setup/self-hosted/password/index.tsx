import { BodyLayout, MenuBar, PasswordEntry, SideBar, TitleDescription } from "components"

const SetPassword = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Set password", path: "/setup/self-hosted/password" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Set password"
                        description={[
                            "The password will be used to recover your assets. ",
                            <strong key={1}>Use a secure password and do not share it with anyone else. </strong>,
                            "Anyone with access to your password will be able to claim all of your assets if your account becomes lost.",
                            <br key={2} />,
                            <br key={3} />,
                            <strong key={4}>You cannot change your password after setting it. </strong>,
                            "Make sure you choose something secure that you will remember in a few years’ time.",
                        ]}
                    />
                    <PasswordEntry nextPageRoute="/setup/self-hosted/password/set-inactivity" />
                </BodyLayout>
            </div>
        </div>
    )
}

export default SetPassword
