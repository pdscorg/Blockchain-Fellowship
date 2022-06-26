import React from "react";
import styles from "../styles/App.module.css"
import { contractMethod, election } from "../api/electionContract"
import { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { fetchData } from "../utils/request";

const Vote = ({ details }) => {
    const [statusDetails, setStatusDetails] = useState();
    const [electionStatus, setElectionStatus] = useState(false);

    useEffect(() => {
        async function fetchData(voteTimeDetails) {
            try {
                const _voteStart = voteTimeDetails['voteStartTs']
                const _voteEnd = voteTimeDetails['voteEndTs']
                const date = new Date()
                const currentTime = parseInt(date.getTime() / 1000);

                if (((_voteStart < currentTime) && (currentTime < _voteEnd))) {
                    setElectionStatus(true)
                    const data = await election.getFinalStats()
                    setStatusDetails(data)
                }
            } catch (error) {
                setElectionStatus(false)
            }
        }
        fetchData(details)

    }, [details])

    return (
        <>
            <p className={styles.title}> Vote Page</p>
            <p>Vote for your desired candidate.</p>

            {electionStatus ?
                <Col className="d-flex">
                    {statusDetails && statusDetails.map(i => <CandidateDetail
                        key={i.candidateId}
                        candidateName={i.candidateName}
                        candidateId={i.candidateId._hex}
                        uri={i.uri}
                    />
                    )}
                </Col>
                : <p> Voting not active currrently.</p>
            }
        </>
    )
}

const CandidateDetail = ({ candidateName, candidateId, uri }) => {
    const [image, setImage] = useState();
    const [partyIcon, setPartyIcon] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        async function getData() {
            const resp = await fetchData(uri)
            setDescription(resp.description)
            setImage(resp.imageUrl)
            setPartyIcon(resp.partySymbol)
        }
        getData()

    }, [uri])

    const vote = async (candidateId) => {
        const tx = await contractMethod.vote(parseInt(candidateId))
        const txDetail = await tx.wait()
        console.log(txDetail)
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="bottom" src={image} />
            <Card.Img variant="top" src={partyIcon} />
            <Card.Body>
                <Card.Title>{candidateName}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Button variant="info" onClick={() => vote(candidateId)}>Vote</Button>
        </Card>)
}

export default Vote;