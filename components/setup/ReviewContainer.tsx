import { BodyLayout, MenuBar, TitleDescription, DisplayList, Button, SideBar } from "components"

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
                <SideBar />
                <BodyLayout path={pathObject}>
                    <TitleDescription
                        title="Review"
                        description="Carefully review the settings below before continuing. You can change these settings later, but it will cost you some gas fees to do so."
                    />
                    <DisplayList fields={displayFields} />
                    <div className="px-2">
                        <Button label="Deploy recovery service" callback={() => {}} />
                    </div>
                </BodyLayout>
            </div>
        </div>
    )
}

export default ReviewContainer
