/*
Tekijä; Eetu Karttunen
Full Stack Open 2020
Tehtävät 2.1-2.5, sisältää myös 2.3*
*/

/** 
 NÄMÄ LÖYTYY MODUULISTA COURSE JOHON VIITATTU
 Tarkennuksia & kommentteja tulevaisuutta varten:
 * Kohdassa parts, saadaan yhdistetty nimi sekä harjoitusten määrä yhdeksi virkkeeksi kätevästi tyylillä {props.name} {props.exercises}
 * Content vaikuttaa parhaalta tavalta yhdistää tällöin taulukosta saadut tiedot, esim: <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
 * Header toteutettu yksinkertaisesti viittaamalla kurssiin ja tarkentamalla Coursen returnissa sijaintia.
 * Total eli tehtävä 2.3*  tarkennettu koodissa.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Course from "./Course";



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}
/* Renderöinti */
ReactDOM.render(<App />, document.getElementById('root'));