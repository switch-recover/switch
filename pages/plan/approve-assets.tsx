import { AssetApprover, BodyLayout, Button, MenuBar, SideBar, TitleDescription } from "components"
import addresses from "contracts/deployments"
import { parseEther } from "ethers/lib/utils"
import { useEffect, useState } from "react"
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi"
const { abi: ERC20FakeABI } = require("contracts/abis/ERC20Fake.json")
import type { assetProps } from "components/common/AssetSelector"

const ApproveAssets = () => {
    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recovery plan", path: "/plan" },
        { name: "Approve assets", path: "/plan/approve-assets" },
    ]

    const [assets, setAssets] = useState<Array<assetProps>>()
    const { address } = useAccount()

    useEffect(() => {
        const getBalances = async () => {
            const response = await fetch(`/api/token-balances/${address}`, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            setAssets(data)
        }
        try {
            getBalances()
        } catch (err) {
            console.error(err)
        }
    }, [])

    const { config: USDCConfig } = usePrepareContractWrite({
        addressOrName: addresses.L1FakeUSDC,
        contractInterface: ERC20FakeABI,
        functionName: "_mint",
        args: [address, String(parseEther("1000"))],
    })

    const { config: UNIConfig } = usePrepareContractWrite({
        addressOrName: addresses.L1FakeUNI,
        contractInterface: ERC20FakeABI,
        functionName: "_mint",
        args: [address, String(parseEther("100"))],
    })

    const { config: WETHConfig } = usePrepareContractWrite({
        addressOrName: addresses.L1FakeWETH,
        contractInterface: ERC20FakeABI,
        functionName: "_mint",
        args: [address, String(parseEther("10"))],
    })

    const { write: writeUSDC } = useContractWrite(USDCConfig)
    const { write: writeUNI } = useContractWrite(UNIConfig)
    const { write: writeWETH } = useContractWrite(WETHConfig)

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full relative overflow-scroll">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Approve assets for recovery"
                        description="Please select the assets you would like to approve for recovery. You will need to sign a transaction to approve each new asset in the next screen."
                    />
                    <div className="flex mx-8 gap-3">
                        <Button label="Mint test USDC" callback={() => writeUSDC?.()} />
                        <Button label="Mint test UNI" callback={() => writeUNI?.()} />
                        <Button label="Mint test WETH" callback={() => writeWETH?.()} />
                    </div>
                    <AssetApprover assets={assets} setAssets={setAssets} />
                </BodyLayout>
            </div>
        </div>
    )
}

export default ApproveAssets
