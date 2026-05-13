const Course = (prop) => {
  return (
    <div>
      <Header course={prop.course.name}/>
      <Content course={prop.course.parts}/>
    </div>
  )
}
const Header = (props) => {return (<h1>{props.course}</h1>)}
const Content = (props) => {
  return (
    <div>
    {props.course.map(parts => <Part parts={parts} key={parts.id}></Part>)}
    <b>total of {props.course.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </div> 
  )
}
const Part = (props) =>{
  return(
    <p>{props.parts.name} {props.parts.exercises}</p>
  )
}

export default Course