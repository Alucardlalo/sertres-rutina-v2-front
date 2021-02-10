import React from 'react';
import {Pie} from 'react-chartjs-2';

class DashboardAdmin extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            reports : [],
            loading: true,
            error: null,
            /*elementos que se usan para la grafica de todos los reportes*/
            statusA: [],
            reporttypeA: [],
            reporttypeB: [],
            beginDateA: [],
            endDateA: [],
            coloresA:[],
            dataA:[],
            opcionesA: {}
        }
    }

   async componentDidMount() {
        await this.fetchReport()
        await this.generarcolores();
        await this.configGrafica();
    }

    fetchReport = async () =>{
        this.setState({loading:true, error: null })

        try{
            const response = await fetch('http://localhost:8090/sertresreporte/reporte/all')
            const reports = await response.json();
            this.setState({loading:false , reports: reports })
            /*creacion de grafica*/
            var status = [], reporttype= [],reporttypeB=[], beginDate = [], endDate = [] ;
            this.state.reports.map((item) =>{
                status.push(item.reportStatusRel.reportStatusDesc);
                reporttype.push(item.reportType.reportTypeId);
                reporttypeB.push(item.reportType.descriptionI);
                beginDate.push(item.beginDate);
                endDate.push(item.endDate);
            })
            this.setState({statusA:status, reporttypeA:reporttype,reporttypeB: reporttypeB , beginDateA:beginDate, endDateA:endDate })
        }catch(error){
            this.setState({loading: false , error: error })
        }
    }

    generatedCharaterRdn(){
        var caracter = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9",];
        var numero =(Math.random()*15).toFixed(0);
        return caracter[numero];
    }

    colorRdn(){
     var color = "";
     for(var i=0; i<6;i++){
         color = color + this.generatedCharaterRdn();
     }
     return "#" + color;
    }

    generarcolores(){
        var colores = [];
        for (var i= 0; i<this.state.reports.length; i++){
            colores.push(this.colorRdn());
        }
        this.setState({coloresA : colores});
    }

    configGrafica(){
        /*etiquetas de grafica 1*/
        let datare = this.state.reporttypeB;
        const datare2 = new Set(datare);
        let resulter = [...datare2];
        /*datos de grfica 1*/
        let dataRepoA = this.state.reporttypeA;
        const result = dataRepoA.filter(reportType => reportType === 1);
        const rellt = result.length;
        const result2 = dataRepoA.filter(reportType => reportType === 2);
        const rellt2 = result2.length;
        const result3 = dataRepoA.filter(reportType => reportType === 3);
        const rellt3 = result3.length;
        const prub = [rellt, rellt2, rellt3];


        /*mapeo de grafica 1*/
        const dataGraph = {
            labels :  resulter,
            datasets: [{
                data: prub,
                backgroundColor : this.state.coloresA
            }]
        };
        const opciones = {
            responsive : true,
            maintainAspectRatio: false
        }
        this.setState({dataA: dataGraph, opcionesA: opciones});
    }

    render() {
        return(
            <React.Fragment>
                <div className="container">
                    <h4 className="titleMain">Rutinas</h4>
                    <div style={{width: '50%', height:'auto'}}>
                        <Pie data={this.state.dataA} options={this.state.opcionesA} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default DashboardAdmin;