import React from 'react'

export const Header = (props) => {
  //console.log(props)
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}


const Part = (props) => {
  //console.log(props)
  return (
    <p>
      {props.part.name}: {props.part.exercises}
    </p>
  );
}

const Content = (props) => {
  //console.log(props)
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
}


const Total = (props) => {
  console.log(props)
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Number of exercises {totalExercises}</p>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}


export default App


/*
      <Content 
        part1={part1.name} 
        exercises1={part1.exercises} 
        part2={part2.name} 
        exercises2={part2.exercises} 
        part3={part3.name}
        exercises3={part3.exercises}
      />
      <Total 
        exercises1={exercises1} 
        exercises2={exercises2} 
        exercises3={exercises3}
      />
*/