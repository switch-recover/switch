import { Dispatch, SetStateAction } from "react"

const RadioButtonSelector = ({
    label,
    value,
    setValue,
}: {
    label: string
    value: string
    setValue: Dispatch<SetStateAction<string>>
}) => {
    const options = ["Passport", "Driver's License", "Identity Card"]

    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold mb-1">{label}</label>
            {options.map((op, i) => {
                return (
                    <div className="radio" key={i}>
                        <label className="flex gap-2">
                            <input
                                type="radio"
                                value={op}
                                checked={value === op}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <span className="text-sm">{op}</span>
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default RadioButtonSelector
