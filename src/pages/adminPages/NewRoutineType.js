import React from 'react';
import ReportTypeNewForm from '../../components/adminComponents/RoutineTypeNewForm'
import NavbarAdmin from "../../components/adminComponents/NavbarAdmin";

class NewRoutineType extends React.Component{

    render(){
        return (
            <React.Fragment>
                <div className="One">
                  <NavbarAdmin />
                </div>
                <br/>
                <div className="container">
                    <h2 className="titleMain">Nuevo Tipo de Reporte</h2>
                </div>
                <div>
                 <ReportTypeNewForm />
                </div>
            </React.Fragment>
        )
    }
}

export default NewRoutineType;