import React from 'react';
import NavbarAdmin from "../../components/adminComponents/NavbarAdmin";
import NewRoutinebodyForm from "../../components/adminComponents/NewRoutinebodyForm";


export default class NewRoutinebody extends React.Component{

    render(){
        return(
            <React.Fragment>
                <div className="One">
                    <NavbarAdmin/>
                </div>
                <br/>
                <div className="container">
                <h2 className="titleMain">Cuerpo de Reporte Rutina</h2>
                </div>
                <div>
                    <NewRoutinebodyForm/>
                </div>
            </React.Fragment>
        )
    }
}