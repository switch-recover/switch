import Link from "next/link"
import { FormEvent, useState } from "react"
import { TextFormField, DateFormField, DropdownSelector } from "components"

const KYCForm = ({ nextPageRoute }: { nextPageRoute: string }) => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [DOB, setDOB] = useState<string>()
    const [country, setCountry] = useState<string>("")

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        return
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <div className="flex w-full px-6 py-6 justify-between rounded-xl bg-white gap-12 mx-2">
                <div className="flex flex-col w-full gap-5">
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
                    <DropdownSelector
                        label="Country of origin"
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}
                    />
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

export default KYCForm
