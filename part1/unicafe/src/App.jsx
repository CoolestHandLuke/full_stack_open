import { useState } from 'react'
import './styles.css'

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>
}

const StatisticsLine = ({ text, statistic }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{statistic}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
    if (all === 0) {
        return <p>No feedback given</p>
    }
    return (
        <table>
            <tbody>
                <StatisticsLine text='good' statistic={good} />
                <StatisticsLine text='neutral' statistic={neutral} />
                <StatisticsLine text='bad' statistic={bad} />
                <StatisticsLine text='all' statistic={all} />
                <StatisticsLine text='average' statistic={average} />
                <StatisticsLine text='positive' statistic={positive} />
            </tbody>
        </table>
    )
}

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [overallScore, setOverallScore] = useState(0)
    const [average, setAverage] = useState(0) // good is +1, neutral is 0, bad is -1
    const [positive, setPositive] = useState('') // Defined as (good / all)

    // Helper function for calculating the positive value and formatting it correctly
    const calcPositive = (good, all) => {
        return ((100 * good) / all).toFixed(2) + '%'
    }

    const handleGood = () => {
        const newGood = good + 1
        const newOverallScore = overallScore + 1
        const newAll = newGood + neutral + bad
        setGood(newGood)
        setAll(newAll)
        setOverallScore(newOverallScore)
        setAverage((newOverallScore / newAll).toFixed(2))
        setPositive(calcPositive(newGood, newAll))
    }

    const handleNeutral = () => {
        const newNeutral = neutral + 1
        const newAll = good + newNeutral + bad
        setNeutral(newNeutral)
        setAll(newAll)
        setAverage((overallScore / newAll).toFixed(2))
        setPositive(calcPositive(good, newAll))
    }

    const handleBad = () => {
        const newBad = bad + 1
        const newOverallScore = overallScore - 1
        const newAll = good + neutral + newBad
        setBad(newBad)
        setAll(newAll)
        setOverallScore(newOverallScore)
        setAverage((newOverallScore / newAll).toFixed(2))
        setPositive(calcPositive(good, newAll))
    }

    return (
        <>
            <h1>give feedback</h1>
            <Button onClick={handleGood} text='good' />
            <Button onClick={handleNeutral} text='neutral' />
            <Button onClick={handleBad} text='bad' />
            <h1>statistics</h1>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                average={average}
                positive={positive}
            />
        </>
    )
}

export default App
