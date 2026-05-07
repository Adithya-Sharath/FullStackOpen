import { useState } from 'react'

const History = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics good={props.good} neutral = {props.neutral} bad = {props.bad}/>
    </div>
  )
}

const StatisticLine = (props) => {
  if(props.text === "positive")
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}%</td>
    </tr>
  )
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
    return (
    <table>
    <tbody> 
    <StatisticLine text = "good" value = {props.good}/>
    <StatisticLine text = "neutral" value = {props.neutral} />
    <StatisticLine text = "bad" value = {props.bad}/>  
    <StatisticLine text = "all" value = {props.good+props.neutral+props.bad}/>
    <StatisticLine text = "average" value = {(props.good-props.bad)/(props.good+props.bad+props.neutral)} />
    <StatisticLine text = "positive" value = {((props.good)/(props.good+props.bad+props.neutral))*100}/>
   </tbody>
  </table>
    )
}

const Button = (props) => {
  return (
    <div>
    <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClickGood = () => {setGood(good+1)}
  const handleClickNeutral = () => {setNeutral(neutral+1)}
  const handleClickBad = () => {setBad(bad+1)}
  return (
  <div>
    <h1>give feedback</h1>
    <Button onClick = {handleClickGood} text="good"/>
    <Button onClick = {handleClickNeutral} text="neutral"/>
    <Button onClick = {handleClickBad} text="bad"/>
    <h1>statistics</h1>
    <History all = {good+neutral+bad} good = {good} neutral = {neutral} bad = {bad}/>
  </div>
  )
}

export default App