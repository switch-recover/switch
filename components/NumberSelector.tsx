import Link from "next/link"
import { useRouter } from "next/router"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { FormEvent, useContext, useState } from "react"

type NumberSelectorProps = {
    id: string
    placeholder: number
    nextPageRoute: string
}

const NumberSelector = ({ id, placeholder, nextPageRoute }: NumberSelectorProps) => {
    const [amount, setAmount] = useState<number>(placeholder)
    const { context, setContext } = useContext(FormDataContext) as ISetContractContext
    const router = useRouter()

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!amount) return
        setContext({
            ...context,
            [id]: amount,
        })
        router.push(nextPageRoute)
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <div className="flex w-full px-6 py-6 justify-between rounded-xl bg-white gap-12 mx-2">
                <div className="flex flex-col w-full gap-2">
                    <div className="flex flex-col w-full gap-2">
                        <label className="text-xs font-semibold">Inactivity period (days)</label>
                        <input
                            type="number"
                            placeholder="365"
                            className="w-full bg-gray-100 px-3 py-1 rounded-md outline-none text-gray-800"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
            <Link href={nextPageRoute}>
                <a>
                    <div className="w-full text-right text-xs font-semibold mt-4 cursor-pointer text-gray-400 hover:text-gray-800">
                        Continue (Enter ⏎)
                    </div>
                </a>
            </Link>
        </form>
    )
}

export default NumberSelector
