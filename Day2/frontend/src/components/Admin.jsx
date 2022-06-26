import React from "react";
import styles from "../styles/App.module.css";
import Button from "react-bootstrap/Button"
import { contractMethod } from "../api/electionContract";

const Admin = () => {

    const startRegistration = async () => {
        await contractMethod.startRegistration(); 
    }

    const endRegistration = async () => {
        await contractMethod.endRegistration(); 
    }

    const startElection = async () => {
        await contractMethod.startElection(); 
    }

    const endElection = async () => {
        await contractMethod.endElection(); 
    }

    return (
        <>
            <p className={styles.title}> Admin Page</p>
            <Button variant="outline-dark" onClick={startRegistration}>Start Registration</Button><br/><br/>
            <Button variant="outline-dark" onClick={endRegistration}>End Registration</Button><br/><br/>
            <Button variant="outline-dark" onClick={startElection}>Start Election</Button><br/><br/>
            <Button variant="outline-dark" onClick={endElection}>End Election</Button>
        </>
    )

}

export default Admin;