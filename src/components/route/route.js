import React from "react";
import {Route} from 'react-router-dom'

import {Home} from "../pages";

const RoutePages = () => {
    return (
        <>
            <Route exact path="/" component={Home}/>
        </>
    )
};

export default RoutePages;