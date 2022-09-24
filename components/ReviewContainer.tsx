import { MenuBar, TitleDescription, DisplayList, DeployContractButton } from "components"
import { BodyLayout } from "layouts"

type pathObjectProp = {
    name: string
    path: string
}

type displayFieldProp = {
    label: string
    value: string
}

const ReviewContainer = ({
    pathObject,
    displayFields,
}: {
    pathObject: Array<pathObjectProp>
    displayFields: Array<displayFieldProp>
}) => {
    return (
        <div className="flex flex-col w-screen h-screen bg-gray-200">
            <MenuBar />
            <div className="flex w-full h-full">
                <div className="flex h-full w-80 bg-gray-200 z-10"></div>
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Review"
                        description="Carefully review the settings below before continuing. You can change these settings later, but it will cost you some gas fees to do so."
                    />
                    <DisplayList fields={displayFields} />
                    <DeployContractButton />
                </BodyLayout>
            </div>
        </div>
    )
}

export default ReviewContainer
