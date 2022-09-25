import { SetInactivityContainer } from "components"

const SetInactivity = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Self hosted recovery", path: "/setup/self-hosted" },
        { name: "Nominate a recovery address", path: "/setup/self-hosted/nominate" },
        { name: "Enable recovery service", path: "/setup/self-hosted/nominate/set-inactivity" },
    ]

    return <SetInactivityContainer pathObject={pathObject} nextPageRoute="/setup/self-hosted/nominate/review" />
}

export default SetInactivity
