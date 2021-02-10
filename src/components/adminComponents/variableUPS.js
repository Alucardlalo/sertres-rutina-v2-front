import React ,{useLayoutEffect}from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../global.css';
import '../styles/variableUPS.css';
import * as moment from "moment/moment";
import PDF from '../common/PDF';
import axios from "axios";

class VariableUPS extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            variable : [],
            loading:true, 
            error: null,
            variableAUX: [],    
            now : moment(new Date()).format("DD/MM/YYYY hh:mm:ss"),
            inheritedRoutine: this.props.routine,
            inheritedStatus: this.props.status,
            inheritedRoutineData: this.props.data,
            inheritedRoutineData1: [],
            statusActual: false,
            inheritedRoutineS: this.props.routineS,
            inheritedCord: this.props.corden,
            PDF:false,
            usersF:[],
            createdBy:'',
            createdById:'',
            routineAA:[],
            inheritedInSite: this.props.inSite,
            inheritedDistancia: this.props.distancia,
            routineTypeS: '',
            Q1: moment(new Date()).format("DD/MM/YYYY hh:mm:ss"),Q2: '',Q3: '',Q4: '',Q5: '',Q6: '',Q7: '',Q8: '',Q9: '',Q10: '',
            Q11: '',Q12: '',Q13: '',Q14: '',Q15: '',Q16: '',Q17: '',Q18: '',Q19: '',
            Q20: '',Q21: '',Q22: '',Q23: '',Q24: '',Q25: '',Q26: '',
        }
        
    }

    componentDidMount() {
        this.fetchVariable();
        this.statusComprovation();
        this.seleccionarData();
        this.fetchUser();
        this.rutina();
    }

    rutina(){
        var rotine =[], routineType =[], device = [], title = [], date1 = [], date2 = [], dateEnd = [], status =[], ATM =[];
        this.state.inheritedRoutineS.map((routine) =>{
            rotine.push(routine.reportId);
            routineType.push(routine.reportTypeId);
            device.push(routine.deviceId);
            title.push(routine.reportTittle);
            date1.push(routine.commitmentDate);
            date2.push(routine.beginDate);
            dateEnd.push(routine.endDate);
            status.push(routine.status);
            ATM.push(routine.reviewATM);
        })
        this.setState({routineAA:rotine.toString(), type: routineType.toString(), device: device.toString(), title:title.toString()
        , date1:date1.toString() , date2:date2.toString(), dateEnd:dateEnd.toString(), stat:status.toString(), atm: ATM });
        this.namecreated();
    }

    fetchUser = async () =>{
        this.setState({loadingF:true, errorF: null })
        try{
            const response = await fetch('http://localhost:8090/sertresreporte/users/all')
            const Users = await response.json();
            this.setState({loadingF:false , usersF: Users })
            }catch(error){
            this.setState({loadingF: false , errorF: error })
        }
    }

    changeHadler = (e) =>{
        this.setState({createdBy:e.target.value })
    }

    seleccionarData(){
        var routineData = []
        this.state.inheritedRoutineData.sort(({order: previousOrder}, {order:currentOrder})=> previousOrder - currentOrder).map((data) =>{
            routineData.push(data.data);
        })
        this.setState({inheritedRoutineData1: routineData})
    }

    statusComprovation(){
        if(this.state.inheritedStatus == 1){
            this.setState({statusActual: true})
            alert('El reporte de rutina esta completo, no se puede editar')
        }else{
            if(this.state.inheritedInSite == true){

                this.setState({statusActual: false})
            }if(this.state.inheritedInSite == false){
                alert('debe estar en el sitio para poder realizar la rutina. \n se encuentra a ' + this.state.inheritedDistancia + ' m del dispositivo')
                this.setState({statusActual: false})
            }
           
        }
    }

    changeHadlerQ1 = () =>{this.setState({Q1: this.state.now })}
    changeHadlerQ2 = (e) =>{this.setState({Q2: e.target.value })}
    changeHadlerQ3 = (e) =>{this.setState({Q3: e.target.value })}
    changeHadlerQ4 = (e) =>{this.setState({Q4: e.target.value })}
    changeHadlerQ5 = (e) =>{this.setState({Q5: e.target.value })}
    changeHadlerQ6 = (e) =>{this.setState({Q6: e.target.value })}
    changeHadlerQ7 = (e) =>{this.setState({Q7: e.target.value })}
    changeHadlerQ8 = (e) =>{this.setState({Q8: e.target.value })}
    changeHadlerQ9 = (e) =>{this.setState({Q9: e.target.value })}
    changeHadlerQ10 = (e) =>{this.setState({Q10: e.target.value })}
    changeHadlerQ11 = (e) =>{this.setState({Q11: e.target.value })}
    changeHadlerQ12 = (e) =>{this.setState({Q12: e.target.value })}
    changeHadlerQ13 = (e) =>{this.setState({Q13: e.target.value })}
    changeHadlerQ14 = (e) =>{this.setState({Q14: e.target.value })}
    changeHadlerQ15 = (e) =>{this.setState({Q15: e.target.value })}
    changeHadlerQ16 = (e) =>{this.setState({Q16: e.target.value })}
    changeHadlerQ17 = (e) =>{this.setState({Q17: e.target.value })}
    changeHadlerQ18 = (e) =>{this.setState({Q18: e.target.value })}
    changeHadlerQ19 = (e) =>{this.setState({Q19: e.target.value })}
    changeHadlerQ20 = (e) =>{this.setState({Q20: e.target.value })}
    changeHadlerQ21 = (e) =>{this.setState({Q21: e.target.value })}
    changeHadlerQ22 = (e) =>{this.setState({Q22: e.target.value })}
    changeHadlerQ23 = (e) =>{this.setState({Q23: e.target.value })}
    changeHadlerQ24 = (e) =>{this.setState({Q24: e.target.value })}
    changeHadlerQ25 = (e) =>{this.setState({Q25: e.target.value })}
    changeHadlerQ26 = (e) =>{this.setState({Q26: e.target.value })}

    fetchVariable = async () =>{
        this.setState({loading:true, error: null })
       
        try{
            const response = await fetch('http://localhost:8090/sertresreporte/variable/reporttype/2')
            const variable = await response.json();
            this.setState({loading:false , variable: variable })
            var variableAUX = [];
            this.state.variable.sort(({order: previousOrder}, {order:currentOrder})=> previousOrder - currentOrder).map((variableForm) =>{
                variableAUX.push(variableForm.variableName);
            })
            this.setState({variableAUX:variableAUX});
        }catch(error){
            this.setState({loading: false , error: error })
        }
    }

    submitHadler = async e =>{
        e.preventDefault();
        this.setState({Q1:this.state.now});
        this.SaveQ1();this.SaveQ2();this.SaveQ3();this.SaveQ4();this.SaveQ5();this.SaveQ6();
        this.SaveQ7();this.SaveQ8();this.SaveQ9();this.SaveQ10();this.SaveQ11();this.SaveQ12();
        this.SaveQ13();this.SaveQ14();this.SaveQ15();this.SaveQ16();this.SaveQ17();this.SaveQ18();
        this.SaveQ19();this.SaveQ20();this.SaveQ21();this.SaveQ22();this.SaveQ23();this.SaveQ24();
        this.SaveQ25();this.SaveQ26();this.SaveRoutine();
        window.location.reload(true);
    }

    SaveRoutine  = async e =>{
        axios({
            method: 'post',
            url: 'http://localhost:8090/sertresreporte/reporte/save',
            data: {
                "reportId": this.state.routineAA,
                "reportTypeId": this.state.type,
                "deviceId": this.state.device,
                "reportTittle": this.state.title,
                "commitmentDate": moment(this.state.date1),
                "beginDate": moment(this.state.date2),
                "endDate": moment(new Date()),
                "status": 1,
                "reviewATM": false,
                "createdBy": this.state.createdBy,
                "idCreated": this.state.createdById
            }
          });
    }

    namecreated(){
        var lat=this.props.corden.latitude, lon=this.props.corden.longitude;
        var name = this.state.inheritedRoutine +'_' + this.state.now.toString().replace(' ', '_') +'_'+ lat + '_' + lon;
        this.setState({createdById:name});
    }

     SaveQ1 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '20' , data: this.state.Q1 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }

    SaveQ2 (){
        const requestOptions2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '21' , data: this.state.Q2 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions2)
            .then(response => response.json());
    }
    SaveQ3 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '22' , data: this.state.Q3 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ4 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '23' , data: this.state.Q4 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ5 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '24' , data: this.state.Q5 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ6 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '25' , data: this.state.Q6 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ7 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '26' , data: this.state.Q7 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ8 = async e =>{
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '27' , data: this.state.Q8 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ9 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '28' , data: this.state.Q9 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ10 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '29' , data: this.state.Q10 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ11(){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '30' , data: this.state.Q11 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ12 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '31' , data: this.state.Q12 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ13 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '32' , data: this.state.Q13 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ14 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '33' , data: this.state.Q14 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ15 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '34' , data: this.state.Q15 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ16 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '35' , data: this.state.Q16 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ17 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '36' , data: this.state.Q17 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ18 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '37' , data: this.state.Q18 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ19 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '38' , data: this.state.Q19 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ20 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '39' , data: this.state.Q20 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ21 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '40' , data: this.state.Q21 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ22 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '41' , data: this.state.Q22 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ23 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '42' , data: this.state.Q23 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ24 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '43' , data: this.state.Q24 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ25(){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '44' , data: this.state.Q25 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    SaveQ26 (){
        const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variableDataId:'', variableId: '45' , data: this.state.Q26 , reportId: this.state.inheritedRoutine})
        };
        fetch('http://localhost:8090/sertresreporte/variabledata/save', requestOptions1)
            .then(response => response.json());
    }
    

    render(){
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
        const {Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9,Q10,Q11,Q12,Q13,Q14,Q15,Q16,Q17,Q18,Q19,Q20,Q21,Q22,Q23,Q24,Q25,Q26} = this.state  
        const data = this.state.inheritedRoutineData;
        const routine = this.state.inheritedRoutineS;
        const createdById = this.state.createdById;
        return(  
        <React.Fragment>
             {this.state.statusActual?
                <div>
                <td className="PDF"><button className="btn btn-outline-danger"  data-toggle="modal" data-target="#myModal">PDF</button></td>
                <div class="modal fade" id="myModal">
                    <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                    
                    
                        <div class="modal-header">
                        <h4 class="modal-title">PDF Rutina</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                    
                        <div class="modal-body">
                        <PDF data={data} routine={routine} createdById={createdById}/>
                        </div>
                        
                    
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        
                    </div>
                    </div>
                </div>
                </div>
                :null}
             <div className="tableUPSDiv">
             <form onSubmit={this.submitHadler}>
            <div className="">
                {/* {this.state.variableAUX.map((item) => ( */}
                        <div className="table table-dark">
                        <div className="row">
                            <div className="col-6 col-sm-6">
                                    <table className="UPSData1">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[0]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[0]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[0]}</td>
                                        :<td className="prestoUPSRes"><input type="dateTime" disabled= "true" size="17" value={this.state.now} className="btn btn-outline-info"/></td>
                                    }
                                    </tr>
                                    </table> 
                                   
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-6 col-sm-6">
                            <table className="UPSData1">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[1]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[1]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[1]}</td>
                                        :<td className="prestoUPSRes"><select onChange={this.changeHadlerQ2} value={Q2} className="btn btn-outline-info">
                                            <option value={''}> </option>
                                            <option value={'si'}>Si</option>
                                            <option value={'no'}>No</option>
                                            <option value={'No aplica'}>No Aplica</option>
                                            </select></td>}
                                    </tr>
                                    </table>
                            </div>
                            
                            <div class="w-100"></div>{/* segunda linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="UPSData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[2]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[2]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[2]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ3} value={Q3} className="btn btn-outline-info">
                                        <option value={''}> </option>
                                            <option value={'si'}>Si</option>
                                            <option value={'no'}>No</option>
                                            <option value={'No aplica'}>No Aplica</option>
                                            </select></td>}
                                    </tr>
                                    </table> 
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[3]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[3]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[3]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ4} value={Q4} className="btn btn-outline-info">
                                        <option value={''}> </option>
                                            <option value={'si'}>Si</option>
                                            <option value={'no'}>No</option>
                                            <option value={'No aplica'}>No Aplica</option>
                                            </select></td>}
                                    </tr>
                                    </table>
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4 UPSData">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[4]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[4]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[4]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ5} value={Q5} className="btn btn-outline-info">
                                        <option value={''}> </option>
                                            <option value={'si'}>Si</option>
                                            <option value={'no'}>No</option>
                                            <option value={'No aplica'}>No Aplica</option>
                                            </select></td>}
                                    </tr>
                                    </table>
                            </div>
                            <div class="w-100"></div>{/* tercera linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="UPSData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[5]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[5]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[5]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ6} value={Q6} className="btn btn-outline-info">
                                        <option value={''}> </option>
                                            <option value={'si'}>Si</option>
                                            <option value={'no'}>No</option>
                                            <option value={'No aplica'}>No Aplica</option>
                                            </select></td>}
                                    </tr>
                                    </table> 
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[6]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[6]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[6]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7" onChange={this.changeHadlerQ7} value={Q7} autoComplete="off" className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[7]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[7]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[7]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7" onChange={this.changeHadlerQ8} value={Q8} autoComplete="off" className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>
                            <div class="w-100"></div>{/* cuarta linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="UPSData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[8]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[8]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[8]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7" onChange={this.changeHadlerQ9} value={Q9} autoComplete="off" className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                    </table> 
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[9]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[9]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[9]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7" onChange={this.changeHadlerQ10} autoComplete="off" value={Q10} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[10]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[10]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[10]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7" onChange={this.changeHadlerQ11} autoComplete="off" value={Q11} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>

                            <div class="w-100"></div>{/* quinta linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="UPSData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[11]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[11]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[11]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7" onChange={this.changeHadlerQ12} autoComplete="off" value={Q12} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                    </table> 
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[12]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[12]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[12]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ13} value={Q13} className="btn btn-outline-info">
                                        <option value={'Ninguna'}> </option>
                                            <option value={'A'}>Si</option>
                                            <option value={'B'}>No</option>
                                            <option value={'C'}>No Aplica</option>
                                            </select></td>}
                                    </tr>
                                </table>
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[13]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[13]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[13]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7"  onChange={this.changeHadlerQ14} autoComplete="off" value={Q14} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>

                            <div class="w-100"></div>{/* sexta linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="UPSData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[14]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[14]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[14]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7"  onChange={this.changeHadlerQ15} autoComplete="off" value={Q15} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                    </table> 
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[15]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[15]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[15]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7"  onChange={this.changeHadlerQ16} autoComplete="off" value={Q16} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[16]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[16]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[16]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7"  onChange={this.changeHadlerQ17} autoComplete="off" value={Q17} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>

                           < div class="w-100"></div>{/* septima linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="UPSData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[17]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[17]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[17]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7"  onChange={this.changeHadlerQ18} autoComplete="off" value={Q18} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                    </table> 
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[18]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[18]}</td>}
                                    {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[18]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7" onChange={this.changeHadlerQ19} autoComplete="off" value={Q19} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>

                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[19]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[19]}</td>}
                                    {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[19]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7" onChange={this.changeHadlerQ20} autoComplete="off" value={Q20} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>

                            <div class="w-100"></div>{/* octava linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="UPSData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[20]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[20]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[20]}</td>
                                        :<td className="prestoUPSRes"><input type="text" size="7"  onChange={this.changeHadlerQ21} autoComplete="off" value={Q21} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                    </table> 
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[21]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[21]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[21]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ22} value={Q22} className="btn btn-outline-info">
                                            <option value={''}> </option>
                                            <option value={'Si'}>Si</option>
                                            <option value={'No'}>No</option>
                                            </select></td>}
                                    </tr>
                                </table>
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[22]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[22]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[22]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ23} value={Q23} className="btn btn-outline-info">
                                            <option value={''}> </option>
                                            <option value={'Si'}>Si</option>
                                            <option value={'No'}>No</option>
                                            </select></td>}
                                    </tr>
                                </table>
                            </div>

                            <div class="w-100"></div>{/* novena linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="UPSData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[23]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[23]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[23]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ23} value={Q23} className="btn btn-outline-info">
                                            <option value={''}> </option>
                                            <option value={'Si'}>Si</option>
                                            <option value={'No'}>No</option>
                                            <option value={'No aplica'}>No aplica</option>
                                            </select></td>}
                                    </tr>
                                    </table> 
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[24]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[24]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[24]}</td>
                                        :<td className="prestoUPSRes"><select  onChange={this.changeHadlerQ24} value={Q24} className="btn btn-outline-info">
                                            <option value={''}> </option>
                                            <option value={'Si'}>Si</option>
                                            <option value={'No'}>No</option>
                                            <option value={'No aplica'}>No aplica</option>
                                            </select></td>}
                                    </tr>
                                </table>
                            </div>
                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoUPSC">{this.state.variableAUX[25]}</td>
                                        :<td className="prestoUPS">{this.state.variableAUX[25]}</td>}
                                        {this.state.statusActual?
                                        <td className="prestoUPSResC">{this.state.inheritedRoutineData1[25]}</td>
                                        :<td><input className="prestoUPSRes" type="text" size="17" onChange={this.changeHadlerQ26} autoComplete="off" value={Q26} className="btn btn-outline-info"></input></td>
                                    }
                                    </tr>
                                </table>
                            </div>

                            < div class="w-100"></div>{/* decima linea de cuadro Rutina */}
                            
                            <div className="col-4 col-sm-4">
                            <table className="AAData"> 
                                    <tr>
                                    {this.state.statusActual?
                                        <td className="prestoAAC">Realizado por:</td>
                                        :<td className="prestoAA">Realizado por:</td>}
                                        {this.state.statusActual?
                                        <td className="prestoAAResC ">{this.props.routineS.map((item)=>(item.userRel.userName))}</td>
                                        :<td className="prestoAARes">
                                         <select value={this.state.createdBy} onChange={this.changeHadler} className="btn btn-outline-info">
                                        <option value={0}> </option>
                                        {this.state.usersF.sort(({userId: previoususerId}, {userId:currentuserId})=> previoususerId - currentuserId).map((item) =>(
                                            <option key={item.userId} value={item.userId}>{item.userName}</option>
                                        ))}
                                    </select>   
                                       </td>}
                                    </tr>
                                    </table> 
                            </div>

                            < div class="w-100"></div>{/* btn save de cuadro Rutina */}

                            <div className="w-100 ocultar-div"></div>
                            <div className="col-4 col-sm-4">
                            <table className="UPSData">
                            {this.state.statusActual? 
                                    <tr>
                                        <td><button className="btn btn-outline-success" disabled="true">Completo</button></td>  
                                    </tr>
                                 :this.state.inheritedInSite?
                                 <tr>
                                 <td><button className="btn btn-outline-info">Guardar</button></td>
                             </tr>
                                 :<tr> 
                                     <td><button className="btn btn-outline-warning" disabled="true">Deshabilitado</button></td>
                                     <td className="text-warning">{' Estas a: ' + this.props.distancia + ' m del dispositivo. '}</td>    

                                 </tr>}                                  
                                </table>
                            </div>
                        </div>     
                    </div>
            </div>
            </form>
        </div>    
        </React.Fragment>
    );
}
}
export default VariableUPS;