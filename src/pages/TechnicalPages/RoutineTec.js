import React from 'react';
import RoutineTableAllTec from '../../components/technicalComponents/RoutineTableAllTec';
import NavbarTec from "../../components/technicalComponents/NavbarTec";


class Routine extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div className="One">
                    <NavbarTec />
                </div>
                <br></br>
                <RoutineTableAllTec />
            </React.Fragment>

        );
    }
}

export default Routine;