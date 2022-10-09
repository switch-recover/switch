import type { NextApiRequest, NextApiResponse } from "next"
import * as dotenv from "dotenv"
dotenv.config()

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = req.query
    console.log(`https://api.covalenthq.com/v1/5/address/${address}/balances_v2/?key=${process.env.COVALENT_API_KEY}`)
    try {
        const response = await fetch(
            `https://api.covalenthq.com/v1/5/address/${address}/balances_v2/?key=${process.env.COVALENT_API_KEY}`,
            {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const data = await response.json()
        console.log(data.data.items)
        res.status(200).json(
            data.data.items
                .map((asset: any) => {
                    const returnedData = {
                        asset: asset.contract_name,
                        symbol: asset.contract_ticker_symbol,
                        address: asset.contract_address,
                        imageUrl: asset.logo_url,
                        amount: Number(asset.balance) / 10 ** 18,
                        selected: false,
                    }
                    return returnedData
                })
                .filter((asset: any) => asset.asset !== "Ether")
        )
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: err })
    }
}

export default Handler
