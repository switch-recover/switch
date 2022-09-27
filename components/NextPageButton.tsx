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
        <Link href={nextPageRoute}>
            <a>
                <div
                    className="w-full text-right text-xs font-semibold mt-4 cursor-pointer text-gray-400 hover:text-gray-800"
                    onClick={() => triggerSubmitForm()}
                >
                    Continue (Enter ⏎)
                </div>
            </a>
        </Link>
    )
}

export default NextPageButton
