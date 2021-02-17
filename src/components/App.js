import React from 'react';
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import Routine from '../pages/adminPages/Routine';
import RoutineTec from "../pages/TechnicalPages/RoutineTec";
import RoutineType from '../pages/adminPages/RoutineType';
import NewRoutineType from '../pages/adminPages/NewRoutineType';
import NewRoutine from '../pages/adminPages/NewRoutine';
import ReportBody from '../pages/adminPages/RoutineBody';
import LoginPage from '../pages/LoginPage';
import HomeAdmin from './adminComponents/HomeAdmin';
import HomeTec from "./technicalComponents/HomeTec";
import notfound from '../pages/NotFound';
import RoutineBodyTec from "../pages/TechnicalPages/RoutineBodyTec";


export default class App extends React.Component {
    render() {
        return (
            <hashRouter>
                <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <Route exact path="/home" component={HomeAdmin}/>
                    <Route exact path="/homeTec" component={HomeTec}/>
                    <Route exact path="/RoutineType" component={RoutineType}/>
                    <Route exact path="/RoutineType/new" component={NewRoutineType}/>
                    <Route exact path="/Routine" component={Routine}/>
                    <Route exact path="/RoutineTec" component={RoutineTec}/>
                    <Route exact path="/Routine/new" component={NewRoutine}/>
                    <Route exact path="/RoutineBody" component={ReportBody}/>
                    <Route exact path="/RoutineBodyTec" component={RoutineBodyTec}/>
                    <Route component={notfound}/>
                </Switch>
            </hashRouter>
        );
    }
}