import { useState } from 'react'

function App() {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ]
    const [selectedAnecdote, setSelectedAnecdote] = useState(anecdotes[0])
    const [votesArray, setVotesArray] = useState(
        Array(anecdotes.length).fill(0),
    )
    const [votesIndex, setVotesIndex] = useState(0)
    const [votes, setVotes] = useState(0)
    const [highestVoteCount, setHighestVoteCount] = useState(0)
    const [highestVotedAnecdote, setHighestVotedAnecdote] = useState('')

    // Helper function that guarantees clicking "next anecdote" will show a new one
    const randomIndex = () => {
        const index = Math.floor(Math.random() * anecdotes.length)
        if (index !== votesIndex) {
            return index
        }
        return randomIndex()
    }

    const handleSelection = () => {
        const index = randomIndex()
        setSelectedAnecdote(anecdotes[index])
        setVotesIndex(index)
        setVotes(votesArray[index])
    }

    const handleVote = () => {
        const newVotes = votesArray[votesIndex] + 1
        let newVotesArray = [...votesArray]
        newVotesArray[votesIndex] = newVotes
        setVotesArray(newVotesArray)
        setVotes(newVotes)
        if (newVotes >= Math.max(...newVotesArray)) {
            setHighestVotedAnecdote(anecdotes[votesIndex])
            setHighestVoteCount(newVotes)
        }
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <p>{selectedAnecdote}</p>
            <p>
                has {votes} {votes === 1 ? 'vote' : 'votes'}
            </p>
            <button onClick={handleVote}>vote</button>
            <button onClick={handleSelection}>next anecdote</button>
            <h1>Anecdote with the most votes</h1>

            <p>{highestVotedAnecdote}</p>
            <p>
                has {highestVoteCount}{' '}
                {highestVoteCount === 1 ? 'vote' : 'votes'}
            </p>
        </>
    )
}

export default App
