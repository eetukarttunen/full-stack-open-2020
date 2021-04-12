/**
 * Full Stack open 2020
 * Tehtävä 2.12 maiden tiedot
 * Eetu Karttunen, UEF
 */
import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([]);
  const [arvo, setArvo] = useState("")
  useEffect(() => {
    getData()
  }, [])
  
  const getData = () => {
    fetch('https://restcountries.eu/rest/v2/all'
      , {
        headers: {
          'accept': 'application/json'
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson)
      });
  }

const inputChange = (e) => {
  const newValue = e.target.value
  setArvo(newValue)
  
}

var niminen = []
var kaupunkinen = []
var ihminen = []
var kielinen = []
var lippunen = []
var kaikkiniminen = []
// Tämä näyttää ihan kaiken
const filteri = data.filter(i => {
        // Näyttää ne jos samoja kirjaimia nimissä
        if (i.name.toLowerCase().includes(arvo)) {
         // console.log("Koko listan pituus: " + data.length)
          //console.log("nimi : " + i.name)

          var nimi = []
          nimi.push(i.name)
          niminen.push(nimi)

          var paakaupunki = []
          paakaupunki.push(i.capital)
          kaupunkinen.push(paakaupunki)

          var ihmiset = []
          ihmiset.push(i.population)
          ihminen.push(ihmiset)

          var kielet = []
          kielet.push(i.languages.map(l => (<li>{l.name}</li>)))
          kielinen.push(kielet)


          var lippu = []
          lippu.push(i.flag)
          lippunen.push(lippu)

          var nimi2 = []
          nimi2.push(i.name)
          kaikkiniminen.push(
          <p>
            <p>{nimi}</p>
            </p>)

            return true;  
          }


        })

        
        
        .map(i => (
          
        <p>{i.name}</p>
         ))
        
        
  //console.log("TÄÄ ON NIMIEN MÄÄRÄ JES", filteri.length)
  //console.log(filteri2.length, "tere")

  var Arr = [];
  if (filteri.length > 10) {
    Arr.push(<p>TOO LONG DATA</p>)
  }
  else {
    if (filteri.length === 1) {
        Arr.push(<div>

          <h1>{niminen}</h1> 
          <div>capital {kaupunkinen}</div>
          <div>population {ihminen}</div>

          <h2>languages</h2>
          <div>{kielinen}</div>
          <img src={lippunen} alt=""></img>
          
          </div>)
      }
    else {
      Arr.push(<p>{kaikkiniminen}</p>)
      // TÄNNE 2.13
    }
    
  }

  return (
<div>
      <div>find countries
      <input 
        type="text"
        arvo={arvo} 
        onChange={inputChange} 
      />
</div>
        {Arr}
        
      
    </div>
  )
}

export default App;
