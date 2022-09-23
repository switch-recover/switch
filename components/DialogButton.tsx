import Image from "next/image"

type DialogButtonProps = {
    header: string
    text: string
    logo: string
    colorScheme: string
}

const DialogButton = ({ header, text, logo, colorScheme }: DialogButtonProps) => {
    const colors = {
        bg: colorScheme === "theme" ? "bg-theme-lighter" : "bg-gray-50",
        hover: colorScheme === "theme" ? "bg-theme-light" : "bg-gray-200",
        active: colorScheme === "theme" ? "bg-theme" : "bg-gray-300",
    }

    return (
        <div
            className={`flex w-full px-8 py-6 justify-between rounded-xl ${colors.bg} gap-6 hover:${colors.hover} active:${colors.active} cursor-pointer`}
        >
            <div className="flex flex-col gap-3">
                <span className="font-semibold">{header}</span>
                <span className="text-sm">{text}</span>
            </div>
            <div className="flex items-center">
                <Image src={logo} width="60" height="60" />
            </div>
        </div>
    )
}

export default DialogButton
