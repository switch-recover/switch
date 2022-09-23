import Image from "next/image"
import Link from "next/link"

type DialogButtonProps = {
    location: string
    header: string
    text: string
    logo: string
    colorScheme: string
}

const DialogButton = ({ location, header, text, logo, colorScheme }: DialogButtonProps) => {
    const colors = {
        bg: colorScheme === "theme" ? "bg-theme-lighter" : "bg-gray-50",
        hover: colorScheme === "theme" ? "bg-theme-light" : "bg-gray-200",
        active: colorScheme === "theme" ? "bg-theme" : "bg-gray-300",
    }

    return (
        <Link href={location}>
            <a>
                <div
                    className={`flex w-full px-8 py-6 justify-between rounded-xl ${colors.bg} gap-12 hover:${colors.hover} active:${colors.active} cursor-pointer`}
                >
                    <div className="flex flex-col gap-3">
                        <span className="font-semibold">{header}</span>
                        <span className="text-sm">{text}</span>
                    </div>
                    <div className="flex items-center">
                        <Image src={logo} width="40" height="40" layout="fixed" />
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default DialogButton
