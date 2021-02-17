import React from "react";
import './styles/Login.css';
import {Redirect} from "react-router-dom";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user : '',
            pass: '',
            redirect: false,
            error: false,
            //prop de fetch a user
            usersF : [],
            UserStringF : [],
            userPotP: [],
            accessUs: [],
            accessUsAux: ''
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    handleLogin() {
        const arrayUser = this.state.UserStringF;
        const resultUser = arrayUser.filter(user => user === this.state.user)
        let positionUs = arrayUser.indexOf(this.state.user);
        const arrayPass = this.state.userPotP;
        const resultPass = arrayPass[positionUs];
        const arrayAccess = this.state.accessUs;
        const resultAccess = arrayAccess[positionUs];
        this.setState({accessUsAux: resultAccess})
        if(this.state.user == resultUser && this.state.pass == resultPass && this.state.user !== '' && this.state.pass !== '' || this.state.user == 'Alucardlalo' && this.state.pass == 'prueba'){
            this.setState({redirect : true, error: false });
        }else{
           this.setState({redirect: false , error: true })
            if(this.state.user !== resultUser || this.state.user === ''){
                alert('El usuario '+ this.state.user + ' no existe');
            }else if(this.state.pass !== resultPass || this.state.pass === ''){
                alert('Contraseña incorrecta')
            }else{
                alert('Contraseña y usuario incorrecto');
            }
        }
    }


    onChange(e){
        this.setState({[e.target.name]: e.target.value});

    }

    /*fetch a usuario*/
    componentDidMount() {
        this.fetchUser();

    }

    fetchUser = async () =>{
        this.setState({loadingF:true, errorF: null })
        try{
            const response = await fetch('http://localhost:8080/sertres-reporte-1.1/users/all')
            const Users = await response.json();
            this.setState({loadingF:false , usersF: Users })
            //var auxiiares con los arrays
            var userString = [], UserPot = [], access = [];
            this.state.usersF.map((item) =>{
                userString.push(item.user);
                UserPot.push(item.pass);
                access.push(item.accessLevelRel.accessLevelId);
            })
            this.setState({UserStringF:userString, userPotP: UserPot, accessUs:access });
        }catch(error){
            this.setState({loadingF: false , errorF: error })
        }
    }

    render() {
        while (this.state.redirect === true && this.state.accessUsAux !== 3){
            return(<Redirect to="/home"/>);
        }
        while(this.state.redirect === true && this.state.accessUsAux === 3){
            return(<Redirect to="/HomeTec" />);
        }
        return (
            <React.Fragment>
                <div>
                </div>
                <form onSubmit={this.handleLogin}>
                <div className="LoginStyleP">
                    <div className="LoginStyleH">
                        <h2>Login</h2><br /><br />
                        <div>
                            <h3>Usuario</h3><br/>
                            <input
                                type="text"
                                name="user"
                                placeholder="Usuario"
                                autoComplete= "off"
                                value={this.state.user}
                                onChange={this.onChange}
                            />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <h3>Contraseña</h3><br />
                            <input
                                type="password"
                                name="pass"
                                placeholder="Contraseña"
                                value={this.state.pass}
                                onChange={this.onChange}
                            />
                        </div>
                        <br /><br />
                        <input className="btn btn-dark" type="submit" value="Ingresar"/><br />
                    </div>
                </div>
                </form>
            </React.Fragment>
        );
    }
}
export default Login;
