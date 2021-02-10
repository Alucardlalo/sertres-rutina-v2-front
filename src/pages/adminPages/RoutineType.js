import React from 'react';

import RoutineTypeTableAll from '../../components/adminComponents/RoutineTypeTableAll';
import '../../global.css';
import NavbarAdmin from "../../components/adminComponents/NavbarAdmin";


class RoutineType extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div className="One">
                <NavbarAdmin/>
        </div>
                <br></br>
                <RoutineTypeTableAll />
            </React.Fragment>
        
        );
    }
}

export default RoutineType;