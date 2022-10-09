import "react-toastify/dist/ReactToastify.css"
import { BodyLayout, MenuBar, TitleDescription, DisplayList, Button, SideBar } from "components"
import type { UseContractWriteMutationArgs } from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite"
import { useRef } from "react"
import { shortenAddress } from "utils/shortenAddress"
import { toast, ToastContainer } from "react-toastify"
import type { SendTransactionResult } from "@wagmi/core/dist/declarations/src/actions/transactions/sendTransaction"

type pathObjectProp = {
    name: string
    path: string
}

type displayFieldProp = {
    label: string
    value: string
}

type ContractWriteFn = (overrideConfig?: UseContractWriteMutationArgs) => void

const ReviewContainer = ({
    pathObject,
    displayFields,
    write,
    isSuccess,
    data,
}: {
    pathObject: Array<pathObjectProp>
    displayFields: Array<displayFieldProp>
    write: ContractWriteFn | undefined
    isSuccess: boolean
    data: SendTransactionResult | undefined
}) => {
    const toastRef = useRef<any>(null)

    const notify = () => {
        toastRef.current = toast.loading(
            `Deploying contract, tx hash: ${
                data?.hash
                    ? shortenAddress(data?.hash)
                    : "0x405eb1c2e4b496ab40a6b64a6a7b8a75af1fb2ad134d35342a4f498b2b98497e"
            }`
        )
    }

    const dismiss = () => {
        toast.dismiss(toastRef.current)
    }

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full overflow-scroll">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Review"
                        description="Carefully review the settings below before continuing. You can change these settings later, but it will cost you some gas fees to do so."
                    />
                    <DisplayList fields={displayFields} />
                    <div className="px-2 flex flex-col gap-3">
                        {/* <Button label="Deploy recovery service" callback={() => write?.()} /> */}
                        <Button label="Currently disabled" callback={() => {}} />
                    </div>
                </BodyLayout>
            </div>
        </div>
    )
}

export default ReviewContainer
