import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/One.css';
import NavbarAdmin from "./NavbarAdmin";
import DashboardAdmin from "../../pages/adminPages/DashboardAdmin";


class HomeAdmin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="One">
           <NavbarAdmin />
        </div>

        <div className="container-fluid">
          <div className="container" >
             <div className="titleMain">
                <h3 className="seccion">Dashboard</h3>
                </div>
          </div>
            <DashboardAdmin />
        </div>
      </React.Fragment>
    );
  }
}

export default HomeAdmin;
