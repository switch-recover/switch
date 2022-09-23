export type TitleDescriptionProps = {
    title: string
    description: string
}

const TitleDescription = ({ title, description }: TitleDescriptionProps) => {
    return (
        <>
            <span className="font-semibold text-xl px-8">{title}</span>
            <span className="text-sm px-8 mb-2">{description}</span>
        </>
    )
}

export default TitleDescription
