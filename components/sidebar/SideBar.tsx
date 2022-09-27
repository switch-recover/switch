import Image from "next/image"
import { useState } from "react"

const SideBar = () => {
    const [plan, setPlan] = useState()

    return (
        <div className="hidden sm:flex flex-col h-full w-80 bg-gray-200 z-10 p-4 justify-between">
            {plan ? <ActivePlan /> : <InactivePlan />}
            <div className="flex-col justify-between gap-3 border-t border-gray-400 p-5">
                <div className="flex items-center gap-8 cursor-pointer hover:opacity-60 active:opacity-40 select-none">
                    <Image src="/book.png" width="24" height="24" alt="Documentation" />
                    <span className="font-semibold text-sm">Documentation</span>
                </div>
            </div>
        </div>
    )
}

const InactivePlan = () => {
    return (
        <div className="flex flex-col gap-2 mt-3">
            <span className="text-sm font-semibold text-gray-400 px-2">No active plan</span>
            <div className="flex flex-col gap-3 bg-gray-50 rounded-lg w-full h-24 p-4">
                <div className="bg-gray-200 w-1/3 h-3"></div>
                <div className="bg-gray-200 w-2/3 h-6"></div>
            </div>
        </div>
    )
}

const ActivePlan = () => {
    return (
        <div className="flex flex-col gap-2 mt-3">
            <span className="text-sm font-semibold text-gray-400 px-2">Active plan</span>
            <div className="flex flex-col bg-gray-50 rounded-lg w-full h-24 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Image src="/recover.png" width="20" height="20" alt="recover" />
                    </div>
                    <div className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">ACTIVE</div>
                </div>
                <span className="text-sm font-semibold text-gray-800 mt-3">Self hosted recovery</span>
                <span className="text-xs text-theme-darker cursor-pointer hover:opacity-70 active:opacity-50 select-none">
                    Edit
                </span>
            </div>
        </div>
    )
}

export default SideBar
