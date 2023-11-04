interface props {
    text: string;
}

export default function FieldError({ text }: props) {
    return (
        <>
            <div className="px-4 py-2 bg-error_accent opacity-75 rounded-lg my-2 border-[1px] border-error_accent_hover border-solid duration-100">
                <p className="text-white">{text}</p>
            </div>
        </>
    )
}