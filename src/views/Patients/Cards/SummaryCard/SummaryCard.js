import React, {useState, useEffect} from 'react';
import Card from 'components/Card/Card';
import styles from "./SummaryCard.module.css"
import {useAuth0} from "react-auth0-spa";

function SummaryCard(props) {
    const {api} = useAuth0();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        api.patients().then((p) => {
            setPatient(p[0]);
        })
    }, [])
    
    return (
        <Card>
            <div className={styles.container}>
                <div className={styles.picture} style={{background: `url("${patient ? "" : ""}")`}}></div>
                <div className={styles.textBox}>
                    <div className={styles.name}>Nicolas Venne</div>
                    <div className={styles.gender}>Male</div>
                    <div className={styles.dob}>06/15/1998 (21 years)</div>
                    <div className={styles.address}>15 Copper Street, Sudbury, Ontario, Canada P3E 0A4</div>
                    <div className={styles.hsn}><span>HSN</span> 1858393</div>
                </div>
            </div>
        </Card>
    );
}

export default SummaryCard;