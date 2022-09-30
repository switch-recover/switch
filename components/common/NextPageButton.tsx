import Link from "next/link"
import { RefObject } from "react"

const NextPageButton = ({
    nextPageRoute,
    formRef,
}: {
    nextPageRoute: string
    formRef: RefObject<HTMLFormElement> | null
}) => {
    const triggerSubmitForm = () => {
        if (formRef) formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
    }

    return (
        <div className="w-full flex justify-end text-xs font-semibold mt-4 text-gray-400 hover:text-gray-800">
            <span onClick={() => triggerSubmitForm()} className="cursor-pointer">
                Continue (Enter ⏎)
            </span>
        </div>
    )
}

export default NextPageButton
