import React from "react";
import styles from "../styles/App.module.css"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { contractMethod } from "../api/electionContract"
import { useState, useEffect } from "react"

const Approve = ({details}) => {
    const [voterAddress, setVoterAddress] = useState();
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

    const approve = async (e) => {
        e.preventDefault()
        const tx = await contractMethod.approveVoters(voterAddress)
        const txDetail = await tx.wait()
        console.log(txDetail)
    }

    return (
        <>
            <p className={styles.title}> Approval Page</p>
            <p> Admin registers voters for upcoming election.</p>

            {regStatus ?

                <Form onSubmit={approve}>
                    <Form.Group className="mb-3" controlId="number">
                        <Form.Label>Voter Address To Approve</Form.Label>
                        <Form.Control onChange={(e) => setVoterAddress(e.target.value)} type="text" placeholder="Enter voter address" />
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

export default Approve;