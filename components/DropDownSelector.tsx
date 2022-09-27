type FormFieldProps = {
    label: string
    options: Array<string>
    value: string
    onChange: (e: any) => void
}

const DropDownSelector = ({ label, options, value, onChange }: FormFieldProps) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-xs font-semibold">{label}</label>
            <div className="w-full bg-gray-100 px-3 py-1 rounded-md outline-none text-gray-800">
                <select value={value} onChange={onChange} className="w-full bg-transparent outline-none">
                    <option>Select country:</option>
                    {options.map((op) => (
                        <option value={op}>{op}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default DropDownSelector
