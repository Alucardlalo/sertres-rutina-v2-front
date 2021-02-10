import React from 'react';

import RoutineBodyTableAll from "../../components/adminComponents/RoutineBodyTableAll";
import NavbarAdmin from "../../components/adminComponents/NavbarAdmin";


class Report extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div className="One">
            <NavbarAdmin/>
        </div>
                <br></br>

                <RoutineBodyTableAll />
            </React.Fragment>

        );
    }
}

export default Report;