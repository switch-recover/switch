type FormFieldProps = {
    label: string
    value: string
    onChange: (e: any) => void
}

const DropdownSelector = ({ label, value, onChange }: FormFieldProps) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-xs font-semibold">{label}</label>
            <input
                autoFocus
                type="text"
                className="w-full bg-gray-100 px-3 py-1 rounded-md outline-none text-gray-800"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default DropdownSelector
