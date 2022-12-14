import { FormDataContext, ISetContractContext } from "pages/_app"
import { FormEvent, useContext, useRef, useState } from "react"
import { useRouter } from "next/router"
import { TextFormField, NextPageButton } from "components"

const RecoveryAddressForm = ({ nextPageRoute, mode }: { nextPageRoute: string; mode: "setup" | "recovery" }) => {
    const { context, setContext } = useContext(FormDataContext) as ISetContractContext
    const [address, setAddress] = useState<string>("")
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/g)) {
            return
        }
        setContext({
            ...context,
            [mode === "setup" ? "recoveryAddress" : "targetRecoveryAddress"]: address,
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
                <div className="flex flex-col w-full gap-2">
                    <TextFormField
                        label="Recovery address"
                        placeholder="0x123...456"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                        autoFocus={true}
                        classes={
                            address
                                ? address.match(/^0x[a-fA-F0-9]{40}$/g)
                                    ? "border-green-500"
                                    : "border-red-500"
                                : "border-white"
                        }
                    />
                </div>
            </div>
            <NextPageButton nextPageRoute={nextPageRoute} formRef={formRef} />
        </form>
    )
}

export default RecoveryAddressForm
