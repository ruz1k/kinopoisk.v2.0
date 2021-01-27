import React from "react";
import {Route} from 'react-router-dom'

import {FilmList, FilmDetail} from "../pages";

const RoutePages = () => {
    return (
        <>
            <Route exact path="/" component={FilmList}/>
            <Route exact path="/Film/:id" component={FilmDetail}/>
        </>
    )
};

export default RoutePages;