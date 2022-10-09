import { BodyLayout, MenuBar, TitleDescription, SideBar, DisplayList, NextPageButton, ActivePlan } from "components"
import { useCallback, useContext, useEffect } from "react"
import { FormDataContext, ISetContractContext, recoveryOptions } from "pages/_app"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContractRead } from "wagmi"
import addresses from "contracts/deployments"
const { abi: GatewayContractABI } = require("contracts/abis/GatewayContract.json")

const RecoveryDetails = () => {
    const { context } = useContext(FormDataContext) as ISetContractContext
    const router = useRouter()

    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recover a lost wallet", path: "/recover" },
        { name: "Recovery plan details", path: "/recover/details" },
    ]

    const { data: targetRecoveryAddress } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToRecoveryContract",
        args: [context.targetRecoveryAddress],
    })

    const { data: contractType } = useContractRead({
        addressOrName: addresses.L1GatewayContract,
        contractInterface: GatewayContractABI,
        functionName: "eoaToContractType",
        args: [context.targetRecoveryAddress],
    })

    const contractTypeIndex = Number(contractType) as 0 | 1 | 2

    const routerMap = {
        0: "/recover/self-hosted/nominate",
        1: "/recover/self-hosted/password",
        2: "/recover/trusted-agent",
    }

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === "Enter") {
            router.push(routerMap[contractTypeIndex])
        }
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)
        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress])

    const contractTypeText = {
        0: "It seems you previously setup self hosted account recovery and nominated the following address as the recipient if it ever became lost. Please check that the details below are correct.",
        1: "It seems you previously setup self hosted account recovery and nominated the following address as the recipient if it ever became lost. Please check that the details below are correct.",
        2: "It seems you previously setup self hosted account recovery and nominated a Trusted Agent to manage custody of your assets. Please check that the details below are correct.",
    }

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full relative overflow-scroll">
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title={targetRecoveryAddress ? "Recovery plan" : "Sorry, we couldn’t find your details"}
                        description={
                            targetRecoveryAddress
                                ? contractTypeText[contractTypeIndex]
                                : "It doesn’t seem as though the wallet address you provided has any active recovery plans associated with it. Please check you have entered the correct wallet address."
                        }
                    />
                    {targetRecoveryAddress ? (
                        <div className="mx-6 flex flex-col gap-2">
                            <ActivePlan recoveryAddress={String(targetRecoveryAddress)} />
                            <div className="mx-2">
                                <NextPageButton nextPageRoute="/recover/self-hosted/nominate" formRef={null} />
                            </div>
                        </div>
                    ) : (
                        <NoActivePlan />
                    )}
                </BodyLayout>
            </div>
        </div>
    )
}

const NoActivePlan = () => {
    return (
        <Link href="/recover">
            <div
                className={`flex justify-center text-sm mx-8 p-3 rounded-xl bg-theme-lighter hover:bg-theme-light active:bg-theme cursor-pointer select-none font-semibold`}
            >
                ← Go back
            </div>
        </Link>
    )
}

export default RecoveryDetails
