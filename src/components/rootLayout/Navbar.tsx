'use client'

import Image from "next/image"
import Link from "next/link"
import { Squash as Hamburger } from 'hamburger-react'
import {IconContext} from "react-icons";
import { PiUserCirclePlusLight } from 'react-icons/pi'
import { useState } from "react"

import NavItems from "./NavItems"

export default function Navbar(){
    const [navStatus, setNavStatus] = useState(false)

    const toggleNavbar = () => {
        if(!navStatus){
            setNavStatus(true)
        } else {
            setNavStatus(false)
        }
    }

    return (
        <>
        <nav id="nav-container" className={`${navStatus ? 'h-[22rem]' : 'h-16'} h-16 md:flex md:justify-between w-full bg-neutral-950 fixed top-0 right-0 overflow-hidden ease-in-out duration-300`}>
            <div className="flex flex-1 md:flex-none items-center justify-between px-4 md:pl-20">
                <Image className="h-12 w-auto m-2" src={'/white-logo.svg'} width={64} height={64} alt="logo"></Image>
                <div className="md:hidden">
                    <Hamburger rounded color="#fff" onToggle={toggleNavbar} />
                </div>
            </div>
            <div className="md:flex items-center justify-center">
                <ul className="md:flex">
                    <NavItems target="/" text="Início"/>
                    <NavItems target="/" text="Membros"/>
                    <NavItems target="/" text="Artigos"/>
                    <NavItems target="/" text="Sobre"/>
                </ul>
            </div>
            <div className="flex items-center justify-center w-full md:w-auto md:pb-0 px-4 md:pr-20">
                <Link href="/signin">
                    <IconContext.Provider value={{ className:"h-12 w-auto m-2 cursor-pointer" }}>
                        <PiUserCirclePlusLight color="#fff"/>
                    </IconContext.Provider>
                </Link>
            </div>
        </nav>
        <hr id="nav-divider" className={`${navStatus ? 'top-[22rem]' : 'h-16'} bg-white h-[.1rem] w-full fixed top-16 ease-in-out duration-300`} />
        </>
    )
}