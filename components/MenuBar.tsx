import Image from "next/image"
import Link from "next/link"
import { EthConnector, StarknetConnector } from "components"

const MenuBar = () => {
    return (
        <div className="flex w-full h-16 bg-gray-50 justify-between items-center py-4 px-6 drop-shadow-lg z-20">
            <Link href="/">
                <a className="cursor-pointer flex">
                    <Image src="/logo.png" width="145" height="25" layout="fixed"></Image>
                </a>
            </Link>
            <div className="flex gap-3">
                <StarknetConnector />
                <EthConnector />
            </div>
        </div>
    )
}

export default MenuBar
