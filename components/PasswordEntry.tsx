import Link from "next/link"
import Image from "next/image"
import { Dispatch, FormEvent, SetStateAction, useContext, useRef, useState } from "react"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useRouter } from "next/router"

const PasswordEntry = ({ nextPageRoute }: { nextPageRoute: string }) => {
    const [password, setPassword] = useState<string>("")
    const [confirmation, setConfirmation] = useState<string>("")
    const [hidden, setHidden] = useState(true)
    const { context, setContext } = useContext(FormDataContext) as ISetContractContext
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!password || !confirmation) {
            console.log("missing password or confirmation")
            return
        }
        if (password !== confirmation) {
            console.log("password mismatched")
            return
        }
        setContext({
            ...context,
            passwordHash: password,
        })
        console.log(context)
        router.push(nextPageRoute)
    }

    const triggerSubmitForm = () => {
        if (formRef) formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
    }

    return (
        <form
            onSubmit={(e) => submitForm(e)}
            ref={formRef}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    submitForm(e)
                }
            }}
        >
            <div className="flex w-full px-6 py-6 justify-between rounded-xl bg-white gap-12 mx-2">
                <div className="flex flex-col w-full gap-5">
                    <Entry
                        label="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus={true}
                        hidden={hidden}
                        setHidden={setHidden}
                    />
                    <Entry
                        label="Confirm password"
                        value={confirmation}
                        onChange={(e) => setConfirmation(e.target.value)}
                        autoFocus={false}
                        hidden={hidden}
                        setHidden={setHidden}
                    />
                </div>
            </div>
            <div
                className="w-full text-right text-xs font-semibold mt-4 cursor-pointer text-gray-400 hover:text-gray-800"
                onClick={() => triggerSubmitForm()}
            >
                Continue (Enter ⏎)
            </div>
        </form>
    )
}

type EntryProps = {
    label: string
    value: string
    onChange: (e: any) => void
    autoFocus: boolean
    hidden: boolean
    setHidden: Dispatch<SetStateAction<boolean>>
}

const Entry = ({ label, value, onChange, autoFocus, hidden, setHidden }: EntryProps) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-xs font-semibold">{label}</label>
            <div className="flex rounded-md bg-gray-100 w-full px-3 py-1 gap-2">
                <input
                    autoFocus={autoFocus}
                    type={hidden ? "password" : "text"}
                    className="w-full outline-none text-gray-800 bg-gray-100 rounded-md"
                    value={value}
                    onChange={onChange}
                />
                <div
                    className={`flex items-center justify-center ${value ? "" : "hidden"}`}
                    onClick={() => setHidden(!hidden)}
                >
                    <Image
                        src={hidden ? "/unhide.png" : "/hide.png"}
                        width="20"
                        height="20"
                        className="hover:opacity-60 active:opacity-40 cursor-pointer"
                        alt="Toggle hide"
                    />
                </div>
            </div>
        </div>
    )
}

export default PasswordEntry
