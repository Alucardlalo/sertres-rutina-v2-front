import React from 'react';
import RoutineNewForm from '../../components/adminComponents/RoutineNewForm'
import NavbarAdmin from "../../components/adminComponents/NavbarAdmin";

class NewRoutine extends React.Component{

    render(){
        return (
            <React.Fragment>
                <div className="One">
                   <NavbarAdmin />
                </div>
                <br/>
                <div className="container">
                    <h2 className="titleMain">Nueva Rutina</h2>
                </div>
                <div>
                    <RoutineNewForm/>
                </div>
            </React.Fragment>
        )
    }
}

export default NewRoutine;