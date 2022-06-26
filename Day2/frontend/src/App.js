import React, { useEffect, useState } from "react"
import { formatAddress } from "./utils/formatAddress"
import { election } from './api/electionContract'
import styles from "./styles/App.module.css"
import Layout from "./components/Layout";


const App = () => {
    const [account, setAccount] = useState(null)
    const [isOwner, setIsOwner] = useState(null)

    const connectWallet = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const addr = window.ethereum.selectedAddress
        setAccount(addr)
        const owner = await election.owner()
        if (owner.toUpperCase() === addr.toUpperCase()) {
            setIsOwner(true)
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (window.ethereum === undefined) {
                console.log("no wallet detected")
            }
            window.ethereum.on("accountsChanged", function account() {
                setAccount(window.ethereum.selectedAddress)
            })
        }
        fetchData();
    }, [])


    return (
        <div className={styles.light}>
            {account ? <span className={styles.rightBorder}>{formatAddress(account)} </span> :
                <span onClick={connectWallet} className={styles.rightBorder}>
                    Connect Wallet
                </span>}

            <Layout addr={account} owner={isOwner} />
        </div>
    )
}

export default App;