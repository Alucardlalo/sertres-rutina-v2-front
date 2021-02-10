import React from 'react';

import RoutineBodyTableAllTec from "../../components/technicalComponents/RoutineBodyTableAllTec";
import NavbarTec from "../../components/technicalComponents/NavbarTec";


class RoutineBodyTec extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div className="One">
                    <NavbarTec/>
                </div>
                <br></br>

                <RoutineBodyTableAllTec />
            </React.Fragment>

        );
    }
}

export default RoutineBodyTec;