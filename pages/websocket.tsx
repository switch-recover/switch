import { useEffect, useState } from "react"
import axios from "axios"
import { ethers } from "ethers"
import { Button } from "components"

const webSocket = () => {
    const [socketInfo, setSocketInfo] = useState()
    const [userID, setUserID] = useState()

    const NODE_ENV = "production"
    const serverUrl = NODE_ENV === "development" ? "http://localhost:8080" : "https://switch-web-hooks.herokuapp.com"
    const websocketUrl = NODE_ENV === "development" ? "ws://localhost:8080" : "ws://switch-web-hooks.herokuapp.com"

    useEffect(() => {
        const ws = new WebSocket(websocketUrl)

        ws.onopen = () => {
            console.log("Socket opened")
            ws.onmessage = (message) => {
                const data = JSON.parse(message.data)
                setUserID(data.userID)
                setSocketInfo(JSON.parse(message.data))
            }
        }

        ws.onclose = () => {
            console.log("Socket closed")
        }

        ws.onmessage = (message) => {
            const data = message.data
            setSocketInfo(JSON.parse(data))
            console.log(data)
        }

        return () => {
            ws.close()
        }
    }, [])

    const callFossil = async () => {
        const getLatestBlock = async () => {
            const provider = ethers.providers.getDefaultProvider("goerli")
            const latestBlock = await provider.getBlock("latest")
            return latestBlock.number
        }
        const latestBlock = await getLatestBlock()
        console.log("latest block: " + latestBlock)

        axios
            .post(`${serverUrl}/call-fossil`, {
                account: "0xeb73F28e71816d32e09C5fDd1B1C2382a2e782a6",
                blockNumber: latestBlock,
                duration: 40,
                userID: userID,
            })
            .then((result) => console.log(result.data))
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div>{userID ? userID : ""}</div>
            <div>{JSON.stringify(socketInfo)}</div>
            <div>{socketInfo && "webHookCurr" in socketInfo ? socketInfo["webHookCurr"] : ""}</div>
            <div>{socketInfo && "webHookHist" in socketInfo ? socketInfo["webHookHist"] : ""}</div>
            <Button label="Call Herodotus api" callback={callFossil} />
        </>
    )
}

export default webSocket
