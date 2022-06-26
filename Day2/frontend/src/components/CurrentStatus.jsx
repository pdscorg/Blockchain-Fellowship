import React from "react";
import styles from "../styles/App.module.css"
import { election } from "../api/electionContract"
import { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table'

const CurrentStatus = ({ details }) => {
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
                    console.log("election has started")
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
            <p className={styles.title}> Current Status</p>
            <p>Current Vote Status</p>

            {electionStatus ?
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Candidate Id</th>
                            <th>Candidate Name</th>
                            <th>Live Vote Count</th>
                            <th>Party Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statusDetails && statusDetails.map(i =>
                            <tr key={i}>
                                <td>{parseInt(i.candidateId._hex)}</td>
                                <td>{i.candidateName}</td>
                                <td>{parseInt(i.candidateVoteCount._hex)}</td>
                                <td>{parseInt(i.partyId._hex)}</td>
                            </tr>
                        )}
                    </tbody>

                </Table>
                : <p> Voting not active.</p>
            }
        </>
    )

}

export default CurrentStatus;