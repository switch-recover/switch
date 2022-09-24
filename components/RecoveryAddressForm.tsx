import { FormDataContext, ISetContractContext } from "pages/_app"
import { FormEvent, useContext, useRef, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { TextFormField } from "components"

const RecoveryAddressForm = ({ nextPageRoute }: { nextPageRoute: string }) => {
    const { context, setContext } = useContext(FormDataContext) as ISetContractContext
    const [address, setAddress] = useState<string>("")
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!address) return
        setContext({
            ...context,
            recoveryAddress: address,
        })
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
                    <TextFormField
                        label="Recovery address"
                        placeholder="0x123...456"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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

export default RecoveryAddressForm
