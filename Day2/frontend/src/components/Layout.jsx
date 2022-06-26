import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { election } from '../api/electionContract';
import { Route, Routes } from 'react-router-dom';
import styles from "../styles/App.module.css";
import NavBar from './Navbar';
import Home from "./Home";
import Admin from './Admin';
import Approve from './Approve';
import Register from './Register';
import CurrentStatus from './CurrentStatus';
import AddCandidate from './AddCandidates';
import Vote from './Vote';

const Layout = ({ addr, owner }) => {
    const [name, setName] = useState(null)
    const [voteTimeDetails, setVoteTimeDetails] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const contractName = await election.electionName()
            setName(contractName)

            try {
                const _voteStart = await election.startTime()
                const _voteEnd = await election.endTime()
                const _registrationStart = await election.startReg()
                const _registrationEnd = await election.endReg()
                const jsonData = {
                    "voteStartTs": parseInt(_voteStart._hex),
                    "voteEndTs": parseInt(_voteEnd._hex),
                    "regStartTs": parseInt(_registrationStart._hex),
                    "regEndTs": parseInt(_registrationEnd._hex)
                }
                setVoteTimeDetails(jsonData)
            } catch (error) {
                setVoteTimeDetails({
                    "voteStartTs": 0,
                    "voteEndTs": 0,
                    "regStartTs": 0,
                    "regEndTs": 0
                })
            }
        }
        fetchData();
    }, []);
    return (
        <Container>
            <Row className={styles.topMargin}>
                <Col sm={3}><NavBar addr={addr} owner={owner} name={name} /></Col>
                <Col sm={9}>
                    <Routes>
                        <Route path="/" element={<Home addr={addr} name={name} details={voteTimeDetails} />} />
                        <Route path="/approveVoter" element={<Approve details={voteTimeDetails} />} />
                        <Route path="/admin" element={<Admin addr={addr} name={name} />} />
                        <Route path="/register" element={<Register details={voteTimeDetails} />} />
                        <Route path="/addCandidates" element={<AddCandidate details={voteTimeDetails} />} />
                        <Route path="/voteStatus" element={<CurrentStatus details={voteTimeDetails} />} />
                        <Route path="/vote" element={<Vote details={voteTimeDetails} />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
    )
}

export default Layout