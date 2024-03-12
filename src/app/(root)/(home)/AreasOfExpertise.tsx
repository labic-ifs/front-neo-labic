"use client"

import { IconContext } from 'react-icons'
import { SiImprovmx } from "react-icons/si";
import { GiCargoCrane } from "react-icons/gi";
import { TbDrone } from "react-icons/tb";

import styles from './AreasOfExpertise.module.css'

export default function AreasOfExpertise() {
  return (
    <section className={ styles.container }>
      <div className={ styles.headerContainer }>
        <h1>Somos Experts Em Robótica</h1>
        <p>No Labic, Laboratório de Inovação e Criatividade, a sinergia entre inovação, criatividade e robótica floresce em um ambiente propício à experimentação e descobertas. Ao incentivar a colaboração interdisciplinar, o Labic alimenta ideias criativas que se traduzem em avanços significativos na robótica. A inovação permeia cada aspecto do laboratório, desde a concepção de algoritmos revolucionários até a materialização de protótipos visionários. Este centro de excelência não apenas quebra paradigmas tecnológicos, mas também estimula a mente criativa de pesquisadores, gerando soluções que transcendem fronteiras convencionais. O Labic, assim, se destaca como um catalisador de transformação, moldando o futuro da robótica com sua abordagem única e visionária.</p>
      </div>
      <div className={ styles.areasContainer }>
        <div>
          <IconContext.Provider value={{ color: "#fff", size: "64px" }}>
            <GiCargoCrane />
          </ IconContext.Provider>
          <h2>Robótica Terrestre</h2>
          <p>No Labic, a simbiose entre inovação, criatividade e robótica terrestre ganha vida. Este laboratório inspirador é um berço de ideias, onde a criatividade desencadeia inovações na aplicação prática da robótica terrestre. No Labic, cada projeto reflete a harmonia entre mente inventiva e tecnologia, marcando o caminho para um futuro terrestre moldado por descobertas.</p>
        </div>
        <div>
          <IconContext.Provider value={{ color: "#fff", size: "64px" }}>
            <SiImprovmx />
          </ IconContext.Provider>
          <h2>Robótica Aquática</h2>
          <p>No Labic, Laboratório de Inovação e Criatividade, a confluência entre inovação, criatividade e robótica aquática é palpável. Este laboratório impulsiona a criação de soluções criativas para desafios aquáticos, moldando o curso da robótica subaquática. O Labic destaca-se como um catalisador de ideias inovadoras, navegando nos mares da excelência tecnológica.</p>
        </div>
        <div>
          <IconContext.Provider value={{ color: "#fff", size: "64px" }}>
            <TbDrone />
          </ IconContext.Provider>
          <h2>Robótica Aérea</h2>
          <p>No Labic, Laboratório de Inovação e Criatividade, a intersecção entre inovação, criatividade e robótica aérea é evidente. Este centro de excelência impulsiona a concepção de soluções criativas para desafios aéreos, catalisando avanços significativos na robótica de voo. O Labic é pioneiro em explorar os céus com ideias inovadoras e visão empreendedora.</p>
        </div>
      </div>
    </section>
  )
}
