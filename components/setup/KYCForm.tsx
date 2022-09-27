import { FormEvent, useContext, useRef, useState } from "react"
import { TextFormField, DateFormField, DropDownSelector, RadioButtonSelector, NextPageButton } from "components"
import { FormDataContext, ISetContractContext } from "pages/_app"
import { useRouter } from "next/router"
import { countries } from "utils/countries"

const KYCForm = ({ nextPageRoute }: { nextPageRoute: string }) => {
    const { context, setContext } = useContext(FormDataContext) as ISetContractContext
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [DOB, setDOB] = useState<string>()
    const [country, setCountry] = useState<string>("")
    const [docType, setDocType] = useState<string>("")
    const [docNumber, setDocNumber] = useState<string>("")
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!firstName || !lastName || !DOB || !country || !docType || !docNumber) return
        setContext({
            ...context,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: DOB,
            countryOfOrigin: country,
            legalDocumentType: docType,
            legalDocumentNumber: docNumber,
        })
        router.push(nextPageRoute)
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
                        autoFocus={true}
                    />
                    <TextFormField
                        label="Legal last name"
                        placeholder="Nakamoto"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoFocus={false}
                    />
                    <DateFormField
                        label="Date of birth"
                        value={DOB ? DOB : ""}
                        onChange={(e) => setDOB(e.target.value)}
                        autoFocus={false}
                    />
                    <DropDownSelector
                        label="Country of origin"
                        options={countries}
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <RadioButtonSelector label="Legal document type" value={docType} setValue={setDocType} />
                    <TextFormField
                        label="Legal document number"
                        placeholder="ABC123456"
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        autoFocus={false}
                    />
                </div>
            </div>
            <NextPageButton nextPageRoute={nextPageRoute} formRef={formRef} />
        </form>
    )
}

export default KYCForm
