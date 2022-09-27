import { MenuBar, TitleDescription, RecoveryAddressForm, SideBar, DisplayList, NextPageButton } from "components"
import { BodyLayout } from "layouts"
import { useCallback, useEffect, useState } from "react"

import { recoveryOptions } from "pages/_app"
import Link from "next/link"
import { useRouter } from "next/router"

const RecoveryDetails = () => {
    const [plan, setPlan] = useState<recoveryOptions>(recoveryOptions.SelfHosted)
    const router = useRouter()

    const pathObject = [
        { name: "Home", path: "/" },
        { name: "Recover a lost wallet", path: "/recover" },
        { name: "Recovery plan details", path: "/recover/details" },
    ]

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === "Enter") {
            const routerMap = {
                0: "/recover/self-hosted/nominate",
                1: "/recover/self-hosted/password",
                2: "/recover/trusted-agent",
                3: "/",
            }
            router.push(routerMap[plan])
        }
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)
        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress])

    // useEffect(() => {
    //     // Retrieve plan details based on wallet address
    // }, [])

    const renderPlanDetails = () => {
        switch (plan) {
            case recoveryOptions.None:
                return <NoRecovery></NoRecovery>
            case recoveryOptions.SelfHosted:
                return <SelfHostedNominate></SelfHostedNominate>
            case recoveryOptions.SelfHostedPassword:
                return <SelfHostedPassword></SelfHostedPassword>
            case recoveryOptions.TrustedAgent:
                return <TrustedAgent></TrustedAgent>
            default:
                return <Loading></Loading>
        }
    }

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <SideBar />
                <BodyLayout path={pathObject}>{renderPlanDetails()}</BodyLayout>
            </div>
        </div>
    )
}

const NoRecovery = () => {
    return (
        <>
            <TitleDescription
                title="Sorry, we couldn’t find your details"
                description="It doesn’t seem as though the wallet address you provided has any active recovery plans associated with it. Please check you have entered the correct wallet address."
            />
            <Link href="/recover">
                <div
                    className={`flex justify-center text-sm mx-8 p-3 rounded-xl bg-theme-lighter hover:bg-theme-light active:bg-theme cursor-pointer select-none font-semibold`}
                >
                    ← Go back
                </div>
            </Link>
        </>
    )
}

const SelfHostedNominate = () => {
    // Temporary - to replace with actual details
    const recoveryDetails = [
        {
            label: "Mode",
            value: "Self hosted recovery",
        },
        {
            label: "Setup",
            value: "Nominate a recovery address",
        },
        {
            label: "Recovery address",
            value: "0x123...456",
        },
        {
            label: "Inactivity period",
            value: "1 year (10 months, 21 days remaining)",
        },
    ]

    return (
        <>
            <TitleDescription
                title="We’ve found your recovery details!"
                description="It seems you previously setup self hosted account recovery and nominated the following address as the recipient if it ever became lost. Please check that the details below are correct."
            />
            <div className="flex flex-col">
                <DisplayList fields={recoveryDetails} />
                <NextPageButton nextPageRoute="/recover/self-hosted/nominate" formRef={null} />
            </div>
        </>
    )
}

const SelfHostedPassword = () => {
    // Temporary - to replace with actual details
    const recoveryDetails = [
        {
            label: "Mode",
            value: "Self hosted recovery",
        },
        {
            label: "Setup",
            value: "Password",
        },
        {
            label: "Recovery address",
            value: "0x123...456",
        },
        {
            label: "Inactivity period",
            value: "1 year (10 months, 21 days remaining)",
        },
    ]

    return (
        <>
            <TitleDescription
                title="We’ve found your recovery details!"
                description="It seems you previously setup self hosted account recovery and nominated the following address as the recipient if it ever became lost. Please check that the details below are correct."
            />
            <div className="flex flex-col">
                <DisplayList fields={recoveryDetails} />
                <NextPageButton nextPageRoute="/recover/self-hosted/password" formRef={null} />
            </div>
        </>
    )
}

const TrustedAgent = () => {
    // Temporary - to replace with actual details
    const recoveryDetails = [
        {
            label: "Mode",
            value: "Trusted Agent recovery",
        },
        {
            label: "Recovery address",
            value: "0x123...456",
        },
        {
            label: "Inactivity period",
            value: "1 year (10 months, 21 days remaining)",
        },
    ]

    return (
        <>
            <TitleDescription
                title="We’ve found your recovery details!"
                description="It seems you previously setup self hosted account recovery and nominated a Trusted Agent to manage custody of your assets. Please check that the details below are correct."
            />
            <div className="flex flex-col">
                <DisplayList fields={recoveryDetails} />
                <NextPageButton nextPageRoute="/recover/trusted-agent" formRef={null} />
            </div>
        </>
    )
}

const Loading = () => {
    return <></>
}

export default RecoveryDetails
