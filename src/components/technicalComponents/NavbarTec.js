import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Redirect, Link} from "react-router-dom";
import Logo from '../common/LogoSertres.jpg';//'../common/LogoSertres.jpg';
import LogoSm from '../common/LogoSertresSm.jpg';//'../common/LogoSertresSm.jpg';
import '../styles/Navbar.css';



class NavbarTec extends React.Component{
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
                        <h3 className="navbar-brand">Sertres <img src={LogoSm} className="LogoImgSm"/></h3>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                                <li className="nav-item">
                                 <Link to="/HomeTec" className="nav-link" onClick={() => window.location = "/HomeTec"}>Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                   <Link to="/RoutineTec" className="nav-link" onClick={() => window.location = "/RoutineTec"}>Rutinas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/RoutinebodyTec" className="nav-link" onClick={() => window.location = "/RoutinebodyTec"}>Contenido Rutinas</Link>
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
export default NavbarTec;