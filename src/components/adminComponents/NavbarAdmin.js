import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Redirect} from "react-router-dom";
import Logo from '../common/LogoSertres.jpg';
import LogoSm from '../common/LogoSertresSm.jpg';
import '../styles/Navbar.css';


class NavbarAdmin extends React.Component{
    constructor() {
        super();
        this.state = {
            loginN: true,
            logoutN: false,
        }
        this.logout =this.logout.bind(this);
    }

    logout(){
        if(this.state.logoutN === false ){
            this.setState({loginN:false , logoutN:true })
        }
    }

    render() {
        if(this.state.logoutN === true){
            return(<Redirect to="/" />)
        }
        return(
            <React.Fragment>
                <div className="ContenedorP">
                    <div className="One__header">
                        <h2>Sertres Rutinas</h2>
                    </div>
                </div>
                <div className="ContenedorP">
                    <form>
                       <button className="btnLogout" onClick={this.logout}>salir</button>
                    </form>
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                        <h3 className="navbar-brand">Sertres Admin  <img src={LogoSm} className="LogoImgSm"/></h3>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/home">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/Routinetype">Tipo Rutina</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/Routine">Rutinas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/Routinebody">Contenido Rutinas</a>
                                </li>
                            </ul>
                            <img src={Logo} className="LogoImg"/>
                        </div>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
}
export default NavbarAdmin;