type FormFieldProps = {
    label: string
    placeholder: string
    value: string
    onChange: (e: any) => void
    autoFocus: boolean
    classes?: string
}

const TextFormField = ({ label, placeholder, value, onChange, autoFocus, classes }: FormFieldProps) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <label className="text-xs font-semibold">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                className={`w-full bg-gray-100 px-3 py-1 rounded-md text-gray-800 outline-none border ${classes}`}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
            />
        </div>
    )
}

export default TextFormField
