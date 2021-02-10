import React from 'react';
import '../styles/ReportTypeNewForm.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class routineTypeNewForm extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            reportType: '',
            descriptionI : '',
            createdNew: false,
        }
    }

    changeHadler = (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }

    submitHadler = async e =>{
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reportTypeId: '', reportType: this.state.reportType , descriptionI:this.state.descriptionI})
        };
        console.log(requestOptions)
        fetch('http://localhost:8090/sertresreporte/reporttype/save', requestOptions)
            .then(response => response.json());
            alert('Tipo Rutina creada');
            this.setState({createdNew:true});
}

    render(){
        const { reportType , descriptionI } = this.state
        if(this.state.createdNew === false){
        return (
            <React.Fragment>
                <div className = "container">
                    <p className = "titleMain">creacion de nuevo tipo de rutina</p>
                    <form onSubmit={this.submitHadler}>
                        <div>
                            <table className="col-6 tableNewReportType table-dark">
                                <tbody>
                                <tr>
                                    <td className="titleNewRoutine">Nuevo Tipo Rutina </td>
                                    <td className="inputNewRoutine">
                                        <input
                                            type="text"
                                            name="reportType"
                                            value={reportType} onChange={this.changeHadler} 
                                            className="btn btn-outline-info"
                                            autoComplete="off"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="titleNewRoutine">Descripción</td>
                                    <td className="inputNewRoutine">
                                        <textarea
                                            type="text"
                                            name="descriptionI"
                                            value={descriptionI} onChange={this.changeHadler}
                                            className="btn btn-outline-info"
                                            autoComplete="off"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="btnNewType"><input type="submit" value="Guardar" className="btn btn-outline-info"/></td>
                                </tr>
                                </tbody>
                            </table>
                           
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }if(this.state.createdNew === true){
        return (<Redirect to="/Routinetype"/>);
    }
}
}

export default routineTypeNewForm;