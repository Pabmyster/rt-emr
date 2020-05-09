import React from 'react';
import {Sidebar, SidebarWrapper, SidebarHeader, SidebarLink} from "../../components/SideBar"
import { faTh, faSyringe, faAllergies, faFileInvoice, faFlask, faDiagnoses, faUsers, faFile, faTasks } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import Card from "components/Card/Card"
import { Container, Row, Col } from 'styled-bootstrap-grid';


import PrivateRoute from "../../components/PrivateRoute"
import PageHeader from 'components/PageHeader/PageHeader';
import Button from 'components/Buttons/Button';
import SummaryCard from './Cards/SummaryCard/SummaryCard';
import VitalsCard from './Cards/VitalsCard/VitalsCard';
import VisitCard from './VisitCard/VisitCard';
import MedicationsCard from './Cards/MedicationsCard/MedicationsCard';
import AllergiesCard from './Cards/AllergiesCard';


function Patient({match}) {
    return (
        <SidebarWrapper>
            <Sidebar>
                <SidebarHeader text="Patient"/>
                <SidebarLink icon={faTh} text="Summary" path={`/patient/${match.params.id}/summary`}/>
                <SidebarLink icon={faSyringe} text="Medications" path={`/patient/${match.params.id}/medications`}/>
                <SidebarLink icon={faAllergies} text="Alergies" path={`/patient/${match.params.id}/alergies`}/>
                <SidebarLink icon={faFileInvoice} text="Orders" path={`/patient/${match.params.id}/orders`}/>
                <SidebarLink icon={faCalendarCheck} text="Appointments" path={`/patient/${match.params.id}/appointments`}/>
                <SidebarLink icon={faFlask} text="Lab Reports" path={`/patient/${match.params.id}/labreports`}/>
                <SidebarLink icon={faDiagnoses} text="Problems" path={`/patient/${match.params.id}/problems`}/>
                <SidebarLink icon={faUsers} text="Family" path={`/patient/${match.params.id}/family`}/>
                <SidebarLink icon={faFile} text="Documents" path={`/patient/${match.params.id}/documents`}/>
                <SidebarLink icon={faTasks} text="Tasks / Notes" path={`/patient/${match.params.id}/tasks`}/>



            </Sidebar>
            <PrivateRoute path={`/patient/${match.params.id}/summary`} component={Summary}/>
            <PrivateRoute path={`/patient/${match.params.id}/medications`} component={Medications}/>
            <PrivateRoute path={`/patient/${match.params.id}/alergies`} component={Alergies}/>
            <PrivateRoute path={`/patient/${match.params.id}/orders`} component={Orders}/>
            <PrivateRoute path={`/patient/${match.params.id}/appointments`} component={Appointments}/>
            <PrivateRoute path={`/patient/${match.params.id}/labreports`} component={LabReports}/>
            <PrivateRoute path={`/patient/${match.params.id}/problems`} component={Problems}/>
            <PrivateRoute path={`/patient/${match.params.id}/family`} component={Family}/>
            <PrivateRoute path={`/patient/${match.params.id}/documents`} component={Documents}/>
            <PrivateRoute path={`/patient/${match.params.id}/tasks`} component={Tasks}/>



        </SidebarWrapper>
    );
}

function Summary () {
    return (
        <div>
            <PageHeader title="Summary">
                <Button text="Discharge" secondary></Button>
            </PageHeader>
            <Container >
                <Row>
                    <Col md={12} lg={9} xl={6}>
                        <SummaryCard/>
                    </Col>
                    <Col sm={12} md={6} lg={3} xl={3}>
                        <VitalsCard/>
                    </Col>
                    <Col sm={12} md={6} lg={3} xl={3}>
                        <VisitCard/>
                    </Col>
                    <Col md={12} lg={9} xl={6}>
                        <MedicationsCard/>
                    </Col>
                    <Col md={12} lg={9} xl={6}>
                        <AllergiesCard />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
function Medications () {
    return (
        <div>Meds</div>
    )
}
function Alergies () {
    return (
        <div>Alergies</div>
    )
}
function Appointments () {
    return (
        <div>Appointments</div>
    )
}
function Orders () {
    return (
        <div>Orders</div>
    )
}
function LabReports () {
    return (
        <div>LabReports</div>
    )
}
function Problems () {
    return (
        <div>Problems</div>
    )
}
function Family () {
    return (
        <div>Family</div>
    )
}
function Documents () {
    return (
        <div>Documents</div>
    )
}
function Tasks () {
    return (
        <div>Tasks</div>
    )
}
export default Patient;