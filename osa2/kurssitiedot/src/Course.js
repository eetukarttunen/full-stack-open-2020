/*
Oma moduuli tehtävään 2.5!

Tekijä; Eetu Karttunen
Full Stack Open 2020
Tehtävät 2.1-2.5, sisältää myös 2.3*
*/

/** 
 Tarkennuksia & kommentteja tulevaisuutta varten:
 * Kohdassa parts, saadaan yhdistetty nimi sekä harjoitusten määrä yhdeksi virkkeeksi kätevästi tyylillä {props.name} {props.exercises}
 * Content vaikuttaa parhaalta tavalta yhdistää tällöin taulukosta saadut tiedot, esim: <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
 * Header toteutettu yksinkertaisesti viittaamalla kurssiin ja tarkentamalla Coursen returnissa sijaintia.
 * Total eli tehtävä 2.3*  tarkennettu koodissa.
 */

import React from "react";


const Course = ( props ) => { 
    const Header = (props) => {
      return <h1>Web development curriculum</h1>
      
    };
    const CourseHeader = (props) => {
      return <h2>{props.courses}</h2>
      
    };
  
    const Content = (props) => {
      return (
      <div>
         {/** Voidaan lisätä osioita yksi kerrallaan ideksoimalla haluamamme komponentit,
     * MUISTA JATKOSSA: 0 on ensimmäinen, ei 1
    */}
        <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
    
        <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
    
        <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
  
        <Part name={props.parts[3].name} exercises={props.parts[3].exercises} />
      </div>
        );
    };
  
    const Content2 = (props) => {
      return (
      <div>
        <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
    
        <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
    
      </div>
        );
    };
    
    const Part = (props) => {
      
      return (
          <div>
              {props.name} {props.exercises}
              
          </div>
      );
    };
    const Total = (props) => {
      const total = props.parts.reduce(
        (s, p) => s + p.exercises,
        0
      );
      return <h4>Total of {total} exercises</h4>;
    };
  
      return (
      <div>
      <Header/>
      <CourseHeader courses={props.courses[0].name} />
      <Content parts={props.courses[0].parts} />
      <Total parts={props.courses[0].parts}/>
  
      <CourseHeader courses={props.courses[1].name} />
      <Content2 parts={props.courses[1].parts} />
      {/** TEHTÄVÄ 2.3* Asia, minkä huomasin: Tässä viittaus tarkemmin apin sisään, jotta total toimii. Const-määrittelyssä riittääkin siis kevyempi määritys 
       * Määritys myöskin tehdään app:in ulkopuolella, eikä itse APP.in sisällä tässä tapauksessa.
      */}
      <Total parts={props.courses[1].parts}/>
      </div>
    )
  };

  export default Course;