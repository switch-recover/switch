import { MenuBar, DialogButton, TitleDescription } from "components"
import { BodyLayout } from "layouts"

const SelfHostedRecovery = () => {
    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
    ]

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Self hosted recovery"
                        description={[
                            "You will need to nominate an address to receive your assets in case you ever lose your account. This could be an address owned by someone you trust, for example, a close family member.",
                            <br key={1} />,
                            <br key={2} />,
                            "Alternatively, you can setup a password now and specify the address later. Be careful, though. ",
                            <strong key={3}>
                                If you forget your password, you will not be able to recover your assets.
                            </strong>,
                        ]}
                    />
                    <DialogButton
                        location="/setup/self-hosted/nominate"
                        header="Nominate a recovery address (recommended)"
                        text="This is the address where you assets will be sent if you lose your account. You can change this address later, but it will cost you some gas fees to do so."
                        logo="/certified.png"
                        colorScheme="theme"
                    />
                    <DialogButton
                        location="/setup/self-hosted/password"
                        header="Setup password now and nominate address later"
                        text="You can specify the recovery address later when recovering your assets."
                        logo="/lock.png"
                        colorScheme="gray"
                    />
                </BodyLayout>
            </div>
        </div>
    )
}

export default SelfHostedRecovery
