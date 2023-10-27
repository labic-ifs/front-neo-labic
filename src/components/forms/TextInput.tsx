'use client'

import {IconContext} from "react-icons";
import { ReactNode } from "react";

interface props {
    name: string;
    placeholder: string;
    type: string;
    icon?: ReactNode;
    formRegister?: Function;
}

export default function TextInput({ name, placeholder, icon, type, formRegister }: props) {

    return(
        <>
            <div className="flex flex-1 items-center bg-neutral-800 p-3 border-[1px] my-2 border-neutral-500 rounded-md gap-2">
                <IconContext.Provider value={{ className:"w-8 h-8" }}>
                    {icon ? icon : <></>}
                </IconContext.Provider>
                <input {...formRegister ? {...formRegister(`${name}`)} : ''} className=" bg-neutral-800 outline-none autofill:bg-transparent w-full" placeholder={placeholder} type={type} />
            </div>
        </>
    )
}