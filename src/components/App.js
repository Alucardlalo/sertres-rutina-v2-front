import React, {useState} from "react";

import {useHistory} from "react-router-dom";

import Routes from "./Routes";
import {AppContext} from "../Utils/contextLib";
import NavbarAdmin from "./adminComponents/NavbarAdmin";
import NavbarTec from "./technicalComponents/NavbarTec";



function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticatedTec, userHasAuthenticatedTec] = useState(false);
    const history = useHistory();

    if (!isAuthenticated) history.push('/');

    function handleLogout() {
        userHasAuthenticated(false);
        history.push("/");
        window.location.reload(true,3000);
    }

    return (
        <div className="App container-fluid py-3">

            <AppContext.Provider value={{isAuthenticated, userHasAuthenticated ,isAuthenticatedTec, userHasAuthenticatedTec }}>
                <Routes/>
            </AppContext.Provider>
        </div>

    );
}

export default App;
