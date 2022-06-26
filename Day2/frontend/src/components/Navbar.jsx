import React from 'react';
import styles from '../styles/App.module.css'
import { Link } from 'react-router-dom';

const NavBar = ({ addr, owner, name }) => {

    return (
        <>
            <p className={styles.header}>
                {name}</p>
            <br /><br />

            <Link to="/" className={styles.hoverOver}> <span className={styles.head} >Home</span></Link>
            <br /><br />
            {addr ?
                <>
                    {owner ?
                        <>
                            <Link to="/admin" className={styles.hoverOver}> <span className={styles.head} >Admin Panel</span></Link>
                            <br /><br />
                            <Link to="/approveVoter" className={styles.hoverOver}> <span className={styles.head} >Approve Voters</span></Link>
                            <br /><br />
                            <Link to="/addCandidates" className={styles.hoverOver}> <span className={styles.head} >Add Candidates</span></Link>
                            <br /><br />
                        </>
                        : null}
                    <Link to="/register" className={styles.hoverOver}> <span className={styles.head} >Register</span></Link>
                    <br /><br />
                    <Link to="/vote" className={styles.hoverOver}> <span className={styles.head} >Vote</span></Link>
                    <br /><br />
                    <Link to="/voteStatus" className={styles.hoverOver}> <span className={styles.head} >Current Status</span></Link>
                </> : null}
        </>
    )
}

export default NavBar;
