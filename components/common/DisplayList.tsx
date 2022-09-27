export type displayField = {
    label: string
    value: string
}

const DisplayList = ({ fields }: { fields: Array<displayField> }) => {
    return (
        <div className="flex px-6 py-6 justify-between rounded-xl bg-white gap-12 mx-2">
            <div className="flex flex-col w-full gap-5">
                {fields.map((fd: displayField, i: number) => {
                    return (
                        <div className="flex flex-col gap-1" key={i}>
                            <span className="text-xs font-semibold text-gray-400">{fd.label}</span>
                            <span className="text-sm font-semibold text-gray-900">{fd.value}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DisplayList
