import React from "react"
import { election } from '../api/electionContract'
import { useState, useEffect } from "react"
import { fetchData } from "../utils/request";
import styles from "../styles/App.module.css"
import Confetti from 'react-confetti'
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import ListGroup from 'react-bootstrap/ListGroup'
import { getDate } from "../utils/dateUtils"

const Home = ({ addr, name, details }) => {
    const [voter, setVoter] = useState(null);
    const [winnerName, setName] = useState(null);
    const [image, setImage] = useState();
    const [partyIcon, setPartyIcon] = useState();
    const [description, setDescription] = useState();
    const [loaded, setLoaded] = useState(false);
    const [isVoteOver, setVoteOver] = useState(false);
    const [voteStart, setVoteStart] = useState(null);
    const [voteEnd, setVoteEnd] = useState(null);
    const [registrationStart, setRegistrationStart] = useState(null);
    const [registrationEnd, setRegistrationEnd] = useState(null);

    useEffect(() => {
        async function fetchInitialData(addr, details) {
            try {
                setVoteStart(getDate(details.voteStartTs))
                setVoteEnd(getDate(details.voteEndTs))
                setRegistrationStart(getDate(details.regStartTs))
                setRegistrationEnd(getDate(details.regEndTs))
                const date = new Date()
                const currentTime = parseInt(date.getTime() / 1000);
                if (currentTime > details.voteEndTs) {
                    setVoteOver(true);
                    const winner = await election.checkResults()
                    setName(winner.candidateName);
                    const resp = await fetchData(winner.uri)
                    setDescription(resp.description)
                    setImage(resp.imageUrl)
                    setPartyIcon(resp.partySymbol)
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

            setLoaded(true)
        }
        fetchInitialData(addr, details);
    }, [addr, details])

    return (
        <>
            <p className={styles.title}>Hello! Welcome to the voting portal of {name}.</p>
            {isVoteOver ? <>
                <Alert key="success" variant="success">
                    Election has successfully completed!
                </Alert>
                <Confetti/>
                <Row>
                    <Col sm={3}></Col>
                    <Col sm={5}><Card border="success" style={{ width: '24rem' }}>
                        <Card.Header>Congratulations {winnerName}!! </Card.Header>
                        <Card.Body>
                            <Col className="d-flex">
                                <Card.Img style={{ 'width': '12rem' }} src={image} />
                                <Card.Img style={{ 'width': '9rem', borderRadius: '100%' }} src={partyIcon} />
                            </Col>
                            <Card.Text>
                                <br />
                                {description}
                            </Card.Text>
                        </Card.Body>
                    </Card></Col>
                    <Col sm={4}></Col>
                </Row>
                <br />
            </> : null}
            {(voter && !isVoteOver && voter[2] === false) ? <Alert key={"info"} variant={"info"}> You have not registered for election. Please register to vote.</Alert> : null}
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