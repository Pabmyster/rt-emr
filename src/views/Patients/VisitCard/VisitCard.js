import React from 'react';
import styles from "./VisitCard.module.css";
import textStyles from "components/TextStyles.module.css";
import Card from "components/Card/Card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

function VisitCard(props) {
    return (
        <Card>
            <div className={styles.container}>
                <FontAwesomeIcon icon={faBed} className={styles.bedIcon}/>
                <div className={textStyles.header4} style={{marginTop: "10px"}}>Visit</div>
                <div className={styles.visitText}>
                    <div>
                        <div>Room</div>
                        <div>Ward</div>
                        <div>Nurse</div>
                    </div>
                    <div>
                        <div>534</div>
                        <div>East</div>
                        <div>Julie</div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default VisitCard;