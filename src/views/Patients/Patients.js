import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Link} from "react-router-dom"
import PrivateRoute from "../../components/PrivateRoute"
import styles from "./Patients.module.css"
import PatientHit from "./PatientHit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Button from "../../components/Buttons/Button"
import {Auth0Context} from "../../react-auth0-spa";



class Patients extends Component {

    constructor() {
        super();
        this.patient = {
            name: {
                first: "Nicolas",
                last: "Venne"
            },
            age: 84,
            gender: "Male",
            address: "622 Corsi Hill, Sudbury ON"
        }

        this.state = {
            stick: false,
            input: null,
            patients: []
        }
    }

    focusInput() {
        this.state.input.focus();
    }

    componentDidMount() {
        let input = ReactDOM.findDOMNode(this).querySelector("input");
        window.addEventListener("scroll", () => {
            if(window.scrollY >= 180) {
                if(!this.state.stick) {
                    this.setState({stick: true});
                }
            } else {
                if(this.state.stick) {
                    this.setState({stick: false});
                }
            }
        })

        this.context.api.patients().then(p => {console.log(p); this.setState({patients: p})});

        this.setState({input: input});

    }

    inputEvent() {
        let query = this.state.input.value
        if(query === "") {
            this.context.api.patients().then(p => {this.setState({patients: p})});
        } else {
            this.context.api.searchPatients(query).then((p) => this.setState({patients: p}))
        }
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.searchHeader}>
                    <div className={styles.searchBackground}>
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    <div className={styles.searchHeaderTitle}>Patients</div>
                    <div className={`${styles.searchContainer} ${(this.state.stick) ? styles.searchStick : ""}`} onClick={() => this.focusInput()}>
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="text" placeholder="Search for patient" onInput={() => this.inputEvent()}/>
                        <div style={{height: "100%", borderLeft: "1px solid #cccccc"}}></div>
                        <div className={styles.searchFilters}>
                            <Button secondary text="All"/>
                            <Button text="Assigned"/>
                        </div>
                    </div>
                </div>
                <div className={styles.searchHits}>
                    {this.state.patients.map((patient, index) => {return <PatientHit key={patient.id} patient={patient} index={index}/>})}                    
                </div>
            </div>
        );
    }
}
Patients.contextType = Auth0Context

export default Patients;