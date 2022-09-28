import Image from "next/image"
import { useState } from "react"

type assetProps = {
    asset: string
    symbol: string
    imageUrl: string
    amount: number
    selected: boolean
}

const AssetSelector = () => {
    const [assets, setAssets] = useState<Array<assetProps>>([
        {
            asset: "Ethereum",
            symbol: "ETH",
            imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
            amount: 0.01,
            selected: false,
        },
        {
            asset: "Polkadot",
            symbol: "DOT",
            imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
            amount: 1.95,
            selected: false,
        },
        {
            asset: "Bitcoin",
            symbol: "BTC",
            imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
            amount: 0.058,
            selected: false,
        },
        {
            asset: "Avalanche",
            symbol: "AVAX",
            imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
            amount: 15.98,
            selected: false,
        },
    ])

    const toggleSelected = (asset: string) => {
        setAssets(
            assets.map((ast) => {
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
                {assets.map((ast, i) => (
                    <AssetEntry assetData={ast} toggleSelected={toggleSelected} key={i} />
                ))}
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
