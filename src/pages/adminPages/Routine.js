import React from 'react';
import RoutineTableAll from "../../components/adminComponents/RoutineTableAll";
import NavbarAdmin from "../../components/adminComponents/NavbarAdmin";


class Routine extends React.Component{
    render(){
        return (
            <React.Fragment>
                <div className="One">
                    <NavbarAdmin />
        </div>
                <br></br>
                <RoutineTableAll />
            </React.Fragment>
        
        );
    }
}

export default Routine;