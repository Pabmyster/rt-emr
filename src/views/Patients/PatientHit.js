import React from 'react';
import styles from "./Patients.module.css"
import { Link } from "react-router-dom"


function PatientHit({patient, index}) {
    return (
        <Link to={`/patient/${patient.id}/summary`} className={styles.patientHitContainer} style={{animationDelay: `${index * 60 + 300}ms`}}>
            <div className={styles.hitAvatar} style={{background: `url('')`, backgroundSize: "cover", backgroundPosition: "center"}}></div>
            <div className={styles.hitText}>
                <div>{patient.first_name}</div>
                <div>{patient.last_name}</div>
                <div className={styles.hitAgeGender}>
                    <div className={styles.hitAge}>
                        <div>Age</div>
                        <div>45</div>
                    </div>
                    <div className={styles.hitGender}>
                        <div>Gender</div>
                        <div>Male</div>
                    </div>
                </div>
                <div><div style={{margin: "0 10px"}}>{patient.address}</div></div>
            </div>
        </Link>
    );
}

export default PatientHit;