/*
Tekijä; Eetu Karttunen
Full Stack Open 2020
Tehtävät 1.1-1.5
*/

import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  /** props.course riittää, ei tarvitse tarkempaa viittausta otsikon sisään */
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
  <div>
    {/** Voidaan lisätä osioita yksi kerrallaan ideksoimalla haluamamme komponentit,
     * MUISTA JATKOSSA: 0 on ensimmäinen, ei 1
    */}
    <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />

    <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />

    <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />

  </div>
    );
};


const Total = (props) => {
  return (
      <div>Number of exercises 
        {props.parts[0].exercises 
            + props.parts[1].exercises 
                   + props.parts[2].exercises}</div>
  );
};

const Part = (props) => {
  return (
      <div>
          {props.name} {props.exercises}
      </div>
  );
};

const App = () => {
const course = {
  name: 'Half Stack application development',
  parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },{
      name: 'Using props to pass data',
      exercises: 7
    },{
      name: 'State of a component',
      exercises: 14
    }]};

  
return (
    <div>
      {/** Palautus voidaan ilmoittaa yksinkertaisesti course.name yms.
       * EI TARVITSE PIDEMPÄÄ!
       */}
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  );
};
/* Renderöinti */
ReactDOM.render(<App />, document.getElementById('root'));