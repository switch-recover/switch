import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"
const { abi: GatewayContractABI } = require("contracts/abis/GatewayContract.json")
const { abi: ERC20FakeABI } = require("contracts/abis/ERC20Fake.json")
import addresses from "contracts/deployments"
import { FormDataContext, ISetContractContext } from "pages/_app"

export type assetProps = {
    asset: string
    symbol: string
    address: string
    imageUrl: string
    amount: number
    selected: boolean
}

const AssetSelector = ({
    assets,
    setAssets,
}: {
    assets: Array<assetProps> | undefined
    setAssets: Dispatch<SetStateAction<Array<assetProps> | undefined>>
}) => {
    const toggleSelected = (asset: string) => {
        setAssets(
            assets?.map((ast) => {
                if (ast.asset === asset) {
                    return {
                        ...ast,
                        selected: !ast.selected,
                    }
                } else return ast
            })
        )
    }

    return (
        <div className="flex mx-8 px-4 py-4 justify-between rounded-xl bg-white gap-12">
            <div className="flex flex-col w-full gap-2 item-center h-52 overflow-y-scroll">
                {assets
                    ? assets.map((ast, i) => <AssetEntry assetData={ast} toggleSelected={toggleSelected} key={i} />)
                    : "No assets found"}
            </div>
        </div>
    )
}

const AssetEntry = ({
    assetData,
    toggleSelected,
}: {
    assetData: assetProps
    toggleSelected: (asset: string) => void
}) => {
    const { context } = useContext(FormDataContext) as ISetContractContext
    const [approved, setApproved] = useState<boolean>(false)

    const { data: recoveryAddress } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToRecoveryContract",
        args: [context.targetRecoveryAddress],
    })

    const { data: allowance } = useContractRead({
        addressOrName: assetData.address,
        contractInterface: ERC20FakeABI,
        functionName: "allowance",
        args: [context.targetRecoveryAddress, recoveryAddress],
    })

    useEffect(() => {
        if (allowance && Number(allowance) > 0) setApproved(true)
        else setApproved(false)
    }, [allowance])

    if (!approved) return <></>

    return (
        <div
            className="flex items-center w-full justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 active:bg-gray-200 select-none pr-4"
            onClick={() => toggleSelected(assetData.asset)}
        >
            <div className="flex items-center gap-3">
                <Image src={assetData.imageUrl} height="32" width="32" alt={assetData.asset} className="rounded-full" />
                <span className="text-sm">{`${assetData.amount} ${assetData.symbol}`}</span>
            </div>
            {assetData.selected ? <Image src="/select.png" height="16" width="16" alt="Select" /> : <></>}
        </div>
    )
}

export default AssetSelector
