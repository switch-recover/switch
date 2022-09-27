const Button = ({ label, callback }: { label: string; callback: () => void }) => {
    return (
        <div
            className={`flex justify-center text-sm w-full p-3 rounded-xl bg-theme-lighter hover:bg-theme-light active:bg-theme cursor-pointer select-none`}
            onClick={callback}
        >
            <span className="font-semibold">{label}</span>
        </div>
    )
}

export default Button
