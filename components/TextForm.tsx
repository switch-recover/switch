import { FormDataContext, ISetContractContext } from "pages/_app"
import { FormEvent, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { TextFormField } from "components"

type fieldProps = {
    id: string
    label: string
    placeholder: string
    value?: any
}

type formDataProps = {
    [index: string]: string
}

const TextForm = ({ fields, nextPageRoute }: { fields: Array<fieldProps>; nextPageRoute: string }) => {
    const { context, setContext } = useContext(FormDataContext) as ISetContractContext
    const [formData, setFormData] = useState<formDataProps>()
    const router = useRouter()

    useEffect(() => {
        const transformedData = fields.map((fd: fieldProps) => {
            return { [fd.id]: fd.value }
        })
        const data = Object.assign({}, ...transformedData)
        setFormData(data)
    }, [])

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData) return
        for (const [id, value] of Object.entries(formData)) {
            if (!value) continue
            setContext({
                ...context,
                [id]: value,
            })
        }
        router.push(nextPageRoute)
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <div className="flex w-full px-6 py-6 justify-between rounded-xl bg-white gap-12 mx-2">
                <div className="flex flex-col w-full gap-5">
                    {fields && formData ? (
                        fields.map((fd: fieldProps, i: number) => {
                            return (
                                <TextFormField
                                    key={i}
                                    label={fd.label}
                                    placeholder={fd.placeholder}
                                    value={formData[fields[i].id]}
                                    onChange={(e: any) => setFormData({ ...formData, [fields[i].id]: e.target.value })}
                                />
                            )
                        })
                    ) : (
                        <></>
                    )}
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

export default TextForm
