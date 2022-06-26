import React from "react"
import { election } from '../api/electionContract'
import { useState, useEffect } from "react"
import styles from "../styles/App.module.css"
import Alert from "react-bootstrap/Alert"
import ListGroup from 'react-bootstrap/ListGroup'
import { getDate } from "../utils/dateUtils"

const Home = ({ addr, name, details }) => {
    const [voter, setVoter] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [isVoteOver, setVoteOver] = useState(false);
    const [voteStart, setVoteStart] = useState(null);
    const [voteEnd, setVoteEnd] = useState(null);
    const [registrationStart, setRegistrationStart] = useState(null);
    const [registrationEnd, setRegistrationEnd] = useState(null);

    useEffect(() => {
        async function fetchData(addr, details) {
            try{
                setVoteStart(getDate(details.voteStartTs))
                setVoteEnd(getDate(details.voteEndTs))
                setRegistrationStart(getDate(details.regStartTs))
                setRegistrationEnd(getDate(details.regEndTs))
                const date = new Date()
                const currentTime = parseInt(date.getTime() / 1000);
                if (currentTime > details.voteEndTs) {
                    setVoteOver(true);
                }
            } catch (error) {
                setVoteStart("Not Set Yet")
                setVoteEnd("Not Set Yet")
                setRegistrationStart("Not Set Yet")
                setRegistrationEnd("Not Set Yet")
            }

            if (addr) {
                const voterData = await election.voters(addr)
                setVoter(voterData)
            }

            if (isVoteOver) {
                // fetch winner data and render it
                console.log("Can fetch the winner")
            }

            setLoaded(true)
        }
        fetchData(addr, details);
    }, [addr, details, isVoteOver])

    const getWinner = async() => {
        const winner = await election.checkResults()
        console.log(winner)
    }
    return (
        <>
            <p className={styles.title}>Hello! Welcome to the voting portal of {name}.</p>
            {isVoteOver? <p>Election has been completed</p>: null}
            {(voter && voter[2] === false) ? <Alert key={"info"} variant={"info"}> You have not registered for election. Please register to vote.</Alert> : null}
            {loaded ?
                <ListGroup>
                    <ListGroup.Item>Vote Start Time: {voteStart}</ListGroup.Item>
                    <ListGroup.Item>Vote End Time: {voteEnd}</ListGroup.Item>

                    <ListGroup.Item>Registration Start Time: {registrationStart}</ListGroup.Item>
                    <ListGroup.Item>Registration End Time:{registrationEnd}</ListGroup.Item>
                </ListGroup>
                : null}
        </>
    )
}

export default Home;