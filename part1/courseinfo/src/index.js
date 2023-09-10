import React from 'react';
import ReactDOM from 'react-dom/client';

const course = 'Half Stack application development';

const courseContent= {
  part1 : {
    partName : "Fundamentals of React",
    partExercises : 5
  },
  part2 : {
    partName : "Using props to pass data",
    partExercises : 7
  },    
  part3 : {
    partName : "State of a component",
    partExercises : 14
  }
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

function Container(props) {
  const { content } = props;

  return (
    <>
      {Object.keys(content).map((partKey) => (
        <Part
          key={partKey}
          partName={content[partKey].partName}
          partExercises={content[partKey].partExercises}
        />
      ))}
    </>
  );
}

function Part(props) {
  const { partName, partExercises } = props;

  return (
    <>
      <h3>{partName}</h3>
      <p>Number of Exercises: {partExercises}</p>
    </>
  );
}

function Total(props) {
  const { content } = props;

  const totalExercises = Object.values(content).reduce(
    (acc, part) => acc + part.partExercises,
    0
  );

  return (
    <>
      <h3>Total Exercises:</h3>
      <p>{totalExercises}</p>
    </>
  );
}

function App() {
  console.log(courseContent.part1)

  return (
    <div>
      <Header course={course} />
      <Container content={courseContent} />
      <Total content={courseContent} />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

