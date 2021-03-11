import React from "react";
import {Route, Switch} from "react-router-dom";
import Routine from '../pages/adminPages/Routine';
import RoutineTec from "../pages/TechnicalPages/RoutineTec";
import RoutineType from '../pages/adminPages/RoutineType';
import NewRoutineType from '../pages/adminPages/NewRoutineType';
import NewRoutine from '../pages/adminPages/NewRoutine';
import ReportBody from '../pages/adminPages/RoutineBody';
import LoginPage from '../pages/LoginPage';
import HomeAdmin from './adminComponents/HomeAdmin';
import HomeTec from "./technicalComponents/HomeTec";
import RoutineBodyTec from "../pages/TechnicalPages/RoutineBodyTec";
import NewRoutinebody from "../pages/adminPages/NewRoutinebody";
import NotFound from '../pages/NotFound';

export default function Routes() {
    return (
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
            <Route exact path= "/Routinebody/new" component={NewRoutinebody}/>
            <Route> <NotFound/> </Route>
        </Switch>
    );
}
