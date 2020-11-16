import React, { useState } from "react";
import ReactDOM from "react-dom";

/** Luodaan nappi */ 
const Nappi = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

/** Luodaan taulukko, jossa teksti sekä numerokentät */
const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    );
};

/* taulukon sisällön määrittäminen sekä laskutoimitukset ennen App:ia */
const Statistics = (props) => {
        if ((props.feedbackall[0]+props.feedbackall[1]+props.feedbackall[2]) < 1) {
          return <div>No feedback given</div>
        }
        return (
            <div>
                <table>
                    <tbody>
                        <StatisticLine text="good" value={props.feedbackall[0]} />
                        <StatisticLine text="neutral" value={props.feedbackall[1]} />
                        <StatisticLine text="bad" value={props.feedbackall[2]} />
                        <StatisticLine text="all" value={(props.feedbackall[0]+props.feedbackall[1]+props.feedbackall[2])} />
                        <StatisticLine text="average" value={(props.feedbackall[0] - props.feedbackall[2]) / (props.feedbackall[0]+props.feedbackall[1]+props.feedbackall[2])} />
                        <StatisticLine text="positive" value={(props.feedbackall[0]) / (props.feedbackall[0]+props.feedbackall[1]+props.feedbackall[2])*100+'%'} />
                    </tbody>
                </table>
            </div>
        );
        
        
        }

const App = () => {
    const [good,setGood] = useState(0);
    const [neutral,setNeutral] = useState(0);
    const [bad,setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <Nappi text="good" handleClick={() => 
            setGood(good+1)}/>
            <Nappi text="neutral" handleClick={() => 
            setNeutral(neutral+1)}/>
            <Nappi text="bad" handleClick={() => 
            setBad(bad+1)}/>

            <h1>statistics</h1>
            <Statistics feedbackall={[good,neutral,bad]} />
        </div>
    );
};

ReactDOM.render(<App />,document.getElementById("root"));