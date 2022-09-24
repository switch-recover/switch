import { SetInactivityContainer } from "components"

const SetInactivity = () => {
    const pathObject = [
        { name: "Home", path: "/welcome" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Set password", path: "/setup/self-hosted/password" },
        { name: "Enable recovery service", path: "/setup/self-hosted/password/set-inactivity" },
    ]

    return <SetInactivityContainer pathObject={pathObject} nextPageRoute="/setup/self-hosted/password/review" />
}

export default SetInactivity
