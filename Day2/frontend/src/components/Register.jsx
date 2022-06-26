import React from "react";
import styles from "../styles/App.module.css"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { contractMethod } from "../api/electionContract"
import { useState, useEffect } from "react"
import { BigN } from "../utils/bigNumber"

const Register = ({details}) => {
    const [citizenshipNumber, setNumber] = useState();
    const [regStatus, setRegStatus] = useState(false);

    useEffect(() => {
        async function fetchData(voteTimeDetails) {
            try {
                const _registrationStart = voteTimeDetails['regStartTs']
                const _registrationEnd = voteTimeDetails['regEndTs']
                const date = new Date()
                const currentTime = parseInt(date.getTime() / 1000);
                
                if (((_registrationStart < currentTime) && (currentTime < _registrationEnd))) {
                    setRegStatus(true)
                } else {
                }
            } catch (error) {
                setRegStatus(false)
            }
        }
        fetchData(details)

    }, [details])

    const register = async (e) => {
        e.preventDefault()
        const tx = await contractMethod.registerAsVoter(BigN(citizenshipNumber))
        const txDetail = await tx.wait()
        console.log(txDetail)
    }

    return (
        <>
            <p className={styles.title}> Registration Page</p>
            <p> Register for the upcoming election</p>

            {regStatus ?

                <Form onSubmit={register}>
                    <Form.Group className="mb-3" controlId="number">
                        <Form.Label>Your Citizenship Number</Form.Label>
                        <Form.Control onChange={(e) => setNumber(e.target.value)} type="number" placeholder="Enter citizenship number" />
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

export default Register;