import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '../styles/ReportTypeTableAll.css';
import { Link } from 'react-router-dom';

class RoutineTypeTableAll extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            reportTypes : [],
            loading: true,
            error: null,
        }
    }

    componentDidMount() {
       this.fetchReportType()

    }

    fetchReportType = async () =>{
        this.setState({loading:true, error: null })

        try{
            const response = await fetch('http://localhost:8080/sertres-reporte-1.1/reporttype/all')
            const reportTypes = await response.json();
            this.setState({loading:false , reportTypes: reportTypes })
        }catch(error){
            this.setState({loading: false , error: error })
        }
    }

    render () {
    if(this.state.loading === true){
        return <div className="container">
            <button className="btn btn-primary loadingC" disabled>
                <span className="spinner-border spinner-border-sm"></span>
                Loading...
            </button>
        </div>
    }
    if(this.state.error){
        return `Error: ${this.state.error.message}`;
    }
            return(
                <React.Fragment>
                    <div className="container">
                        <h3 className="tableName">Tipo de Rutina</h3>
                        <p className="tableName">tipos de rutinas existentes</p>
                        <div className="">  
                         <Link to="/Routinetype/new"><a className="buttons"> Nuevo Tipo Rutina</a></Link>
                        </div>
                        <div className="table-responsive-sm">
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tipo Rutina</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.reportTypes.map((item) => (
                                    <tr key={item.reportTypeId}>
                                        <td>{item.reportTypeId}</td>
                                        <td>{item.reportType}</td>
                                        <td>{item.descriptionI}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

    }


export default RoutineTypeTableAll;