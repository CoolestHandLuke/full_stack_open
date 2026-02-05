import Header from './Header'
import Content from './Content'
import Exercises from './Exercises'

const Course = ({ course }) => {
    const { parts, name } = course
    const totalExercises = course.parts.reduce((accumulator, part) => {
        const { exercises } = part
        return accumulator + exercises
    }, 0)
    return (
        <>
            <Header heading={name} />
            <Content parts={parts} />
            <Exercises totalExercises={totalExercises} />
        </>
    )
}
export default Course
