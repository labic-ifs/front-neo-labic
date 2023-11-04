import Link from "next/link";

interface props {
    text: string;
    target: string;
}

export default function NavItems({ text, target }: props){
    return (
        <Link href={target} className="cursor-default">
            <li className="md:p-0 p-4">
                <button className="w-full cursor-default">
                    <span className="text-white p-4 hover:text-users_accent_hover active:text-users_accent_active ease-in-out duration-300 cursor-pointer">{text}</span>
                </button>
            </li>
        </Link>
    )
}