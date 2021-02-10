import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/One.css';
import NavbarTec from "../technicalComponents/NavbarTec";
import DashboardTec from "../../pages/TechnicalPages/DashboardTec";

class HomeTec extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="One">
                    <NavbarTec />
                </div>

                <div className="container-fluid">
                    <div className="container" >
                        <div className="titleMain">
                            <h3 className="seccion">Dashboard</h3>
                        </div>
                    </div>
                    <DashboardTec />
                </div>
            </React.Fragment>
        );
    }
}

export default HomeTec;
