import { FormDataContext, ISetContractContext } from "pages/_app"
import { FormEvent, useContext, useRef, useState } from "react"
import { useRouter } from "next/router"
import { TextFormField } from "components"
import NextPageButton from "./NextPageButton"

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
            <NextPageButton nextPageRoute={nextPageRoute} formRef={formRef} />
        </form>
    )
}

export default RecoveryAddressForm
