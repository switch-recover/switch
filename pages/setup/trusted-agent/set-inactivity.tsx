import { SetInactivityContainer } from "components"

const SetInactivity = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Setup a new wallet", path: "/setup" },
        { name: "Trusted Agent recovery", path: "/setup/trusted-agent" },
        { name: "Setup your legal identification", path: "/setup/trusted-agent/legal" },
        { name: "Enable recovery service", path: "/setup/trusted-agent/set-inactivity" },
    ]

    return <SetInactivityContainer pathObject={pathObject} nextPageRoute="/setup/trusted-agent/review" />
}

export default SetInactivity
