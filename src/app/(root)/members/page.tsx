"use client"

import React, {useEffect, useState} from 'react'
import Style from "@/app/(root)/members/members.module.css"

import { Button } from "@/Components/Buttons/Button"

export default function Members(){
    const [username, setUsername] = useState()
    const [first_name, setFirts_name] = useState()
    const [last_name, setLast_name] = useState()
    const [occupation_area, setOccupation_area] = useState()

    useEffect(() => {
      fetch("http://localhost:1080").then(
        response => response.json()).then(
          data => {
            console.log(data)
            setUsername(data.username)
            setFirts_name(data.first_name)
            setLast_name(data.last_name)
            setOccupation_area(data.occupation_area)
          }
        )
      }, []);
      
    
    return(
        <main className={Style.main}>
            <h1>Conheça Nossos Membros!</h1>
            <div className={Style.users}>
                <div className={Style.user}>
                    <p>{first_name} {last_name}</p>
                    <p>{occupation_area}</p>

                    <div className={Style.line}></div>

                    <Button.Root fullWidth>
					    <Button.Text text="Quero Conhecer!" />
				    </Button.Root>
                </div>
            </div>
        </main>
    )
}