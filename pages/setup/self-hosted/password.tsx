import { MenuBar, TitleDescription, FormElement } from "components"
import { BodyLayout } from "layouts"

const SetPassword = () => {
    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Set password", path: "/setup/self-hosted/password" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
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
                    <PasswordEntry />
                </BodyLayout>
            </div>
        </div>
    )
}

const PasswordEntry = () => {
    return <></>
}

export default SetPassword
