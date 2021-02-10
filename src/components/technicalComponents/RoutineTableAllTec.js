import React, {useState}from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import VariableAA from '../adminComponents/variableAA';
import VariablePE from '../adminComponents/variablePE';
import VariableUPS from '../adminComponents/variableUPS';

import '../styles/ReportTypeTableAll.css';
import '../../global.css';
import * as moment from "moment/moment";
import Geolocation from '@react-native-community/geolocation';

class RoutineTableAllTec extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            reports : [],
            loading: true,
            error: null,
            selectRoutinebtn: false,
            routineSelect: [],
            routineDataSelect: [],
            routineselectId: '',
            statusRoutine: '',
            routineTypeS:'',
            //state de seleccion de rutina
            showMeRutina: true,
            showMeDispositivo: false,
            showMeEdificio: false,
            showMeDatosRutina: false,
            //especificacion de variables rutina
            routineAA: true,
            routineUPS: false,
            routinePE:false,
            routineIdSelect: '',
            routineDataselectByReportId: '',
            question: [],
           //geolocalizacion
            corden:[],
            inSite: false,
            distancia: '',

        }
        this.selectroutineA = this.selectroutineA.bind(this);
    }

    componentDidMount() {
        this.fetchReport();
            
        Geolocation.getCurrentPosition(
            (success) => {
              this.setState({corden:success.coords})
            },
            (err) => console.log('err:', err))
    }
    
    distancia() {
        var latUser = this.state.corden.latitude, longUser = this.state.corden.longitude, latEdi=[], longEdi=[];
       
        this.state.routineSelect.map((cordEdi)=>{
            latEdi.push(cordEdi.deviceRel.buildingRel.buildingDataRel.buildingLatitude);
            longEdi.push(cordEdi.deviceRel.buildingRel.buildingDataRel.buildingLongitude);
        })
        
        const x = (latEdi - latUser);
        const y = (longEdi - longUser);
       
        var R = 6378.137; //Radio de la tierra en km
        var dLat = (latUser - latEdi)*Math.PI/180;
        var dLong = (longUser - longEdi)*Math.PI/180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(latUser*Math.PI/180) * Math.cos(latEdi*Math.PI/180) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        var distanciaMetros = d.toFixed(3)* 1000;
        this.setState({distancia:distanciaMetros})

        if(distanciaMetros < 500){
            this.setState({inSite: true});
        }if(distanciaMetros > 500){
            this.setState({inSite:false})
        }
      
    }
        
      
    selectRoutine(){
            this.setState({selectRoutine: true });
    }

    fetchReport = async () =>{
        this.setState({loading:true, error: null })
       
        try{
            const response = await fetch('http://localhost:8090/sertresreporte/reporte/all')
            const reports = await response.json();
            this.setState({loading:false , reports: reports })
        }catch(error){
            this.setState({loading: false , error: error })
        }
    }

    selectroutineA(e){
        this.setState({selectRoutinebtn: false , routineselectId: 'http://localhost:8090/sertresreporte/reporte/'+ e.target.value})
        this.setState({routineDataselectByReportId: 'http://localhost:8090/sertresreporte/variabledata/report/'+ e.target.value})
        this.fetchRoutineSelect();
        this.fetchRoutineDataSelect();
    }

    pruebarutina(){
        var routineType = [], routineIdSelectA = [], statusRoutineA =[];
        this.state.routineSelect.map((type) => {
            routineType.push(type.reportTypeId);
            routineIdSelectA.push(type.reportId);
            statusRoutineA.push(type.status);
        })
        this.setState({routineIdSelect:routineIdSelectA , statusRoutine: statusRoutineA, routineTypeS:routineType})
        if(routineType == 1){
           this.setState({
            routineAA: true,
            routineUPS: false,
            routinePE:false})
        }
        if(routineType == 2){
            this.setState({
                routineAA: false,
                routineUPS: true,
                routinePE:false})
        }
        if(routineType == 3){
            this.setState({
                routineAA: false,
                routineUPS: false,
                routinePE: true })
        }
    }

    fetchRoutineSelect = async () =>{
        this.setState({loading:true, error: null })
       
        try{
            const response = await fetch(this.state.routineselectId)
            const routine = await response.json();
            this.setState({loading:false , routineSelect: routine , selectRoutinebtn: true })
            this.pruebarutina();
        }catch(error){
            this.setState({loading: false , error: null })
        }
        this.distancia();
    }

    fetchRoutineDataSelect = async () =>{
        this.setState({loading:true, error: null })
       
        try{
            const response = await fetch(this.state.routineDataselectByReportId)
            const routineData = await response.json();
            this.setState({loading:false , routineDataSelect: routineData})
        }catch(error){
            this.setState({loading: false , error: null })
        }
    }

    operation1(){
        this.setState({
            showMeRutina:!this.state.showMeRutina,
            showMeDispositivo: false,
            showMeEdificio: false,
            showMeDatosRutina:false,
        })
    }
    operation2(){
        this.setState({
            showMeRutina:false,
            showMeDispositivo: !this.state.showMeDispositivo,
            showMeEdificio: false,
            showMeDatosRutina:false,
        })
    }
    operation3(){
        this.setState({
            showMeRutina:false,
            showMeDispositivo: false,
            showMeEdificio: !this.state.showMeEdificio,
            showMeDatosRutina:false,
        })
    }
    operation4(){
        this.setState({
            showMeRutina:false,
            showMeDispositivo: false,
            showMeEdificio: false,
            showMeDatosRutina:!this.state.showMeDatosRutina,
        })
    }
  
    render () {
        if(this.state.loading === true){
            return <div className="ContenedorP">
                <button className="btn btn-primary loadingC" disabled>
                    <span className="spinner-border spinner-border-sm"></span>
                    Loading...
                </button>
            </div>
        }
        if(this.state.error){
            return `Error: ${this.state.error.message}`;
        }
        if(this.state.selectRoutinebtn === false){   
        return(
                <React.Fragment>
                    <div className="ContenedorP">
                        <h3 className="tableName">Rutinas</h3>
                        <p className="tableName">Rutinas existentes</p>
                        <div className="tableAllRoutine">
                            <table className="table table-dark">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>#</th>
                                    <th>Tipo Reporte</th>
                                    <th>Dispositivo</th>
                                    <th>Nombre</th>
                                    <th>Fecha Compromiso</th>
                                    <th>Fecha Inicio</th>
                                    <th>Fecha Fin</th>
                                    <th>Estatus</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.reports.sort(({reportId: previousreportId}, {reportId:currentreportId})=> currentreportId - previousreportId).map((item) => (
                                    <tr key={item.reportId}>
                                        <td style={{textAlign:"center"}}><button className="btn btn-outline-info" onClick={this.selectroutineA} value={item.reportId}>Ver</button></td>
                                        <td>{item.reportId}</td>
                                        <td style={{textAlign:"left"}}>{item.reportType.reportType}</td>
                                        <td>{item.deviceRel.deviceName}</td>
                                        <td style={{textAlign:"left"}}>{item.reportTittle}</td>
                                        <td>{moment(item.commitmentDate).format('DD/MMM/YYYY hh:mm:ss')}</td>
                                        <td>{moment(item.beginDate).format('DD/MMM/YYYY hh:mm:ss')}</td>
                                        {item.endDate?                                         
                                         <td>{moment(item.endDate).format('DD/MMM/YYYY hh:mm:ss')}</td>   
                                        :<td></td>}
                                        <td style={{textAlign:"left"}}>{item.reportStatusRel.reportStatusDesc}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </React.Fragment>
            );}//fin del if
            {/* seccion de selecion de rutina */}
        if(this.state.selectRoutinebtn === true){
            const routineId = this.state.routineIdSelect.toString();
            const statusRoutine = this.state.statusRoutine.toString();
            const routineData = this.state.routineDataSelect;
            const routineselectS = this.state.routineSelect;
            const type = this.state.routineTypeS;
            const inSite = this.state.inSite;
            const distancia = this.state.distancia;
            return(
                <React.Fragment>
                   <div className="ContenedorP">
                    <div className="ContenedorS">
                    <div>
                        <div className="ContenedorP botonesNombre">
                            <button type="button" className="btn btn-dark" data-target="#Rutina"
                                     onClick={() => this.operation1()}>Rutina
                            </button>--
                            <button type="button" className="btn btn-dark" data-target="#Dispositivo"
                                     onClick={() => this.operation2()}>Dispositivo
                            </button>--
                            <button type="button" className="btn btn-dark" data-target="#Edificio"
                                     onClick={() => this.operation3()}>Edificio
                            </button>--
                            <button type="button" className="btn btn-dark" data-target="#DatosRutina"
                                     onClick={() => this.operation4()}>Datos Rutina
                            </button><br/><br/>
                            

                            {this.state.showMeRutina?
                            <div className="tableSelectDiv">
                                <div className="ContenedorS">
                                <div className="table-responsive-sm">
                            
                                {this.state.routineSelect.map((item) => (
                                    <div className="table table-dark">
                                    <div><h2 className="Rutinatitle">{item.reportType.reportType}</h2></div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6">
                                               <table className="sm-info1">
                                                <tr>
                                                    <td className="presto">Id Rutina: </td>
                                                    <td className="prestoCont">{item.reportId}</td> 
                                                </tr>
                                                </table> 
                                        </div>
                                        <div className="w-100 ocultar-div"></div>
                                        <div className="col-6 col-sm-6">
                                        <table className="sm-info1">
                                                <tr>
                                                    <td className="presto">Tipo de Rutina: </td>
                                                    <td className="prestoCont">{item.reportType.reportType}</td>
                                                </tr>
                                                </table>
                                        </div>
                                      
                                        <div class="w-100"></div>{/* segunda linea de cuadro Rutina */}
                                        
                                        <div className="col-4 col-sm-4">
                                        <table className="sm-info"> 
                                                <tr>
                                                    <td className="presto">Estado de Rutina: </td>
                                                    <td className="prestoCont">{item.reportStatusRel.reportStatusDesc}</td>
                                                </tr>
                                                </table> 
                                        </div>
                                        <div className="w-100 ocultar-div"></div>
                                        <div className="col-4 col-sm-4">
                                        <table className="sm-info">
                                                <tr>
                                                    <td className="presto">Nombre Rutina: </td>
                                                    <td className="prestoCont">{item.reportTittle}</td>
                                                </tr>
                                                </table>
                                        </div>
                                        <div className="w-100 ocultar-div"></div>
                                        <div className="col-4 col-sm-4">
                                        <table className="sm-info">
                                                <tr>
                                                    <td className="presto">Fecha Compromiso: </td>
                                                    <td className="prestoCont">{moment(item.commitmentDate).format('DD/MMM/YYYY hh:mm:ss')}</td>
                                                </tr>
                                                </table>
                                        </div>
                                        <div class="w-100"></div>{/* tercera linea de cuadro Rutina */}
                                        
                                        <div className="col-4 col-sm-4">
                                        <table className="sm-info"> 
                                                <tr>
                                                    <td className="presto">Fecha Inicio: </td>
                                                    <td className="prestoCont">{moment(item.beginDate).format('DD/MMM/YYYY hh:mm:ss')}</td>
                                                </tr>
                                                </table> 
                                        </div>
                                        <div className="w-100 ocultar-div"></div>
                                        <div className="col-4 col-sm-4">
                                        <table className="sm-info">
                                                <tr>
                                                    <td className="presto">Fecha Culminación: </td>
                                                    {item.endDate?
                                                    <td className="prestoCont">{moment(item.endDate).format('DD/MMM/YYYY hh:mm:ss')}</td>
                                                    :<td className="prestoCont"></td>
                                                    }
                                                </tr>
                                          </table>
                                        </div>
                                        <div className="w-100 ocultar-div"></div>
                                        <div className="col-4 col-sm-4">
                                        <table className="sm-info">
                                                <tr>
                                                    <td className="presto">Id Dispositivo: </td>
                                                    <td className="prestoCont">{item.deviceId}</td>
                                                </tr>
                                         </table>
                                        </div>
                                    
                                   </div>     
                                </div>
                            ))}
                        </div>
                                </div>
                            </div>
                             :null}

                            {this.state.showMeDispositivo?
                            <div className="tableSelectDiv">
                                <div className="ContenedorS">
                                <div className="table-responsive-sm">
                            
                                {this.state.routineSelect.map((item) => (
                                  <div className="table table-dark">
                                  <div><h2 className="Rutinatitle">Dispositivo</h2></div>
                                  <div className="row">
                                      <div className="col-6 col-sm-6">
                                             <table className="sm-info1">
                                              <tr>
                                                  <td className="presto">imagen dispositivo </td> 
                                              </tr>
                                              </table> 
                                      </div>
                                      <div className="w-100 ocultar-div"></div>
                                      <div className="col-6 col-sm-6">
                                      <table className="sm-info1">
                                              <tr>
                                                  <td className="presto">Id Dispositivo </td>
                                                  <td className="prestoCont">{item.deviceId}</td>
                                              </tr>
                                              </table>
                                      </div>
                                    
                                      <div class="w-100"></div>{/* segunda linea de cuadro Dispositivo */}
                                      
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info"> 
                                              <tr>
                                                  <td className="presto">Nombre Dispositivo </td>
                                                  <td className="prestoCont">{item.deviceRel.deviceName}</td>
                                              </tr>
                                              </table> 
                                      </div>
                                      <div className="w-100 ocultar-div"></div>
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info">
                                              <tr>
                                                  <td className="presto">Tipo Dispositivo: </td>
                                                  <td className="prestoCont">{item.deviceRel.deviceType}</td>
                                              </tr>
                                              </table>
                                      </div>
                                      <div className="w-100 ocultar-div"></div>
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info">
                                              <tr>
                                                  <td className="presto">Descripción Dispositivo: </td>
                                                  <td className="prestoCont">{item.deviceRel.deviceDescription}</td>
                                              </tr>
                                              </table>
                                      </div>
                                      <div class="w-100"></div>{/* tercera linea de cuadro Dispositivo */}
                                      
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info"> 
                                              <tr>
                                                  <td className="presto">Marca Dispositivo: </td>
                                                  <td className="prestoCont">{item.deviceRel.deviceBrand}</td>
                                              </tr>
                                              </table> 
                                      </div>
                                      <div className="w-100 ocultar-div"></div>
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info">
                                              <tr>
                                                  <td className="presto">Modelo Dispositivo: </td>
                                                  <td className="prestoCont">{item.deviceRel.deviceModel}</td>
                                              </tr>
                                        </table>
                                      </div>
                                      <div className="w-100 ocultar-div"></div>
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info">
                                              <tr>
                                                  <td className="presto">Serie Dispositivo: </td>
                                                  <td className="prestoCont">{item.deviceRel.deviceSeries}</td>
                                              </tr>
                                       </table>
                                      </div>
                                      <div class="w-100"></div>{/* cuarta linea de cuadro Dispositivo */}
                                      
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info"> 
                                              <tr>
                                                  <td className="presto">Id Edificio: </td>
                                                  <td className="prestoCont">{item.deviceRel.building}</td>
                                              </tr>
                                              </table> 
                                      </div>
                                      <div className="w-100 ocultar-div"></div>
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info">
                                              <tr>
                                                  <td className="presto">Estado Dispositivo: </td>
                                                  <td className="prestoCont">{item.deviceRel.deviceStatusRel.deviceStatusDescription}</td>
                                              </tr>
                                        </table>
                                      </div>
                                      <div className="w-100 ocultar-div"></div>
                                      <div className="col-4 col-sm-4">
                                      <table className="sm-info">
                                              <tr>
                                                  <td className="presto">Ultima fecha de Estado: </td>
                                                  <td className="prestoCont">{item.deviceRel.lastDateStatus}</td>
                                              </tr>
                                       </table>
                                      </div>
                                 </div>     
                              </div>  
                            ))}
                        </div>
                                </div>
                            </div>
                             :null}

                            {this.state.showMeEdificio?
                            <div className="tableSelectDiv">
                                <div className="ContenedorS">
                                <div className="table-responsive-sm">
                            
                                {this.state.routineSelect.map((item) => (
                                    <div className="table table-dark">
                                        <div><h2 className="Rutinatitle">Edificio</h2></div>
                                        <div className="row">
                                            <div className="col-4 col-sm-4">
                                                   <table className="sm-info">
                                                    <tr>
                                                        <td className="presto">Id Edificio: </td>
                                                        <td className="prestoCont">{item.deviceRel.building}</td>
                                                    </tr>
                                                    </table> 
                                            </div>
                                            <div className="w-100 ocultar-div"></div>
                                            <div className="col-4 col-sm-4">
                                            <table className="sm-info">
                                                    <tr>
                                                        <td className="presto">Tipo de Edificio: </td>
                                                        <td className="prestoCont">{item.deviceRel.buildingRel.buildingType}</td>
                                                    </tr>
                                                    </table>
                                            </div>
                                            <div className="w-100 ocultar-div"></div>
                                            <div className="col-4 col-sm-4">
                                            <table className="sm-info">
                                                    <tr>
                                                        <td className="presto">Responsable de Edificio: </td>
                                                        <td className="prestoCont">{item.deviceRel.buildingRel.buildingDataRel.buildingDataResponsable}</td>
                                                    </tr>
                                                    </table>
                                            </div>

                                            <div class="w-100"></div>{/* segunda linea de cuadro edificio */}
                                            
                                            <div className="col-4 col-sm-4">
                                                   <table className="sm-info">
                                                    <tr>
                                                        <td className="presto">Segundo Contacto: </td>
                                                        <td className="prestoCont">{item.deviceRel.buildingRel.buildingDataRel.buildingDataSecondContact}</td>
                                                    </tr>
                                                    </table> 
                                            </div>
                                            <div className="w-100 ocultar-div"></div>
                                            <div className="col-4 col-sm-4">
                                            <table className="sm-info">
                                                    <tr>
                                                        <td className="presto">Provedor: </td>
                                                        <td className="prestoCont">{item.deviceRel.buildingRel.buildingDataRel.buildingDataProvider}</td>
                                                    </tr>
                                                    </table>
                                            </div>
                                            <div className="w-100 ocultar-div"></div>
                                            <div className="col-4 col-sm-4">
                                            <table className="sm-info">
                                                    <tr>
                                                        <td className="presto">Ciudad: </td>
                                                        <td className="prestoCont">{item.deviceRel.buildingRel.buildingDataRel.buildingDataCity}</td>
                                                    </tr>
                                                    </table>
                                            </div>
                                            <div class="w-100"></div>{/* tercera linea de cuadro edificio */}
                                            
                                            <div className="col-4 col-sm-4">
                                            <table className="sm-info"> 
                                                    <tr>
                                                        <td className="presto">Estado: </td>
                                                        <td className="prestoCont">{item.deviceRel.buildingRel.buildingDataRel.buildingDataState}</td>
                                                    </tr>
                                                    </table> 
                                            </div>
                                            <div className="w-100 ocultar-div"></div>
                                            <div className="col-4 col-sm-4">
                                            <table className="sm-info">
                                                    <tr>
                                                        <td className="presto">Calle: </td>
                                                        <td className="prestoCont">{item.deviceRel.buildingRel.buildingDataRel.buildingDataStreet}</td>
                                                    </tr>
                                                    </table>
                                            </div>
                                            <div className="w-100 ocultar-div"></div>
                                            <div className="col-4 col-sm-4">
                                            <table className="sm-info">
                                                    <tr>
                                                        <td className="presto">CP: </td>
                                                        <td className="prestoCont">{item.deviceRel.buildingRel.buildingDataRel.buildingDataCP}</td>
                                                    </tr>
                                                    </table>
                                            </div>
                                       </div>     
                                    </div>
                            ))}
                        </div>
                                </div>
                            </div>
                             :null}
                            {/* apartado de preguntas correspondientes a reporte */}
                            {this.state.showMeDatosRutina?
                            <div>
                               {this.state.routineAA?
                               <div>
                                   <VariableAA routine={routineId} status={statusRoutine} data={routineData} routineS={routineselectS} type={type} inSite={inSite} distancia={distancia}/>
                               </div>
                               :null}
                               {this.state.routineUPS?
                               <div>
                                    <VariableUPS routine={routineId} status={statusRoutine} data={routineData} routineS={routineselectS} type={type} inSite={inSite} distancia={distancia}/>
                               </div>
                               :null}
                               {this.state.routinePE?
                               <div>
                                    <VariablePE routine={routineId} status={statusRoutine} data={routineData} routineS={routineselectS} type={type} inSite={inSite} distancia={distancia}/>
                               </div>
                               :null}
                            </div>
                            :null}
                        </div>
                    </div>
                </div>
                   </div>
                </React.Fragment>
            );
        }    
    }

}


export default RoutineTableAllTec;