import { useState } from 'react'

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAllClicks] = useState([])

    const handleLeftClick = () => {
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        const new_arr = allClicks.concat('L')
        setAllClicks(new_arr)
    }

    const handleRightClick = () => {
        const updatedRight = right + 1
        setRight(updatedRight)
        const new_arr = allClicks.concat('R')
        setAllClicks(new_arr)
    }

    const History = (props) => {
        if (props.allClicks.length === 0) {
            return <p>You use the app by clicking the buttons</p>
        }
        return <p>{props.allClicks.join(' ')}</p>
    }

    const Button = ({ onClick, text }) => (
        <button onClick={onClick}>{text}</button>
    )

    return (
        <>
            {left}
            <Button onClick={handleLeftClick} text='Left'></Button>
            <Button onClick={handleRightClick} text='Right'></Button>
            {right}
            <History allClicks={allClicks} />
        </>
    )
}

export default App
