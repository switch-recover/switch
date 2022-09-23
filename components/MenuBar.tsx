import Image from "next/image"
import Link from "next/link"
import { EthConnector, StarknetConnector } from "../components"

const MenuBar = () => {
    return (
        <div className="flex w-full h-16 bg-gray-100 justify-between items-center py-4 px-6">
            <Link href="/">
                <a className="cursor-pointer flex">
                    <Image src="/logo.png" width="145" height="25" layout="fixed"></Image>
                </a>
            </Link>
            {/* <EthConnector /> */}
            <StarknetConnector />
        </div>
    )
}

export default MenuBar
