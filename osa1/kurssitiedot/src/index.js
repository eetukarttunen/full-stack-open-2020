import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return <h1>{course}</h1>;
};

const Content = ({osiot}) => {
  return (
  <div>
    <Osio osio={osiot[0]} />
    <Osio osio={osiot[1]} />
    <Osio osio={osiot[2]} />
  </div>
    )
};


const Total = ({osiot}) => {
  return (
      <p>Number of exercises 
        {osiot[0].harjoitukset 
        + osiot[1].harjoitukset 
        + osiot[2].harjoitukset}</p>
  );
};

const Osio = ({osio}) => {
  return (
      <p>
          {osio.nimi} {osio.harjoitukset}
      </p>
  );
};


const App = () => {
  /*Täytyy luoda jonkilainen yhdistelmä, jotta helpompi käsitellä*/
  const course = 'Half Stack application development'
  const kokoelmakaikkia = {
    /* Jaetaan partsit osioihin */
  
    osiot: [
      {
        nimi : 'Fundamentals of React', harjoitukset : 10
      },

      {
        nimi : 'Using props to pass data', harjoitukset : 7
      },

      {
        nimi : 'State of a component', harjoitukset : 14
      }
    ] };



  return (
    <div>
      <Header course={course} />
      <Content osiot={kokoelmakaikkia.osiot} />
      <Total osiot={kokoelmakaikkia.osiot}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))