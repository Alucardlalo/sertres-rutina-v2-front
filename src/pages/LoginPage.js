import React from 'react';
import Login from "../components/Login";
import Logo from '../components/common/LogoSertres.jpg';
import '../global.css';

class LoginPage extends React.Component{
    render() {
        return(
            <React.Fragment>
                <div className="container">
                    <h2 className="titleMain">Bienvenido a Sertres Rutinas</h2>
                </div>
                <div className="container">
                    <img src={Logo} className="LogoLogin"/>
                    <Login/>
                </div>
            </React.Fragment>
        )
    }
}
export default LoginPage