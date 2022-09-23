import { StarknetProvider, getInstalledInjectedConnectors } from "@starknet-react/core"

import { MenuBar } from "../components"

const Home = () => {
    const connectors = getInstalledInjectedConnectors()

    return (
        <StarknetProvider connectors={connectors}>
            <div className="flex flex-col w-screen h-screen bg-gray-200">
                <MenuBar />
                <Body />
            </div>
        </StarknetProvider>
    )
}

const Body = () => {
    return <></>
}

export default Home
