import { BodyLayout, AssetSelector, Button, DisplayList, MenuBar, SideBar, TitleDescription } from "components"
import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi"
import addresses from "contracts/deployments"
import { assetProps } from "components/common/AssetSelector"
import { FormDataContext, ISetContractContext } from "pages/_app"
const { abi: GatewayContractABI } = require("contracts/abis/GatewayContract.json")
const { abi: RecoveryContractABI } = require("contracts/abis/RecoveryContract.json")

const RecoverSelfHosted = () => {
    const { context } = useContext(FormDataContext) as ISetContractContext
    const [periodElapsed, setPeriodElapsed] = useState<boolean>(false)
    const { address } = useAccount()

    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recover a lost wallet", path: "/recover" },
        { name: "Recovery plan details", path: "/recover/details" },
        { name: "Recover assets", path: "/recover/self-hosted/nominate" },
    ]

    const { data: recoveryAddress } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToRecoveryContract",
        args: [context.targetRecoveryAddress],
    })

    const { data: recipient } = useContractRead({
        addressOrName: String(recoveryAddress),
        contractInterface: RecoveryContractABI,
        functionName: "recipient",
        args: [],
    })

    const { data: isActive } = useContractRead({
        addressOrName: String(recoveryAddress),
        contractInterface: RecoveryContractABI,
        functionName: "isActive",
        args: [],
    })

    useEffect(() => {
        setPeriodElapsed(Boolean(isActive))
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full overflow-scroll">
                <SideBar />
                <BodyLayout path={pathObject}>
                    {address === String(recipient) ? (
                        periodElapsed ? (
                            <PeriodElapsed />
                        ) : (
                            <PeriodNotElapsed />
                        )
                    ) : (
                        <WrongAddress />
                    )}
                </BodyLayout>
            </div>
        </div>
    )
}

const PeriodElapsed = () => {
    const recoveryDetails = [
        {
            label: "Withdrawal address",
            value: "0x123...456",
        },
    ]

    const [assets, setAssets] = useState<Array<assetProps>>()
    const { context } = useContext(FormDataContext) as ISetContractContext

    useEffect(() => {
        const getBalances = async () => {
            const response = await fetch(`/api/token-balances/${context.targetRecoveryAddress}`, {
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

    const { data: recoveryAddress } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToRecoveryContract",
        args: [context.targetRecoveryAddress],
    })

    const { config: claimAssetsConfig } = usePrepareContractWrite({
        addressOrName: String(recoveryAddress),
        contractInterface: RecoveryContractABI,
        functionName: "claimAssets",
        args: [
            assets ? assets.filter((ass) => ass.selected).map((ass) => ass.address) : [],
            assets ? assets.filter((ass) => ass.selected).map((ass) => ass.amount) : [],
        ],
    })

    console.log(claimAssetsConfig)

    const { write: writeClaimAssets } = useContractWrite(claimAssetsConfig)

    return (
        <>
            <TitleDescription
                title="Recover assets"
                description="The inactivity period has now passed and you can reclaim your assets. Please select the assets you would like to withdraw and check that the withdrawal address is correct."
            />
            <AssetSelector assets={assets} setAssets={setAssets} />
            <div className="mx-6 flex flex-col">
                <DisplayList fields={recoveryDetails} />
            </div>
            <div className="flex flex-col mx-8">
                <Button label="Recover assets" callback={() => writeClaimAssets?.()} />
            </div>
        </>
    )
}

const PeriodNotElapsed = () => {
    const recoveryDetails = [
        {
            label: "Inactivity period remaining",
            value: "10 months, 21 days",
        },
    ]
    return (
        <>
            <TitleDescription
                title="Recover assets"
                description="Unfortunately the inactivity period has not yet fully elapsed and you will still need to wait some time before your assets can be recovered. Please check back once the inactivity period has passed."
            />
            <div className="mx-6 flex flex-col">
                <DisplayList fields={recoveryDetails} />
            </div>
            <div className="flex flex-col mx-8">
                <Link href="/recover/details">
                    <a>
                        <Button label="← Go back" callback={() => {}} />
                    </a>
                </Link>
            </div>
        </>
    )
}

const WrongAddress = () => {
    return (
        <>
            <TitleDescription
                title="Recover assets"
                description="You can only recover the assets if you are the nominated recipient. Please switch to the recipient account to proceed."
            />
            <div className="flex flex-col mx-8">
                <Link href="/recover/details">
                    <a>
                        <Button label="← Go back" callback={() => {}} />
                    </a>
                </Link>
            </div>
        </>
    )
}

export default RecoverSelfHosted
