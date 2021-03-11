
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {useHistory} from "react-router-dom";

import {useAppContext} from "../Utils/contextLib";
import LoaderButton from "./LoaderButton";
import './styles/Login.css';
import pasar from "../Utils/Utils";

export default function Login() {
    const {userHasAuthenticated} = useAppContext();
    const {userHasAuthenticatedTec} = useAppContext();
    const {SetUrs} = useAppContext();
    const [user1, setUser1] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    function validateForm() {
        return user1.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Efectuamos la validación del usuario
        setIsLoading(true);

        const url = `${window.config.servidor}/users/all`;
        await fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    var userString = [], UserPot = [], access = [], asign = [], nameUrs=[];
                    result.map((item) => {
                        userString.push(item.user);
                        UserPot.push(item.pass);
                        access.push(item.accessLevel ? item.accessLevelRel.accessLevelId : 3);
                        asign.push(item.userId);
                        nameUrs.push(item.userId);

                    })
                    const resultUser = userString.filter(user => user === user1)
                    let position = userString.indexOf(user1);
                    if (user1 == userString.filter(user => user === user1) && password == UserPot[position] && access[position] !== 3 ) {
                        userHasAuthenticated(true);
                        userHasAuthenticatedTec(false);
                        SetUrs(nameUrs[position]);
                        pasar(nameUrs[position]);
                        history.push("/home");
                    }
                    if (user1 == userString.filter(user => user === user1) &&  password == UserPot[position] && access[position] === 3 ) {

                        userHasAuthenticated(false);
                        userHasAuthenticatedTec(true);
                        pasar(nameUrs[position]);
                        history.push("/homeTec");
                    }else {
                        setIsLoading(false);
                    }
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    setIsLoading(false);
                    console.log('Error: ' + error);
                }
            )

    }

    return (
        <div className="LoginStyleH">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="user">
                    <Form.Label className="letraLogin">Usuario</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={user1}
                        onChange={(e) => setUser1(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label className="letraLogin">Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    size="lg"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
            </Form>
        </div>
    );
}

