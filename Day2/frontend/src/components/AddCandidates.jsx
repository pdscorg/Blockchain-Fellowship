import React from "react"
import styles from "../styles/App.module.css"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { contractMethod } from "../api/electionContract"
import { useState, useEffect } from "react"

const AddCandidate = ({details}) => {
    const [candidateName, setCandidateName] = useState();
    const [partyId, setpartyId] = useState();
    const [uri, setUri] = useState();
    const [regStatus, setRegStatus] = useState(false);

    useEffect(() => {
        async function fetchData(voteTimeDetails) {
            try {
                const _approvalStart = voteTimeDetails['regStartTs']
                const _approvalEndEnd = voteTimeDetails['voteStartTs']
                const date = new Date()
                const currentTime = parseInt(date.getTime() / 1000);
                
                if (((_approvalStart < currentTime) && (currentTime < _approvalEndEnd))) {
                    setRegStatus(true)
                }
            } catch (error) {
                setRegStatus(false)
            }
        }
        fetchData(details)

    }, [details])

    const addCandidate = async (e) => {
        e.preventDefault()
        const tx = await contractMethod.addCandidates(candidateName, parseInt(partyId), uri)
        const txDetail = await tx.wait()
        console.log(txDetail)
    }

    return (
        <>
            <p className={styles.title}> Add Candidates</p>
            <p> Admin adds candidates for upcoming election.</p>

            {regStatus ?

                <Form onSubmit={addCandidate}>
                    <Form.Group className="mb-3" controlId="number">
                        <Form.Label>Candidate Name</Form.Label>
                        <Form.Control onChange={(e) => setCandidateName(e.target.value)} type="text" placeholder="Enter candidate name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="number">
                        <Form.Label>Party Id</Form.Label>
                        <Form.Control onChange={(e) => setpartyId(e.target.value)} type="text" placeholder="Party Id" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="number">
                        <Form.Label>URI</Form.Label>
                        <Form.Control onChange={(e) => setUri(e.target.value)} type="text" placeholder="Metadata URI" />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>
                : <p> Registration not open. Please check later</p>
            }        
        </>
    )

}

export default AddCandidate;