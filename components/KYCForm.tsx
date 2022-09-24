import Link from "next/link"
import { FormEvent, useRef, useState } from "react"
import { TextFormField, DateFormField, CountrySelector, DocumentTypeSelector } from "components"

const KYCForm = ({ nextPageRoute }: { nextPageRoute: string }) => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [DOB, setDOB] = useState<string>()
    const [country, setCountry] = useState<string>("")
    const [docType, setDocType] = useState<string>("")
    const [docNumber, setDocNumber] = useState<string>("")
    const formRef = useRef<HTMLFormElement>(null)

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        return
    }

    const triggerSubmitForm = () => {
        if (formRef) formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
    }

    return (
        <form onSubmit={(e) => submitForm(e)} ref={formRef}>
            <div className="flex w-full px-6 py-6 justify-between rounded-xl bg-white gap-12 mx-2">
                <div className="grid grid-cols-2 gap-5">
                    <TextFormField
                        label="Legal first name"
                        placeholder="Satoshi"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextFormField
                        label="Legal last name"
                        placeholder="Nakamoto"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <DateFormField
                        label="Date of birth"
                        value={DOB ? DOB : ""}
                        onChange={(e) => setDOB(e.target.value)}
                    />
                    <CountrySelector
                        label="Country of origin"
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <DocumentTypeSelector docType={docType} setDocType={setDocType} />
                    <TextFormField
                        label="Legal document number"
                        placeholder="ABC123456"
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                    />
                </div>
            </div>
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
        </form>
    )
}

export default KYCForm
