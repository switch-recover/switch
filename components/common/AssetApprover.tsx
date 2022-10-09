import addresses from "contracts/deployments"
import { ethers } from "ethers"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi"
const { abi: GatewayContractABI } = require("contracts/abis/GatewayContract.json")
const { abi: ERC20FakeABI } = require("contracts/abis/ERC20Fake.json")

export type assetProps = {
    asset: string
    symbol: string
    address: string
    imageUrl: string
    amount: number
    selected: boolean
}

const AssetApprover = ({
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
    const [approved, setApproved] = useState<boolean>(false)
    const { address } = useAccount()

    const { data: recoveryAddress } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToRecoveryContract",
        args: [address],
    })

    const { data: allowance } = useContractRead({
        addressOrName: assetData.address,
        contractInterface: ERC20FakeABI,
        functionName: "allowance",
        args: [address, recoveryAddress],
    })

    useEffect(() => {
        if (allowance && Number(allowance) > 0) setApproved(true)
        else setApproved(false)
    }, [allowance])

    const { config: setApprovalConfig } = usePrepareContractWrite({
        addressOrName: assetData.address,
        contractInterface: ERC20FakeABI,
        functionName: "approve",
        args: [recoveryAddress, ethers.constants.MaxUint256],
    })

    const { write: writeSetApproval } = useContractWrite(setApprovalConfig)

    const { config: revokeApprovalConfig } = usePrepareContractWrite({
        addressOrName: assetData.address,
        contractInterface: ERC20FakeABI,
        functionName: "approve",
        args: [recoveryAddress, 0],
    })

    const { write: writeRevokeApproval } = useContractWrite(revokeApprovalConfig)

    return (
        <div
            className="flex items-center w-full justify-between p-2 rounded-lgselect-none pr-4"
            onClick={() => toggleSelected(assetData.asset)}
        >
            <div className="flex items-center gap-3">
                <Image src={assetData.imageUrl} height="32" width="32" alt={assetData.asset} className="rounded-full" />
                <span className="text-sm">{`${assetData.amount} ${assetData.symbol}`}</span>
            </div>
            {approved ? (
                <RevokeButton label="Revoke" callback={() => writeRevokeApproval?.()}></RevokeButton>
            ) : (
                <ApproveButton label="Approve" callback={() => writeSetApproval?.()}></ApproveButton>
            )}
        </div>
    )
}

const ApproveButton = ({ label, callback }: { label: string; callback: () => void }) => {
    return (
        <div
            className={`flex justify-center items-center text-sm w-20 h-8 p-1 rounded bg-theme-lighter hover:bg-theme-light active:bg-theme cursor-pointer select-none`}
            onClick={callback}
        >
            <span className="font-semibold">{label}</span>
        </div>
    )
}

const RevokeButton = ({ label, callback }: { label: string; callback: () => void }) => {
    return (
        <div
            className={`flex justify-center items-center text-sm w-20 h-8 p-1 rounded bg-red-100 hover:bg-red-200 active:bg-red-100 cursor-pointer select-none`}
            onClick={callback}
        >
            <span className="font-semibold">{label}</span>
        </div>
    )
}

export default AssetApprover
