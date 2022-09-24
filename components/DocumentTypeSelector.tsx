import { Dispatch, SetStateAction } from "react"

const DocumentTypeSelector = ({
    docType,
    setDocType,
}: {
    docType: string
    setDocType: Dispatch<SetStateAction<string>>
}) => {
    const options = ["Passport", "Driver's License", "Identity Card"]

    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold mb-1">Legal document type</label>
            {options.map((op, i) => {
                return (
                    <div className="radio" key={i}>
                        <label className="flex gap-2">
                            <input
                                type="radio"
                                value={op}
                                checked={docType === op}
                                onChange={(e) => setDocType(e.target.value)}
                            />
                            <span className="text-sm">{op}</span>
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default DocumentTypeSelector
