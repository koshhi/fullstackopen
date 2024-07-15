import { Header } from "./Header"
import { Content } from  "./Content"

export const Course = ({course}) => {
const {name, parts} = course
const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <p>Total of {totalExercises} exercises</p>
      </div>
    )

}