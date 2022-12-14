import Link from "next/link"

type PathProps = {
    name: string
    path: string
}

const BodyLayout = ({ path, children }: any) => {
    return (
        <div className="flex h-full w-full bg-gray-100 justify-center p-4 absolute sm:relative pl-8 sm:pl-4 overflow-scroll">
            <div className="absolute top-3 left-8 sm:left-4 text-xs font-semibold flex flex-wrap pr-2">
                {path.map((p: PathProps, i: number) => {
                    if (i === Object.keys(path).length - 1) {
                        return (
                            <Link href={p.path} key={i}>
                                <div className="cursor-pointer text-gray-900 hover:text-gray-500 active:text-gray-900 select-none">
                                    {p.name}
                                </div>
                            </Link>
                        )
                    } else {
                        return (
                            <div key={i} className="flex">
                                <Link href={p.path}>
                                    <div className="cursor-pointer text-gray-400 hover:text-gray-700 active:text-gray-400 select-none">
                                        {p.name}
                                    </div>
                                </Link>
                                <div className="text-gray-400 px-1.5 select-none">{"►"}</div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className="flex flex-col w-[520px] mt-20 gap-5 h-max mb-20">{children}</div>
        </div>
    )
}

export default BodyLayout
