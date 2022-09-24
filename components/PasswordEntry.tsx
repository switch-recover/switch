import Link from "next/link"
import Image from "next/image"
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useRouter } from "next/router"

const PasswordEntry = ({ nextPageRoute }: { nextPageRoute: string }) => {
    const [password, setPassword] = useState<string>("")
    const [confirmation, setConfirmation] = useState<string>("")
    const { context, setContext } = useContext(FormDataContext) as ISetContractContext
    const router = useRouter()

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!password || !confirmation) return
        if (password !== confirmation) return
        setContext({
            ...context,
            passwordHash: password,
        })
        router.push(nextPageRoute)
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <div className="flex w-full px-6 py-6 justify-between rounded-xl bg-white gap-12 mx-2">
                <div className="flex flex-col w-full gap-5">
                    <Entry label="New password" password={password} setPassword={setPassword} />
                    <Entry label="Confirm password" password={confirmation} setPassword={setConfirmation} />
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

type EntryProps = {
    label: string
    password: string
    setPassword: Dispatch<SetStateAction<string>>
}

const Entry = ({ label, password, setPassword }: EntryProps) => {
    const [hidden, setHidden] = useState(true)

    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-xs font-semibold">{label}</label>
            <div className="flex rounded-md bg-gray-100 w-full px-3 py-1 gap-2">
                <input
                    type="text"
                    className="w-full outline-none text-gray-800 bg-gray-100 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex items-center justify-center">
                    <Image src="/view.png" width="20" height="20" className="" />
                </div>
            </div>
        </div>
    )
}

export default PasswordEntry
