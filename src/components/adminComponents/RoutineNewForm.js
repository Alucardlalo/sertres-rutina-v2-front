import React from 'react';
import axios from "axios";
import '../styles/newRoutine.css';
import * as moment from "moment/moment";
import { Redirect } from 'react-router-dom';

class RoutineNewForm extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            reportTypeId: '',
            deviceId : '',
            reportTittle : '',
            commitmentDate : '',
            beginDate : moment(new Date()).format("DD/MM/YYYY hh:mm:ss"),
            endDate : null,
            status : '',
            now : moment(new Date()).format("DD/MM/YYYY hh:mm:ss"),
            createdNew:false,
            //objetos
            reportStatusA : [],
            reportTypeA: [],
            deviceList:[],
            loading: true,
            error: null,

        }
    }

    changeHadler = (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }
    changeHadlerDevice = (e) =>{
        this.setState({deviceId: e.target.value })
    }

    changeHadlerStatus = (e) =>{
        this.setState({status:e.target.value })
    }

    changeHadlerReportType = (e) =>{
        this.setState({reportTypeId:e.target.value })
    }

      submitHadler = async e => {
            e.preventDefault();
            if(this.state.reportTypeId !== "" &&  
                this.state.deviceId !== "" &&
                this.state.reportTittle !== "" &&
                this.state.commitmentDate !== "" &&
                this.state.status !== ""){
                    axios({
                        method: 'post',
                        url: 'http://localhost:8090/sertresreporte/reporte/save',
                        data: {
                            "reportTypeId": this.state.reportTypeId,
                            "deviceId": this.state.deviceId,
                            "reportTittle": this.state.reportTittle,
                            "commitmentDate": moment(this.state.commitmentDate),
                            "beginDate": moment(new Date()),
                            "endDate": moment(this.state.endDate),
                            "status": this.state.status,
                            "reviewATM": false,
                            "createdBy": null,
                            "idCreated": null
                        }
                      });
                    alert('Rutina creada');
                    window.location.reload(true);
                    
                }else if(this.state.reportTypeId == ""){
                    var tipo = "El tipo de rutina no puede ser vacio \n" 
                } if(this.state.deviceId == ""){
                    var device = "El dispositivo no puede ser vacio \n"
                } if( this.state.reportTittle == ""){
                    var title = "El titulo no puede ser vacio \n"    
                } if( this.state.commitmentDate == ""){
                    var date = "La fecha compromiso no puede ser vacio \n" 
                } if( this.state.status == ""){
                    var status = "El status no puede ser vacio \n"
                }if(this.state.reportTypeId == "" ||  
                this.state.deviceId == "" ||
                this.state.reportTittle == "" ||
                this.state.commitmentDate == "" ||
                this.state.status == ""){
                alert((tipo? tipo: "") + (device? device:"") + (title? title:"") + (date? date:"") + (status? status:""));
                }
                
            } 

    componentDidMount() {
        this.fetchReportStatus();
        this.fetchReportType();
        this.fetchDevice();

    }

    fetchReportStatus = async () =>{
        this.setState({loading:true, error: null, })

        try{
            const response = await fetch('http://localhost:8090/sertresreporte/reporte/status/all')
            const reportStatusPR = await response.json();
            this.setState({loading:false , reportStatusA: reportStatusPR })
        }catch(error){
            this.setState({loading: false , error: error })
        }
    }

    fetchDevice = async () =>{
        this.setState({loading:true, error: null, })

        try{
            const response = await fetch('http://localhost:8090/sertresreporte/dispositivo/all')
            const DevicePR = await response.json();
            this.setState({loading:false , deviceList: DevicePR })
        }catch(error){
            this.setState({loading: false , error: error })
        }
    }

    fetchReportType = async () =>{
        this.setState({loading:true, error: null, })

        try{
            const response = await fetch('http://localhost:8090/sertresreporte/reporttype/all')
            const reportTypePR = await response.json();
            this.setState({loading:false , reportTypeA: reportTypePR })
        }catch(error){
            this.setState({loading: false , error: error })
        }
    }

    render() {
        const { reportTypeId , deviceId, reportTittle , commitmentDate , beginDate , endDate , status } = this.state
        if(this.state.createdNew === false){
        return (
            <React.Fragment>
                <div className = "container">
                    <p className = "titleMain">creacion de nueva rutina</p>
                    <form onSubmit={this.submitHadler}>
                        <div>
                            <table className="tableNewReportType table-dark">
                                <tbody>
                                <tr>
                                    <td className="titleNewRoutine">Tipo Rutina </td>
                                    <td className="inputNewRoutine">
                                        <select className="btn btn-outline-info" name="reportTypeId" value={reportTypeId} onChange={this.changeHadlerReportType}>
                                        <option value={0}></option>
                                            {this.state.reportTypeA.map((item) =>(
                                                <option key={item.reportTypeId} value={item.reportTypeId}>{item.reportType}</option>
                                            ))}
                                        </select>

                                    </td>
                                </tr>
                                
                                <tr>
                                    <td className="titleNewRoutine">Dispositivo</td>
                                    <td className="inputNewRoutine">
                                         <select className="btn btn-outline-info" name="deviceId" value={deviceId} onChange={this.changeHadlerDevice}>
                                         <option value={0}></option>
                                            {this.state.deviceList.map((item) =>(
                                                <option key={item.deviceId} value={item.deviceId}>{item.deviceName}</option>
                                            ))}
                                        </select>    
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td className="titleNewRoutine">Titulo Rutina</td>
                                    <td className="inputNewRoutine">
                                        <input
                                            type="text"
                                            name="reportTittle"
                                            value={reportTittle} onChange={this.changeHadler}
                                            className="btn btn-outline-info"
                                            autoComplete="off"/>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td className="titleNewRoutine">Fecha Compromiso</td>
                                    <td className="inputNewRoutine">
                                        <input
                                            type="date"
                                            name="commitmentDate"
                                            value={commitmentDate} onChange={this.changeHadler}
                                            className="btn btn-outline-info"/>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td className="titleNewRoutine">Fecha Inicio</td>
                                    <td className="inputNewRoutine">
                                    <input 
                                        type="dateTime" disabled= "true" 
                                        size="19" value={this.state.now}
                                        name="beginDate" 
                                        className="btn btn-outline-info"/>
                                        </td>
                                </tr>
                                
                                {/* <tr>
                                    <td className="titleNewRoutine">Fecha Fin</td>
                                    <td className="inputNewRoutine">
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={endDate} onChange={this.changeHadler}
                                            className="btn btn-outline-info"/>
                                    </td>
                                </tr> */}
                                
                                <tr>
                                    <td className="titleNewRoutine">Status</td>
                                    <td className="inputNewRoutine">
                                        <select className="btn btn-outline-info" name="status" value={status} onChange={this.changeHadlerStatus}>
                                        <option value={0}></option>
                                            {this.state.reportStatusA.map((item) =>(
                                                <option key={item.reportStatusId} value={item.reportStatusId}>{item.reportStatusDesc}</option>
                                            ))}
                                        </select>

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <br/><br/>
                            <div className="col-4">
                                <input type="submit" value="Guardar" className="btn btn-outline-info"/>
                            </div>

                        </div>
                    </form>
                </div>
            </React.Fragment>
        )}
        if(this.state.createdNew === true){
            return (<Redirect to="/Routine"/>);
        }
    }
}

export default RoutineNewForm;