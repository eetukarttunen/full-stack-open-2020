// TÄHÄN KEKSIÄ MITEN SAIS SeN MAPIN JÄRKEVÄSTI TÄNNE
import React from 'react';

const Person = (props) => (

   <ul>
    {props.filteri.map(p => {
          return (
            
            <div key={p.name}>
              <p> {p.name} {p.number}
              <button 
              onClick={()=>props.deletePerson(p.id)}>poista</button>

              </p>
              
              </div>
              
              );
            })}
            </ul>

        
  )

  export default Person